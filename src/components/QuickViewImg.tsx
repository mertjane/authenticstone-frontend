import { useState } from "react";

interface Image {
  id: number;
  src: string;
  alt: string;
}

interface QuickViewImgProps {
  images: Image[];
}

const QuickViewImg = ({ images }: QuickViewImgProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        No image available
      </div>
    );
  }

  return (
    <div className="relative mt-4">
      <div className="aspect-square bg-white">
        <img
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-300 ${
              index === currentImageIndex ? "bg-slate-950" : "bg-gray-200 hover:bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default QuickViewImg;
