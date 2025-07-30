import { IoCloseOutline } from "react-icons/io5";
import type { ProductVariation } from "../types/products.types";
import { useState } from "react";

interface SizeListProps {
  isOpen: boolean;
  onClose: () => void;
  variations: ProductVariation[];
  onSelectVariation?: (variation: ProductVariation) => void;
  selectedVariation?: ProductVariation | null;
  hasFreeSample: boolean;
}

const SizeList = ({
  isOpen,
  onClose,
  variations,
  onSelectVariation,
  selectedVariation,
}: SizeListProps) => {
  const [showPricesWithoutVAT, setShowPricesWithoutVAT] =
    useState<boolean>(false);

  // VAT rate (20%)
  const VAT_RATE = 0.2;

  // Filter out free sample variations
  const filteredVariations = variations.filter((variation) => {
    if (!variation || !variation.attributes) return false;
    const sizeAttr = variation.attributes.find(
      (attr) => attr.name === "Sizemm" || attr.name === "pa_sizemm"
    );
    return sizeAttr && !sizeAttr.option.toLowerCase().includes("free sample");
  });

  

  // Calculate price for a given variation
  const calculatePrices = (variation: ProductVariation) => {
    if (!variation || !variation.attributes) {
      return { itemPrice: "-", m2Price: "-" };
    }

    const sizeAttr = variation.attributes.find(
      (attr) => attr.name === "Sizemm" || attr.name === "pa_sizemm"
    );
    if (!sizeAttr) return { itemPrice: "-", m2Price: "-" };

    const size = sizeAttr.option;
    let price = parseFloat(variation.price || "0");

    // Apply VAT toggle
    if (showPricesWithoutVAT) {
      price = price / (1 + VAT_RATE); // Remove VAT
    }

    // Check if it's a full size sample
    if (size.toLowerCase().includes("full size sample")) {
      return {
        itemPrice: `£${price.toFixed(2)}`,
        m2Price: "-",
      };
    }

    // Check for mosaic format: "49x49x10 (295x295x10)"
    const mosaicMatch = size.match(/\((\d+)x(\d+)x?\d*\)/);
    if (mosaicMatch) {
      // Use the sheet dimensions (from parentheses) for price calculation
      const sheetWidth = parseInt(mosaicMatch[1]); // in mm
      const sheetHeight = parseInt(mosaicMatch[2]); // in mm
      const areaInM2 = (sheetWidth * sheetHeight) / 1000000; // convert mm² to m²
      const m2Price = price; // Price from API is the m² price
      const itemPrice = (m2Price * areaInM2).toFixed(2); // Calculate total price for this size

      return {
        itemPrice: `£${itemPrice}`,
        m2Price: `£${m2Price.toFixed(2)}`,
      };
    }

    // For regular sizes, calculate price per M²
    const dimensions = size.match(/(\d+)x(\d+)/);
    if (dimensions) {
      const width = parseInt(dimensions[1]); // keep in mm
      const height = parseInt(dimensions[2]); // keep in mm
      const areaInM2 = (width * height) / 1000000; // convert mm² to m²
      const m2Price = price; // Price from API is the m² price
      const itemPrice = (m2Price * areaInM2).toFixed(2); // Calculate total price for this size

      return {
        itemPrice: `£${itemPrice}`,
        m2Price: `£${m2Price.toFixed(2)}`,
      };
    }

    return {
      itemPrice: `£${price.toFixed(2)}`,
      m2Price: "-",
    };
  };

  // Check if a variation is selected
  const isVariationSelected = (variation: ProductVariation) => {
    return selectedVariation?.id === variation.id;
  };

  // Sort variations to put Full Size Sample last
  const sortedVariations = [...filteredVariations].sort((a, b) => {
    const aIsFullSample =
      a.attributes?.some((attr) =>
        attr.option?.toLowerCase().includes("full size sample")
      ) ?? false;
    const bIsFullSample =
      b.attributes?.some((attr) =>
        attr.option?.toLowerCase().includes("full size sample")
      ) ?? false;

    if (aIsFullSample && !bIsFullSample) return 1;
    if (!aIsFullSample && bIsFullSample) return -1;
    return 0;
  });

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sliding Size List */}
      <div
        className={`fixed overflow-y-scroll overflow-x-hidden top-0 right-0 w-full md:w-[680px] h-screen md:p-10 p-4 bg-white z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="border-b border-[#e5e5e5] flex items-center justify-between h-1/14">
          <h2 className="text-[#1d2328] text-[2em] font-medium mb-6">
            Choose Size
          </h2>
          <IoCloseOutline
            size={40}
            className="hover:text-amber-800 duration-300 cursor-pointer mb-4"
            onClick={onClose}
          />
        </div>

        <div className="relative inline-block w-16 h-9 self-end right-[80px] top-5">
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0 peer"
            id="vat-toggle"
            checked={showPricesWithoutVAT}
            onChange={() => setShowPricesWithoutVAT(!showPricesWithoutVAT)}
          />
          {/* Track */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition duration-300 peer-checked:bg-amber-800"></div>
          {/* Thumb */}
          <div className="absolute h-5 w-5 left-1.5 bottom-[4px] bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-7"></div>

          {/* Label */}
          <label
            htmlFor="vat-toggle"
            className="cursor-pointer absolute right-[-75px] bottom-1.5 text-xs font-thin tracking-wider uppercase text-gray-500"
          >
            hide vat?
          </label>
        </div>

        {/* Body */}
        <div className="flex flex-col h-full mt-12">
          {/* Headers */}
          <span className="flex py-2 px-6 items-center justify-between">
            <p>Size (mm)</p>
            <span className="flex items-center gap-12">
              <p>Price (item)</p>
              <p>
                Price (M<sup>2</sup>)
              </p>
            </span>
          </span>

          {/* Size Options */}
          {sortedVariations.map((variation) => {
            if (!variation || !variation.attributes) return null;

            const isOutOfStock = !variation.instock;

            const prices = calculatePrices(variation);
            const sizeAttr = variation.attributes.find(
              (attr) => attr.name === "Sizemm" || attr.name === "pa_sizemm"
            );
            if (!sizeAttr) return null;

            const isFullSample = sizeAttr.option
              .toLowerCase()
              .includes("full size sample");
            const isSelected = isVariationSelected(variation);

            return (
              <div
                key={variation.id}
                onClick={() => {
                  if (isOutOfStock) return;
                  if (onSelectVariation) {
                    onSelectVariation(variation);
                  }
                  onClose();
                }}
                className={`border flex items-center justify-between rounded-lg min-h-[52px]  duration-300 mb-2 transition-all ${
                  isSelected
                    ? "border-amber-800 bg-[#aa4b4418]"
                    : isOutOfStock
                    ? "border-[#e5e5e5] cursor-default"
                    : "border-[#e5e5e5] hover:border-amber-800 cursor-pointer"
                } ${
                  isOutOfStock
                    ? "bg-[#f9f9f9] text-[#6f7376] min-h-[65px] "
                    : ""
                }`}
              >
                <p className="text-lg ml-6 flex flex-col">
                  {sizeAttr.option}{" "}
                  {isOutOfStock && (
                    <small className="text-[12.5px] tracking-normal font-thin flex items-center gap-1">
                      <span className="flex items-center gap-1 pointer-events-none">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.5 13a6.5 6.5 0 110-13 6.5 6.5 0 010 13zm0-1.3a5.2 5.2 0 100-10.4 5.2 5.2 0 000 10.4zm-.65-3.25h1.3v1.3h-1.3v-1.3zm1.3-1.07v.42h-1.3v-.975a.65.65 0 01.65-.65.975.975 0 10-.956-1.166l-1.275-.256A2.276 2.276 0 117.15 7.381z"
                            fill="#808387"
                          ></path>
                        </svg>
                        Temporarily out of stock
                      </span>
                      <button
                        onClick={() =>
                          console.log("out of stock variation clicked")
                        }
                        className="ml-1 underline text-amber-800 cursor-pointer pointer-events-auto"
                      >
                        Enquire about a lead time.
                      </button>
                    </small>
                  )}
                </p>
                <span className="flex items-center mr-12 gap-12 relative">
                  <p
                    className={`${
                      isFullSample ? "text-lg mr-7" : "text-lg mr-2 absolute -left-38"
                    }`}
                  >
                    {prices.itemPrice}
                  </p>
                  <p
                    className={`${
                      isFullSample ? "text-lg mr-6" : "text-lg ml-0 absolute right-6"
                    }`}
                  >
                    {prices.m2Price}
                  </p>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SizeList;
