import { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "./Cart";

interface SearchComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchComponent = ({ isOpen, onClose }: SearchComponentProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }} // Faster fade
          className="fixed inset-0 z-20 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{
              type: "spring",
              stiffness: 500, // Stiffer spring
              damping: 30, // Less bouncy
              duration: 0.2, // Faster overall
            }}
            className="fixed left-0 right-0 h-screen bg-white shadow-lg"
            style={{ top: 0, minHeight: "200px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-end p-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <IoClose size={24} color="#1d2328" />
              </button>
            </div>

            {/* Search Input */}
            <div className="px-42 pt-10">
              <div className="relative">
                <CiSearch
                  size={30}
                  stroke="2"
                  color="#6b7280"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                />
                <input
                  type="text"
                  className="w-full pl-2 pr-4 py-3 border-b-2 text-2xl font-[var(--font-light)] placeholder:text-2xl placeholder:font-[var(--font-light)] border-gray-300 outline-none focus:border-b-amber-800 duration-300"
                  placeholder="Search for products..."
                  autoFocus
                />
              </div>
            </div>
          </motion.div>

          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchComponent;
