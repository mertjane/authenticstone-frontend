import { useEffect, useState } from "react";
import type { Product } from "../types/products.types";
import { useNavigate } from "react-router";
import { queryClient } from "../lib/queryClient";
import { useCategoryQuery } from "../hooks/useCategoryQuery";

interface ProductSuggestionProps {
  currentProduct: Product;
}

const ProductSuggestion = ({ currentProduct }: ProductSuggestionProps) => {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shouldFetch, setShouldFetch] = useState(false);
  const navigate = useNavigate();

  const productsPerSlide = 4;
  const maxProducts = 8;

  // Only fetch if we don't have cached data
  const fallbackQuery = useCategoryQuery();

  useEffect(() => {
    const getFallbackProducts = () => {
      let allCachedProducts: Product[] = [];

      // Get all available query data from the cache
      const queryCache = queryClient.getQueryCache();
      const allQueries = queryCache.getAll();

      // Extract products from all cached queries
      allQueries.forEach((query) => {
        const data = query.state.data;

        // Handle infinite query structure (from CategoryPage)
        if (data && typeof data === "object" && (data as any).pages) {
          const products = (data as any).pages.flatMap(
            (page: any) => page.data || []
          );
          if (Array.isArray(products)) {
            allCachedProducts = [...allCachedProducts, ...products];
          }
        }

        // Handle direct array structure
        else if (Array.isArray(data)) {
          allCachedProducts = [...allCachedProducts, ...data];
        }

        // Handle object structure with nested data
        else if (data && typeof data === "object") {
          Object.values(data).forEach((value: any) => {
            if (value?.data && Array.isArray(value.data)) {
              allCachedProducts = [...allCachedProducts, ...value.data];
            }
          });
        }
      });

      // If we have fallback query data, use it
      if (fallbackQuery?.data?.pages && allCachedProducts.length === 0) {
        const fallbackProducts = fallbackQuery.data.pages.flatMap(
          (page: any) => page.data || []
        );
        allCachedProducts = [...allCachedProducts, ...fallbackProducts];
      }

      // Remove duplicates based on product ID
      const uniqueProducts = allCachedProducts.filter(
        (product, index, self) =>
          product &&
          product.id &&
          product.type !== "variation" && // ✅ Exclude variation products
          index === self.findIndex((p) => p && p.id === product.id)
      );

      // Filter related products based on categories or attributes
      const getRelatedProducts = () => {
        const currentCategories =
          currentProduct.categories?.map((cat) => cat.name.toLowerCase()) || [];

        // First try to find products from the same category
        const sameCategory = uniqueProducts.filter(
          (product) =>
            product.id !== currentProduct.id &&
            product.categories?.some((cat) =>
              currentCategories.includes(cat.name.toLowerCase())
            )
        );

        // If we have enough from same category, use those
        if (sameCategory.length >= maxProducts) {
          return sameCategory.slice(0, maxProducts);
        }

        // Otherwise, mix with other products
        const otherProducts = uniqueProducts.filter(
          (product) =>
            product.id !== currentProduct.id &&
            !sameCategory.some((p) => p.id === product.id)
        );

        const combined = [...sameCategory, ...otherProducts];
        return combined.slice(0, maxProducts);
      };

      return getRelatedProducts();
    };

    const products = getFallbackProducts();

    // If we don't have products and haven't triggered a fetch, do it now
    if (products.length === 0 && !shouldFetch) {
      setShouldFetch(true);
    }

    console.log("Suggested products found:", products.length); // Debug log
    setSuggestedProducts(products);
  }, [currentProduct.id, maxProducts, fallbackQuery?.data, shouldFetch]);

  const totalSlides = Math.ceil(suggestedProducts.length / productsPerSlide);
  const canGoPrev = currentSlide > 0;
  const canGoNext = currentSlide < totalSlides - 1;

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.slug}`, {
      state: { product },
      replace: false,
    });
    // Scroll to top when navigating to new product
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCurrentSlideProducts = () => {
    const startIndex = currentSlide * productsPerSlide;
    return suggestedProducts.slice(startIndex, startIndex + productsPerSlide);
  };

  // Show loading state if fetching or no products yet
  if (
    fallbackQuery?.isLoading ||
    (suggestedProducts.length === 0 && shouldFetch)
  ) {
    return (
      <div className="min-h-screen flex flex-col pl-6 pb-6 pt-6">
        <h1 className="mx-auto text-center md:text-6xl text-4xl p-6 text-[#1d2328] tracking-tight">
          You may also like
        </h1>
        <div className="pl-10 pb-10 pt-10 h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading related products...</p>
        </div>
      </div>
    );
  }

  // If still no products after trying everything, show message
  if (suggestedProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col pl-6 pb-6 pt-6">
        <h1 className="mx-auto text-center md:text-6xl text-4xl p-6 text-[#1d2328] tracking-tight">
          You may also like
        </h1>
        <div className="pl-10 pb-10 pt-10 h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">No related products found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:pl-6 pl-4 pb-6 pt-6">
      <h1 className="mx-auto text-center md:text-7xl text-5xl p-0 text-[#1d2328] tracking-tight">
        You may also like
      </h1>
      {/* Product Slider */}
      <div className="md:pl-10 pl-0 pb-10 pt-0 h-screen flex flex-col relative overflow-hidden">
        <div className="md:pr-0 pr-4 w-full h-full py-20 flex gap-10 transition-transform duration-300 ease-in-out overflow-hidden">
          {/* Products maximum 8 product we already fetching 12 for each page so we can show as a slider 8 of them here except the what we are previewing  */}
          {getCurrentSlideProducts().map((product: Product) => (
            <div
              key={product.id}
              className="md:w-3/12 w-full flex-shrink-0  h-full cursor-pointer group"
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
                className="md:w-3/12 w-full flex-shrink-0  h-full opacity-0"
              ></div>
            ))}
        </div>

        {/* Slider Controls */}
        {totalSlides > 1 && (
          <div className="flex w-full items-center justify-between md:pr-28 pr-4 gap-16">
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

export default ProductSuggestion;
