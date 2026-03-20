import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({ images, index, onClose, onPrev, onNext }: LightboxProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrev, onNext, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-8 right-8 p-3 glass rounded-full hover:bg-white/20 transition z-[110]">
        <X className="w-6 h-6 text-white" />
      </button>

      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 p-4 text-white/40 hover:text-white transition-all z-[110]"
      >
        <ChevronLeft size={48} strokeWidth={1.5} />
      </button>

      <motion.div key={index} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={images[index]} alt="" className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl select-none" />
        <div className="absolute bottom-[-40px] left-0 right-0 text-center text-white/50 text-sm">
          {index + 1} / {images.length}
        </div>
      </motion.div>

      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 p-4 text-white/40 hover:text-white transition-all z-[110]"
      >
        <ChevronRight size={48} strokeWidth={1.5} />
      </button>
    </motion.div>
  );
};

export default Lightbox;
