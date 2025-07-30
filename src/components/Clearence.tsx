import { useClearanceQuery } from "../queries/clearences.query";
import type { ClearanceProduct } from "../types/clearence.types";
import { parsePriceFromHtml } from "../utils/parsePrice";

const ClearanceSkeleton = () => (
  <div className="group w-[400px] bg-white shadow-lg overflow-hidden border border-gray-100 animate-pulse">
    {/* Image Skeleton */}
    <div className="relative">
      <div className="w-full h-64 bg-gray-200" />
      {/* Discount Badge Skeleton */}
      <div className="absolute top-4 left-4 h-6 w-16 bg-gray-300 rounded-full" />
      {/* Material Badge Skeleton */}
      <div className="absolute bottom-4 left-4 h-5 w-24 bg-gray-300 rounded-full" />
    </div>

    {/* Content Skeleton */}
    <div className="p-6">
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />

      {/* Price Skeleton */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-8 w-24 bg-gray-200 rounded" />
        <div className="h-6 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>

      {/* Button Skeleton */}
      <div className="w-full h-12 bg-gray-200 rounded" />
    </div>
  </div>
);

export default function ClearanceTilesGrid() {
  const { data: clearances, isLoading, error } = useClearanceQuery();

  const tiles =
  clearances?.map((p: ClearanceProduct) => {
    const priceFromHtml = parsePriceFromHtml(p.price_html);
    const discountPercent = 15;
    const discountedPrice = priceFromHtml * (1 - discountPercent / 100);

    return {
      ...p,
      originalPrice: priceFromHtml,
      salePrice: discountedPrice,
      image: p.imageURL,
      discount: discountPercent,
      
    };
  }) || [];

  return (
    <div className="min-h-screen px-4 py-10 md:px-10 md:py-20 overflow-hidden">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="text-center mb-0 md:mb-12">
         
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Special Deals
          </h1>
          <p className="text-medium text-gray-600 max-w-xl mx-auto">
            Transform your space with high-quality tiles at unbeatable prices.
            Limited quantities available!
          </p>
        </div>

        {/* Tiles Grid */}
        <div className="w-full flex overflow-x-scroll relative py-8">
          <div className="flex gap-8 py-8">
            {isLoading ? (
              // Show 3 skeleton loaders while loading
              <>
                <ClearanceSkeleton />
                <ClearanceSkeleton />
                <ClearanceSkeleton />
                <ClearanceSkeleton />
              </>
            ) : error ? (
              <div className="w-full text-center text-red-500">
                Error loading clearance products
              </div>
            ) : (
              tiles.map((tile) => (
                <div
                  key={tile.id}
                  className="group w-[400px] bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative">
                    <img
                      src={tile.image}
                      alt={tile.name}
                      width={400}
                      height={250}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-64 object-cover"
                    />

                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{tile.discount}%
                    </div>

                    {/* Material Badge */}
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {tile.material}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      className="text-lg font-semibold text-gray-900 mb-2"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%", // or a fixed width like "250px"
                      }}
                    >
                      {tile.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl font-[var(--font-regular)] text-gray-900">
                        &pound;{tile.salePrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        &pound;{tile.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-600">per SQM</span>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full text-white bg-slate-950 font-semibold py-3 px-6 duration-200 flex items-center justify-center space-x-2">
                      {/* <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" /> */}
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Call to Action */}
        <div className="text-center mt-8 md:mt-16">
          <div className="bg-gradient-to-r from-slate-950 to-slate-950 p-8 md:p-14 text-white">
            <h2 className="text-6xl  mb-4">Limited Time Special Deals!</h2>
            <p className="text-medium font-light mb-6 opacity-90">
              Perfect for renovation projects. Professional quality tiles at
              wholesale prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a href="/stone-collection/stock-clearance" className="w-4/4 md:w-3/4 bg-white text-slate-950 font-bold py-3 px-8 hover:bg-gray-100 transition-colors">
                View All Special Deals
              </a>
              <button className="w-4/4 md:w-3/4 border-2 border-white text-white font-bold py-3 px-8 hover:bg-white hover:text-slate-950 transition-colors">
                Calculate My Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
