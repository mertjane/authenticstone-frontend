import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface Image {
  src: string;
  alt?: string;
}

interface ImagePreviewProps {
  images: Image[];
  selectedIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const ImagePreview = ({
  images,
  selectedIndex,
  onClose,
  onIndexChange,
}: ImagePreviewProps) => {
  const image = images[selectedIndex];

  const handlePrev = () => {
    const newIndex = (selectedIndex - 1 + images.length) % images.length;
    onIndexChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = (selectedIndex + 1) % images.length;
    onIndexChange(newIndex);
  };

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);


  return (
    <div className="max-h-screen fixed inset-0 z-[1000] bg-black bg-opacity-90 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition"
        aria-label="Close"
      >
        <X size={36} />
      </button>

      {/* Previous arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-6 text-white hover:text-gray-300 transition"
        aria-label="Previous image"
      >
        <ChevronLeft size={48} />
      </button>

      {/* Main image */}
      <div className="w-8/12 h-screen overflow-hidden">
        <img
          src={image.src}
          alt={image.alt || ""}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Next arrow */}
      <button
        onClick={handleNext}
        className="absolute right-6 text-white hover:text-gray-300 transition"
        aria-label="Next image"
      >
        <ChevronRight size={48} />
      </button>

      {/* Zoom icon (optional) */}
      <div className="absolute bottom-6 right-6 text-white">
        <ZoomIn size={24} />
      </div>
    </div>
  );
};

export default ImagePreview;
