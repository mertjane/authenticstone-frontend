import { GoChevronRight } from "react-icons/go";
import type { ProductVariation } from "../types/products.types";
import { useEffect } from "react";

interface DisplaySizeOptionsProps {
  onOpenSizeList: () => void;
  variations: ProductVariation[];
  selectedVariation?: ProductVariation | null;
  showSizeError: boolean;
  setShowSizeError: (show: boolean) => void;
}

const DisplaySizeOptions = ({
  onOpenSizeList,
  variations = [], 
  selectedVariation,
  showSizeError,
  setShowSizeError,
}: DisplaySizeOptionsProps) => {
  // Filter out free sample variations and count available options
  const availableOptions = variations.filter((variation) => {
    if (!variation || !variation.attributes) return false;
    const sizeAttr = variation.attributes.find(
      (attr) => attr.name === "Sizemm" || attr.name === "pa_sizemm"
    );
    return sizeAttr && !sizeAttr.option.toLowerCase().includes("free sample");
  }).length;

  // Get the selected size display text
  const getSelectedSizeText = () => {
    if (!selectedVariation || !selectedVariation.attributes) return null;
    const sizeAttr = selectedVariation.attributes.find(
      (attr) => attr.name === "Sizemm" || attr.name === "pa_sizemm"
    );
    return sizeAttr?.option || null;
  };

  const selectedSize = getSelectedSizeText();

  useEffect(() => {
    if (selectedVariation) {
      setShowSizeError(false);
    }
  }, [selectedVariation]);

  return (
    <div className="py-6 relative">
      <h2 className="flex items-center text-2xl relative mb-4">
        <strong className="text-amber-800">1.</strong>{" "} Choose Size
        <p
          className={`absolute right-0 text-xs uppercase tracking-wide bg-[#808387] text-white w-max p-2 rounded-lg transition-opacity duration-400 ${
            showSizeError ? "opacity-100" : "opacity-0"
          }`}
        >
          size required
        </p>
      </h2>
      <div
        onClick={onOpenSizeList}
        className="relative flex items-center justify-between border border-[#e5e5e5] px-4 py-4 w-full mt-2 cursor-pointer transition-all duration-300"
      >
        <span className="flex items-center flex-wrap">
          {selectedSize ? (
            <div className="flex items-center justify-between w-[490px]">
              <strong className="text-[#1d2328] text-md tracking-wide font-medium ml-2">
                {selectedSize}
              </strong>
              <span className="flex items-center gap-2 absolute right-4">
                <strong className="text-amber-800 text-xs tracking-wide font-thin ml-2 uppercase ">
                  change size
                </strong>
              </span>
            </div>
          ) : (
            <>
              <p className="text-gray-800 font-[var(--font-medium)] text-md tracking-wide">
                Click here to choose a size:
              </p>
              <strong className="text-amber-800 text-md tracking-wide font-[var(--font-medium)] ml-2">
                {availableOptions} option{availableOptions !== 1 ? "s" : ""}{" "}
                available
              </strong>
            </>
          )}
        </span>

        <GoChevronRight size={20} className="text-gray-800" />
      </div>
    </div>
  );
};

export default DisplaySizeOptions;
