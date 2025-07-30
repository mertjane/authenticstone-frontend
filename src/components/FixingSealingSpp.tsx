import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { STONE_QUERY_KEYS } from "../queries/stoneCollection.query";
import { stoneCollectionAPI } from "../lib/api/stoneCollection.api";
import type { Product } from "../types/products.types";

const FixingSealingSpp = () => {
  const productsPerSlide = 4;
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: STONE_QUERY_KEYS.FIXING_SEALING,
    queryFn: () => stoneCollectionAPI.fetchSealingProducts(),
  });

  const products: Product[] = data?.data?.slice(0, 8) || [];
  const totalSlides = Math.ceil(products.length / productsPerSlide);

  const getCurrentSlideProducts = () => {
    const start = currentSlide * productsPerSlide;
    return products.slice(start, start + productsPerSlide);
  };

  const handlePrev = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));

  const canGoPrev = currentSlide > 0;
  const canGoNext = currentSlide < totalSlides - 1;

  const handleProductClick = (product: Product) => {
    // Handle navigation or interaction here
    console.log("Clicked product:", product);
  };

  if (isLoading)
    return <div className="text-center py-10">Loading related products...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load products
      </div>
    );
  if (products.length === 0) return null;
  return (
    <div className="min-h-screen flex flex-col md:pl-6 pl-4 pb-6 pt-6">
      <h1 className="mx-auto text-center md:text-7xl text-4xl p-0 text-[#1d2328] tracking-tight">
        Fixing & Sealing Products
      </h1>
      {/* Product Slider */}
      <div className="md:pl-10 pl-0 pb-10 pt-0 h-screen flex flex-col">
        <div className="w-full h-full py-20 flex gap-10 transition-transform duration-300 ease-in-out overflow-x-scroll">
          {/* Products maximum 8 product we already fetching 12 for each page so we can show as a slider 8 of them here except the what we are previewing  */}
          {getCurrentSlideProducts().map((product: Product) => (
            <div
              key={product.id}
              className="md:w-3/12 w-full flex-shrink-0 h-full cursor-pointer group"
              onClick={() => handleProductClick(product)}
            >
              <div className="h-full flex flex-col bg-white duration-300">
                {/* Product Image */}
                <div className="flex-1 overflow-hidden">
                  {product.images && product.images.length > 0 && (
                    <picture className="w-full h-full">
                      <source
                        type="image/webp"
                        srcSet={product.images[0].src}
                      />
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={product.images[0].src}
                        alt={product.images[0].alt || product.name}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col justify-between h-32">
                  <div>
                    <p className="text-xs text-amber-800 uppercase tracking-wider font-[var(--font-light)] mb-2">
                      {product.categories?.[0]?.name || "Product"}
                    </p>
                    <p className="text-xl font-[var(--font-regular)] text-[#1d2328] line-clamp-2 group-hover:text-amber-800 transition-colors duration-300">
                      {product.name}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-md text-amber-800 font-[var(--font-regular)] uppercase">
                      from £{product.price_html} / M<sup>2</sup>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Fill empty slots if less than 4 products in current slide */}
          {getCurrentSlideProducts().length < productsPerSlide &&
            Array.from({
              length: productsPerSlide - getCurrentSlideProducts().length,
            }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="w-3/12 h-full opacity-0"
              ></div>
            ))}
        </div>

        {/* Slider Controls */}
        {totalSlides > 1 && (
          <div className="flex w-full items-center justify-between pr-28 gap-16">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`bg-transparent outline-none font-[var(--font-light)] text-xs uppercase tracking-wider transition-colors duration-300 ${
                canGoPrev
                  ? "text-gray-800 hover:text-amber-800 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              prev
            </button>

            {/* Progress Bar */}
            <div className="w-full bg-[#e5e5e5] h-0.5 relative">
              <div
                className="h-full bg-amber-800 transition-all duration-300 ease-in-out"
                style={{
                  width: `${((currentSlide + 1) / totalSlides) * 100}%`,
                }}
              ></div>
            </div>

            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`bg-transparent outline-none font-[var(--font-light)] text-xs uppercase tracking-wider transition-colors duration-300 ${
                canGoNext
                  ? "text-gray-800 hover:text-amber-800 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FixingSealingSpp;
