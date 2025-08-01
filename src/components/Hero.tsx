import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import type { Slide } from "../types/carousel.types";

interface HeroSliderProps {
  slides: Slide[];
  autoSlideInterval?: number;
}

const Hero = ({ slides, autoSlideInterval = 10000 }: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [direction, _setDirection] = useState<number>(1);

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const textVariants = {
    enter: {
      y: 20,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const childVariants = {
    enter: {
      y: 20,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -20,
      opacity: 0,
    },
  };

  // Preload images
  const preloadImage = useCallback((imageUrl: string) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(imageUrl));
        resolve();
      };
      img.onerror = () => resolve(); // Still resolve on error to prevent hanging
      img.src = imageUrl;
    });
  }, []);

  // Preload all images on component mount
  useEffect(() => {
    slides.forEach((slide) => {
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
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="h-full"
          >
            <motion.p
              variants={childVariants}
              className="text-[#1d3828] md:text-[#ffffff] uppercase text-md font-thin md:text-[17px]"
            >
              {currentSlide.subtitle}
            </motion.p>
            <motion.h1
              variants={childVariants}
              className="text-[#1d2328] text-6xl md:text-[5em] md:text-[#ffffff] my-6 md:my-8 w-5/5 md:w-3/4 font-semibold leading-[1.1]"
              id="hero-title"
            >
              {currentSlide.title}
            </motion.h1>
            <motion.p
              variants={childVariants}
              className="w-[95%] md:w-[70%] text-lg text-slate-700 md:text-slate-200 font-[var(--font-light)]"
            >
              {currentSlide.description}
            </motion.p>
            <motion.div
              variants={childVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                className="inline-block px-12 py-4 border border-[#111111] md:border-[#ffffff] bg-[#191b3f1e] md:bg-[#383838] relative top-12 uppercase font-light text-[#111111] md:text-[#ffffff] hover:bg-[#111111] md:hover:bg-[#ffffff] duration-300 hover:text-[#ffffff] md:hover:text-[#111111] transition-all"
                to={currentSlide.link}
              >
                explore now
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div
          id="slider-control"
          className="w-[max-content] control flex items-center gap-2 absolute top-0 md:left-[50%] md:top-[95%] md:bottom-0 left-10 h-[50px]"
        >
          {slides.map((_, i) => (
            <motion.div
              key={i}
              onClick={() => handleIndicatorClick(i)}
              className={`indicator cursor-pointer transition-all duration-300 ${
                i === currentIndex
                  ? "h-1 w-[60px] bg-amber-800"
                  : "h-0.5 w-[40px] bg-gray-300 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                width: i === currentIndex ? 60 : 40,
                height: i === currentIndex ? 4 : 2,
                backgroundColor: i === currentIndex ? "#d94206" : "#d1d5db",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Slider Images */}
      <div className="w-full md:w-2/4 h-[400px] md:h-full relative order-1 md:order-2 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${
              loadedImages.has(currentSlide.imageURL)
                ? "opacity-100"
                : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${currentSlide.imageURL})`,
            }}
          >
            {/* Loading placeholder */}
            {!loadedImages.has(currentSlide.imageURL) && (
              <motion.div
                className="absolute inset-0 bg-gray-200 flex items-center justify-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="text-gray-400"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Loading...
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Optional: Add a subtle overlay animation */}
        <motion.div
          className="absolute inset-0 bg-black opacity-10"
          animate={{ opacity: [0.1, 0.05, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default Hero;
