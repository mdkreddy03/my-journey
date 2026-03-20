import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, ArrowLeft, Image, Calendar } from "lucide-react";

interface BlogNote {
  id: string;
  title: string;
  content: string;
  images: string[];
  createdAt: number;
}

const PrivateBlogModal = ({ onClose }: { onClose: () => void }) => {
  const [notes, setNotes] = useState<BlogNote[]>(() =>
    JSON.parse(localStorage.getItem("private_notes_v2") || "[]")
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteImages, setNoteImages] = useState<string[]>([]);

  const persist = (updated: BlogNote[]) => {
    setNotes(updated);
    localStorage.setItem("private_notes_v2", JSON.stringify(updated));
  };

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file"; input.accept = "image/*"; input.multiple = true;
    input.onchange = () => {
      if (!input.files) return;
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => setNoteImages(prev => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
      });
    };
    input.click();
  };

  const save = () => {
    if (!title.trim()) return;
    const newNote: BlogNote = {
      id: crypto.randomUUID(),
      title,
      content,
      images: noteImages,
      createdAt: Date.now(),
    };
    persist([newNote, ...notes]);
    setTitle(""); setContent(""); setNoteImages([]); setComposing(false);
  };

  const remove = (id: string) => persist(notes.filter(n => n.id !== id));

  const expandedNote = notes.find(n => n.id === expandedId);

  const formatDate = (ts: number) => new Date(ts).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
  });

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
            {(expandedId || composing) && (
              <button onClick={() => { setExpandedId(null); setComposing(false); }} className="p-1.5 rounded-lg hover:bg-white/10 transition">
                <ArrowLeft size={16} />
              </button>
            )}
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {composing ? "New Note" : expandedNote ? expandedNote.title : "Private Blog"}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {composing ? "Write your story" : expandedNote ? formatDate(expandedNote.createdAt) : `${notes.length} notes`}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 transition">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {/* COMPOSE VIEW */}
            {composing && (
              <motion.div key="compose" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6 space-y-4">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50" />
                <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write your story..."
                  rows={10} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none custom-scrollbar" />
                
                {/* Image attachments */}
                <div className="space-y-3">
                  <button onClick={addImage} className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary text-sm hover:bg-primary/20 transition">
                    <Image size={16} /> Attach Images
                  </button>
                  {noteImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {noteImages.map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button onClick={() => setNoteImages(prev => prev.filter((_, idx) => idx !== i))}
                            className="absolute top-1 right-1 p-1 rounded-lg bg-black/60 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition">
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button onClick={save} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition">
                  Save Note
                </button>
              </motion.div>
            )}

            {/* EXPANDED NOTE VIEW */}
            {expandedNote && !composing && (
              <motion.div key="expanded" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6 space-y-6">
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Calendar size={12} />
                  {formatDate(expandedNote.createdAt)}
                </div>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {expandedNote.content}
                </div>
                {expandedNote.images && expandedNote.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {expandedNote.images.map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden">
                        <img src={img} alt="" className="w-full h-auto object-cover rounded-xl" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* NOTES LIST */}
            {!expandedId && !composing && (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 space-y-4">
                <button onClick={() => setComposing(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary/10 border border-primary/20 rounded-xl text-primary text-sm hover:bg-primary/20 transition">
                  <Plus size={16} /> New Note
                </button>
                {notes.map(note => (
                  <motion.div key={note.id} whileHover={{ y: -2 }}
                    className="glass rounded-2xl p-5 border border-white/5 cursor-pointer group"
                    onClick={() => setExpandedId(note.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground">{note.title}</h4>
                      <button onClick={e => { e.stopPropagation(); remove(note.id); }}
                        className="text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100 transition">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{note.content}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
                        <Calendar size={10} /> {formatDate(note.createdAt)}
                      </span>
                      {note.images && note.images.length > 0 && (
                        <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
                          <Image size={10} /> {note.images.length} photos
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
                {notes.length === 0 && (
                  <p className="text-center text-muted-foreground/40 text-sm py-8">No notes yet. Start writing!</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrivateBlogModal;
