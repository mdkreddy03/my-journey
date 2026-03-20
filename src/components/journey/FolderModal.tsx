import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Plus, Trash2, ArrowLeft, Image, FolderOpen,
  Maximize2, Settings, Lock
} from "lucide-react";
import Lightbox from "./Lightbox";

interface FolderItem {
  id: string;
  name: string;
  images: string[];
  cover?: string;
}

const PASSCODE = "1436";

const FolderModal = ({ title, storageKey, onClose }: { title: string; storageKey: string; onClose: () => void }) => {
  const [folders, setFolders] = useState<FolderItem[]>(() => JSON.parse(localStorage.getItem(storageKey) || "[]"));
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem("journey_admin") === "true");
  const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(null);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);

  const persist = (updated: FolderItem[]) => {
    setFolders(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const addFolder = () => {
    if (!newFolderName.trim()) return;
    persist([...folders, { id: crypto.randomUUID(), name: newFolderName.trim(), images: [] }]);
    setNewFolderName("");
  };

  const removeFolder = (id: string) => persist(folders.filter(f => f.id !== id));

  const addImage = (folderId: string) => {
    const input = document.createElement("input");
    input.type = "file"; input.accept = "image/*"; input.multiple = true;
    input.onchange = () => {
      if (!input.files) return;
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          setFolders(prev => {
            const updated = prev.map(f => f.id === folderId ? { ...f, images: [...f.images, reader.result as string] } : f);
            localStorage.setItem(storageKey, JSON.stringify(updated));
            return updated;
          });
        };
        reader.readAsDataURL(file);
      });
    };
    input.click();
  };

  const setCover = (folderId: string) => {
    const input = document.createElement("input");
    input.type = "file"; input.accept = "image/*";
    input.onchange = () => {
      if (!input.files?.[0]) return;
      const reader = new FileReader();
      reader.onload = () => {
        const updated = folders.map(f => f.id === folderId ? { ...f, cover: reader.result as string } : f);
        persist(updated);
      };
      reader.readAsDataURL(input.files[0]);
    };
    input.click();
  };

  const removeImage = (folderId: string, imgIndex: number) => {
    const updated = folders.map(f => f.id === folderId ? { ...f, images: f.images.filter((_, i) => i !== imgIndex) } : f);
    persist(updated);
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      sessionStorage.removeItem("journey_admin");
      setIsAdmin(false);
    } else {
      setShowAdminPrompt(true);
    }
  };

  const handlePasscode = (code: string) => {
    if (code === PASSCODE) {
      sessionStorage.setItem("journey_admin", "true");
      setIsAdmin(true);
    } else {
      alert("Incorrect Passcode");
    }
    setShowAdminPrompt(false);
  };

  const currentFolder = folders.find(f => f.id === openFolderId);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4" onClick={onClose}
    >
      <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[85vh] glass rounded-3xl border border-white/10 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            {openFolderId && (
              <button onClick={() => setOpenFolderId(null)} className="p-1.5 rounded-lg hover:bg-white/10 transition">
                <ArrowLeft size={16} />
              </button>
            )}
            <div>
              <h3 className="text-xl font-semibold">{currentFolder ? currentFolder.name : title}</h3>
              <p className="text-xs text-muted-foreground">{currentFolder ? `${currentFolder.images.length} photos` : `${folders.length} albums`}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Admin Gear Toggle */}
            <button onClick={handleAdminToggle}
              className={`p-2 rounded-xl transition ${isAdmin ? "bg-primary/20 text-primary" : "hover:bg-white/10 text-muted-foreground"}`}
              title={isAdmin ? "Exit admin mode" : "Enter admin mode"}
            >
              {isAdmin ? <Lock size={18} /> : <Settings size={18} />}
            </button>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 transition"><X size={20} /></button>
          </div>
        </div>

        {/* Passcode Prompt */}
        <AnimatePresence>
          {showAdminPrompt && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="border-b border-white/10 overflow-hidden"
            >
              <div className="p-4 flex items-center gap-3">
                <Lock size={14} className="text-primary shrink-0" />
                <input
                  type="password"
                  placeholder="Enter passcode..."
                  autoFocus
                  maxLength={10}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/50"
                  onKeyDown={e => { if (e.key === "Enter") handlePasscode((e.target as HTMLInputElement).value); }}
                />
                <button onClick={() => setShowAdminPrompt(false)} className="text-xs text-muted-foreground hover:text-white">Cancel</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {!openFolderId ? (
            <div className="space-y-6">
              {isAdmin && (
                <div className="flex gap-2">
                  <input value={newFolderName} onChange={e => setNewFolderName(e.target.value)} placeholder="New album name..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/50"
                    onKeyDown={e => { if (e.key === "Enter") addFolder(); }} />
                  <button onClick={addFolder} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl"><Plus size={16} /></button>
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {folders.map(folder => (
                  <motion.div key={folder.id} whileHover={{ y: -4 }}
                    onClick={() => setOpenFolderId(folder.id)}
                    className="rounded-2xl border border-white/5 cursor-pointer group relative overflow-hidden"
                  >
                    {/* Cover image or default */}
                    {folder.cover ? (
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={folder.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-white/5 flex items-center justify-center">
                        <FolderOpen className="w-10 h-10 text-primary/40" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-sm font-medium text-white drop-shadow-lg">{folder.name}</p>
                      <p className="text-[10px] text-white/60">{folder.images.length} photos</p>
                    </div>
                    {isAdmin && (
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button onClick={e => { e.stopPropagation(); setCover(folder.id); }}
                          className="p-1.5 rounded-lg bg-black/60 hover:bg-primary text-white transition">
                          <Image size={12} />
                        </button>
                        <button onClick={e => { e.stopPropagation(); removeFolder(folder.id); }}
                          className="p-1.5 rounded-lg bg-black/60 hover:bg-red-500 text-white transition">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              {folders.length === 0 && !isAdmin && (
                <p className="text-center text-muted-foreground/40 text-sm py-12">No albums yet.</p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {isAdmin && (
                <button onClick={() => addImage(openFolderId)} className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary text-sm hover:bg-primary/20 transition">
                  <Image size={16} /> Add Photos
                </button>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentFolder?.images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group cursor-zoom-in">
                    <img src={img} alt="" className="w-full h-full object-cover" onClick={() => setSelectedImgIndex(i)} />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                      <Maximize2 className="text-white w-5 h-5" />
                    </div>
                    {isAdmin && (
                      <button onClick={() => removeImage(openFolderId, i)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {currentFolder?.images.length === 0 && (
                <p className="text-center text-muted-foreground/40 text-sm py-8">
                  {isAdmin ? "Add some photos to this album" : "No photos yet"}
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* View Only Lightbox */}
      <AnimatePresence>
        {selectedImgIndex !== null && currentFolder && (
          <Lightbox
            images={currentFolder.images}
            index={selectedImgIndex}
            onClose={() => setSelectedImgIndex(null)}
            onPrev={() => setSelectedImgIndex(prev => prev! > 0 ? prev! - 1 : currentFolder.images.length - 1)}
            onNext={() => setSelectedImgIndex(prev => prev! < currentFolder.images.length - 1 ? prev! + 1 : 0)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FolderModal;
