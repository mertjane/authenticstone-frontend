import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useCartState } from "../hooks/useCartState";
import { useProductVariations } from "../queries/useProductVariations";
import type { ProductVariation } from "../types/products.types";

interface ActionButtonProps {
  selectedVariation?: ProductVariation | null;
  fullSampleQty?: number | string;
  regularProductQty?: number | string;
  showSizeError: boolean;
  setShowQtyError: (show: boolean) => void;
  setShowSizeError: (show: boolean) => void;
  hasFreeSample: boolean;
  m2Quantity?: number | string;
  productId: number;
}

const ActionButtons = ({
  selectedVariation,
  fullSampleQty,
  regularProductQty,
  setShowQtyError,
  setShowSizeError,
  hasFreeSample,
  m2Quantity,
  productId,
}: ActionButtonProps) => {
  const { addToCart } = useCart();
  const { openCart } = useCartState();
  const { data: productVariations } = useProductVariations(productId);
  /* const isAddingToCart = addToCart.isPending; */
  const [isAddingRegularProduct, setIsAddingRegularProduct] = useState(false);
  const [isAddingFreeSample, setIsAddingFreeSample] = useState(false);
  // Safely check if it's a full size sample
  const isFullSizeSample =
    selectedVariation?.attributes?.some((attr) =>
      attr?.option?.includes("Full Size Sample")
    ) ?? false;

  // Parse quantity with proper type checking
  const parseQty = (value: number | string | undefined): number | undefined => {
    if (value === null || value === undefined) return undefined;

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "") return undefined;
      const parsed = parseFloat(trimmed);
      return isNaN(parsed) ? undefined : parsed;
    }

    return isNaN(value) ? undefined : value;
  };

  const relevantQty = isFullSizeSample ? fullSampleQty : regularProductQty;
  const parsedQty = parseQty(relevantQty);
  const parsedM2Qty = parseQty(m2Quantity); // Parse m² quantity

  // Safely get tile dimensions and calculate area
  const getTileAreaInM2 = (): number => {
    if (!selectedVariation?.attributes) return 0;

    const sizeAttribute = selectedVariation.attributes.find(
      (attr) => attr?.name === "Sizemm" || attr?.name === "pa_sizemm"
    );

    if (!sizeAttribute?.option) return 0;
    const option = sizeAttribute.option;

    // Check for mosaic format: "49x49x10 (295x295x10)"
    const mosaicMatch = option.match(/\((\d+)x(\d+)x?\d*\)/);
    if (mosaicMatch) {
      const sheetWidth = parseInt(mosaicMatch[1]); // in mm
      const sheetHeight = parseInt(mosaicMatch[2]); // in mm
      return (sheetWidth * sheetHeight) / 1000000; // convert mm² to m²
    }

    // For regular sizes: "610x305x10"
    const dimensionMatch = option.match(/(\d+)x(\d+)x?\d*/);
    if (!dimensionMatch) return 0;

    const widthMm = parseInt(dimensionMatch[1], 10);
    const lengthMm = parseInt(dimensionMatch[2], 10);
    return (widthMm * lengthMm) / 1000000;
  };

  const isValidQty = parsedQty !== undefined && parsedQty > 0;

  const pricePerUnit = parseFloat(selectedVariation?.price || "0");

  const calculateTotalPrice = (): string => {
    if (!selectedVariation || !isValidQty) return "0.00";

    if (isFullSizeSample) {
      return (pricePerUnit * parsedQty!).toFixed(2);
    }

    const sizeAttribute = selectedVariation.attributes?.find(
      (attr) => attr?.name === "Sizemm" || attr?.name === "pa_sizemm"
    );

    if (!sizeAttribute?.option) return "0.00";

    const isMosaic = sizeAttribute.option.includes("(");
    const areaPerSheet = getTileAreaInM2();
    const totalArea = areaPerSheet * parsedQty!;

    return isMosaic
      ? (pricePerUnit * totalArea).toFixed(2)
      : (pricePerUnit * parsedQty! * areaPerSheet).toFixed(2);
  };

  const handleAddToCart = () => {
    if (!selectedVariation) {
      setShowSizeError(true);
      setShowQtyError(false);
      return;
    }

    if (!isValidQty) {
      setShowSizeError(false);
      setShowQtyError(true);
      return;
    }

    setShowSizeError(false);
    setShowQtyError(false);
    setIsAddingRegularProduct(true);

    const isSample =
      isFullSizeSample ||
      selectedVariation.attributes?.some((attr) =>
        attr?.option?.includes("Free Sample")
      );

    // Ensure quantities are properly formatted
    const quantityToSend = parsedQty !== undefined ? Math.floor(parsedQty) : 1;
    const m2QuantityToSend =
      parsedM2Qty !== undefined
        ? parseFloat(parsedM2Qty.toFixed(3))
        : undefined;

    // Debug the selectedVariation to understand its structure
    console.log("selectedVariation object:", {
      id: selectedVariation.id,
      parent_id: selectedVariation.parent_id,
      allProperties: Object.keys(selectedVariation),
    });

    const cartItem = {
      product_id: selectedVariation.parent_id || selectedVariation.id,
      variation_id: selectedVariation.id,
      is_sample: isSample,
      quantity: quantityToSend,
      m2_quantity: isSample ? undefined : m2QuantityToSend,
    };

    console.log("Attempting to add to cart:", {
      ...cartItem,
      selectedVariation: selectedVariation.id,
      isSample,
      isFullSizeSample,
    });

    addToCart.mutate(cartItem, {
      onSuccess: (data) => {
        console.log("Added to cart:", data);
        setIsAddingRegularProduct(false);
        openCart();
      },
      onError: (error: any) => {
        console.error(
          "Error adding to cart:",
          error.response?.data || error.message
        );
        setIsAddingRegularProduct(false);
      },
    });
  };

  // New handler for free sample button
  const handleOrderFreeSample = () => {
    // Clear any existing errors
    setShowSizeError(false);
    setShowQtyError(false);

    // Find the free sample variation from available product variations
    const freeSampleVariation = productVariations?.find(
      (variation: ProductVariation) =>
        variation.attributes?.some((attr) =>
          attr?.option?.includes("Free Sample")
        )
    );

    setIsAddingFreeSample(true);

    if (!freeSampleVariation) {
      console.error("No free sample variation found in product variations");
      return;
    }

    const cartItem = {
      product_id:
        (freeSampleVariation as any).parent_id || freeSampleVariation.id,
      variation_id: freeSampleVariation.id,
      is_sample: true,
      quantity: 1, // Always 1 for free sample
      m2_quantity: undefined, // No m2 quantity for samples
    };

    console.log("Attempting to add free sample to cart:", cartItem);

    addToCart.mutate(cartItem, {
      onSuccess: (data) => {
        console.log("Added free sample to cart:", data);
        setIsAddingFreeSample(false);
        openCart();
      },
      onError: (error: any) => {
        console.error(
          "Error adding free sample to cart:",
          error.response?.data || error.message
        );
        setIsAddingFreeSample(false);
      },
    });
  };

  const getAddToCartText = (): string => {
    if (isValidQty && selectedVariation) {
      return `Add to cart - £${calculateTotalPrice()}`;
    }
    return "Add to cart";
  };

  return (
    <div className="flex items-center mt-4">
      <button
        disabled={isAddingRegularProduct}
        onClick={handleAddToCart}
        className={`min-h-[61px] flex-1 flex items-center justify-center  px-4 md:text-lg text-sm tracking-wide font-thin gap-2 uppercase border border-[#aa4a44]
    ${
      isValidQty && selectedVariation
        ? "bg-[#aa4a44] text-white border-[#aa4a44]"
        : "bg-[#aa4a4433] text-[#1d2328] border-[#aa4a44]"
    }
  `}
      >
        {isAddingRegularProduct ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Adding...
          </>
        ) : (
          <>{getAddToCartText()}</>
        )}
      </button>

      {hasFreeSample && (
        <button
          disabled={isAddingFreeSample}
          onClick={handleOrderFreeSample}
          className="min-h-[61px] flex-1 flex items-center justify-center gap-4 px-4 md:text-lg text-sm text-[#1d2328] border border-[#1d2328] tracking-wide font-thin uppercase text-center hover:bg-[#1d2328] duration-300 hover:text-white"
        >
          {isAddingFreeSample ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Adding...
            </>
          ) : (
            "Order Sample"
          )}
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
