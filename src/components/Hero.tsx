import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import type { Slide } from "../types/carousel.types";

interface HeroSliderProps {
  slides: Slide[];
  autoSlideInterval?: number;
}

const Hero = ({ slides, autoSlideInterval = 10000 }: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Preload images
  const preloadImage = useCallback((imageUrl: string) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(imageUrl));
        resolve();
      };
      img.onerror = () => resolve(); // Still resolve on error to prevent hanging
      img.src = imageUrl;
    });
  }, []);

  // Preload all images on component mount
  useEffect(() => {
    slides.forEach(slide => {
      preloadImage(slide.imageURL);
    });
  }, [slides, preloadImage]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoSlideInterval);
    return () => clearInterval(timer);
  }, [slides.length, autoSlideInterval]);

  const currentSlide = slides[currentIndex];

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="h-max md:h-screen w-full bg-[#ffffff] md:bg-[#111111] p-4 md:p-14 flex flex-col md:flex-row mb-5">
      {/* Slider Description - Now prioritized in DOM */}
      <div className="p-0  py-14 md:p-8 flex-col w-full md:w-2/4 h-full relative order-2 md:order-1">
        <p className="text-[#1d3828] md:text-[#ffffff] uppercase text-md font-thin md:text-[17px]">
          {currentSlide.subtitle}
        </p>
        <h1
          className="text-[#1d2328] text-6xl md:text-[5em] md:text-[#ffffff] my-6 md:my-8 w-5/5 md:w-3/4 font-semibold leading-[1.1]"
          id="hero-title"
        >
          {currentSlide.title}
        </h1>

        <p className="w-[95%] md:w-[70%] text-sm text-slate-700 md:text-slate-200 font-light">
          {currentSlide.description}
        </p>
        <Link
          className="px-12 py-4 border border-[#111111] md:border-[#ffffff] bg-[#191b3f1e] md:bg-[#383838] relative top-12 uppercase font-light text-[#111111] md:text-[#ffffff] hover:bg-[#111111] md:hover:bg-[#ffffff] duration-300 hover:text-[#ffffff] md:hover:text-[#111111]"
          to={currentSlide.link}
        >
          explore now
        </Link>

        <div
          id="slider-control"
          className="w-[max-content] control flex items-center gap-2 absolute top-0 md:left-[35%] md:top-[95%] md:bottom-0 left-10 h-[50px]"
        >
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => handleIndicatorClick(i)}
              className={`indicator ${
                i === currentIndex
                  ? "h-1 w-[60px] bg-amber-600"
                  : "h-0.5 w-[40px] bg-gray-300"
              } bg-gray-300 cursor-pointer hover:bg-gray-200 transition-all duration-300`}
            ></div>
          ))}
        </div>
      </div>

      {/* Slider Images */}
      <div
        className={`w-full md:w-2/4 h-[400px] md:h-full relative order-1 md:order-2 transition-all duration-500 overflow-hidden bg-cover bg-center bg-no-repeat ${
          loadedImages.has(currentSlide.imageURL) ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${currentSlide.imageURL})`,
        }}
      >
        {/* Loading placeholder */}
        {!loadedImages.has(currentSlide.imageURL) && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
