import { useEffect, useState } from "react";
import type { ProductVariation } from "../types/products.types";


interface CalculatorProps {
  selectedVariation?: ProductVariation | null;
  setFullSampleQty: (qty: number | undefined) => void;
  setRegularProductQty: (qty: number | undefined) => void;
  showQtyError: boolean;
  setShowQtyError: (show: boolean) => void;
  onM2QuantityChange?: (qty: number | undefined) => void; 
}

const Calculator = ({
  selectedVariation,
  setFullSampleQty,
  setRegularProductQty,
  showQtyError,
  setShowQtyError,
  onM2QuantityChange
}: CalculatorProps) => {
  const [pieceValue, setPieceValue] = useState<string>("");
  const [m2Value, setM2Value] = useState<string>("");
  const [isUpdatingPiece, setIsUpdatingPiece] = useState(false);
  const [isUpdatingM2, setIsUpdatingM2] = useState(false);

  const isFullSizeSample =
    selectedVariation?.attributes?.[0]?.option.includes("Full Size Sample");

  // Extract dimensions and calculate area per tile
  const getTileAreaInM2 = () => {
    if (!selectedVariation?.attributes?.[0]?.option || isFullSizeSample) {
      return 0;
    }

    const option = selectedVariation.attributes[0].option;
    
    // Check for mosaic format: "49x49x10 (295x295x10)"
    const mosaicMatch = option.match(/\((\d+)x(\d+)x?\d*\)/);
    if (mosaicMatch) {
      // Use the sheet dimensions (from parentheses) for price calculation
      const sheetWidth = parseInt(mosaicMatch[1]); // in mm
      const sheetHeight = parseInt(mosaicMatch[2]); // in mm
      const areaInM2 = (sheetWidth * sheetHeight) / 1000000; // convert mm² to m²
      return areaInM2;
    }

    // For regular sizes, extract dimensions like "610x305x10"
    const dimensionMatch = option.match(/(\d+)x(\d+)x?\d*/);
    if (!dimensionMatch) return 0;

    const widthMm = parseInt(dimensionMatch[1], 10);
    const lengthMm = parseInt(dimensionMatch[2], 10);

    // Convert mm to m and calculate area
    const widthM = widthMm / 1000;
    const lengthM = lengthMm / 1000;
    const areaM2 = widthM * lengthM;

    return areaM2;
  };

  const tileAreaM2 = getTileAreaInM2();

  // Handle piece input change
  const handlePieceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPieceValue(value);

    if (isUpdatingPiece) return;
    setIsUpdatingM2(true);

    if (value === "" || value.trim() === "") {
      setM2Value("");
      setFullSampleQty(undefined);
      setRegularProductQty(undefined);
      onM2QuantityChange?.(undefined); // Notify parent
      setShowQtyError(true);
    } else {
      const parsedPieces = parseInt(value, 10);
      if (!isNaN(parsedPieces) && parsedPieces > 0) {
        // Calculate total area covered by pieces
        const totalAreaM2 = parsedPieces * tileAreaM2;
        setM2Value(totalAreaM2.toFixed(3));
        onM2QuantityChange?.(totalAreaM2); // Notify parent

        if (isFullSizeSample) {
          setFullSampleQty(parsedPieces);
        } else {
          setRegularProductQty(parsedPieces);
        }
        setShowQtyError(false);
      } else {
        setM2Value("");
        setFullSampleQty(undefined);
        setRegularProductQty(undefined);
        onM2QuantityChange?.(undefined); // Notify parent
        setShowQtyError(true);
      }
    }

    setTimeout(() => setIsUpdatingM2(false), 0);
  };

  // Handle m² input change
  const handleM2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setM2Value(value);

    if (isUpdatingM2) return;
    setIsUpdatingPiece(true);

    if (value === "" || value.trim() === "") {
      setPieceValue("");
      setFullSampleQty(undefined);
      setRegularProductQty(undefined);
      onM2QuantityChange?.(undefined); // Notify parent
      setShowQtyError(true);
    } else {
      const parsedM2 = parseFloat(value);
      if (!isNaN(parsedM2) && parsedM2 > 0 && tileAreaM2 > 0) {
        // Calculate pieces needed for the area
        const piecesNeeded = Math.ceil(parsedM2 / tileAreaM2);
        setPieceValue(piecesNeeded.toString());
        onM2QuantityChange?.(undefined); // Notify parent

        if (isFullSizeSample) {
          setFullSampleQty(piecesNeeded);
        } else {
          setRegularProductQty(piecesNeeded);
        }
        setShowQtyError(false);
      } else {
        setPieceValue("");
        setFullSampleQty(undefined);
        setRegularProductQty(undefined);
        onM2QuantityChange?.(undefined); // Notify parent
        setShowQtyError(true);
      }
    }

    setTimeout(() => setIsUpdatingPiece(false), 0);
  };

  const handleM2Focus = () => {
    setM2Value("");
    setPieceValue("");
    if (isFullSizeSample) {
      setFullSampleQty(undefined);
    } else {
      setRegularProductQty(undefined);
    }
  };

  const handlePieceFocus = () => {
    setPieceValue("");
    setM2Value("");
    if (isFullSizeSample) {
      setFullSampleQty(undefined);
    } else {
      setRegularProductQty(undefined);
    }
  };

  const handleM2Blur = (e: any) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") return;
    
    const parsedM2 = parseFloat(value);
    if (!isNaN(parsedM2) && parsedM2 > 0 && tileAreaM2 > 0) {
      // Calculate pieces needed for the entered area
      const piecesNeeded = Math.ceil(parsedM2 / tileAreaM2);
      // Calculate exact area that will be covered by those pieces
      const exactAreaM2 = piecesNeeded * tileAreaM2;
      // Update m² input with the exact coverage
      setM2Value(exactAreaM2.toFixed(3));
    }
  };

  // Reset values when variation changes
  useEffect(() => {
    setPieceValue("");
    setM2Value("");
  }, [selectedVariation]);

  return (
    <div className="py-6  relative flex flex-col">
      <h2 className="flex item-center text-2xl relative mb-4">
        <strong className="text-amber-800">2.</strong> Choose Quantity
        <p
          className={`absolute right-0 text-xs uppercase tracking-wide bg-[#808387] text-white w-max p-2 rounded-lg transition-opacity duration-400 ${
            showQtyError ? "opacity-100" : "opacity-0"
          }`}
        >
          quantity required
        </p>
      </h2>
      <div className="flex py-0 w-full mx-auto">
        <span className={`flex flex-col relative w-5/12 ${isFullSizeSample ? "w-full" : ""}`}>
          <label
            htmlFor="qty"
            className="text-gray-500 font-[var(--font-light)] tracking-wide uppercase absolute top-2 left-2 text-[12px]"
          >
            qty (piece)
          </label>
          <input
            value={pieceValue}
            onChange={handlePieceChange}
            onFocus={handlePieceFocus}
            type="number"
            min="1"
            step="1"
            className="border border-[#e5e5e5] px-2 pt-6 pb-3 text-xl outline-0 focus:border-[#111111] duration-300"
          />
        </span>

        {/* Conditionally render SVG and m² input */}
        {!isFullSizeSample && (
          <>
            <div className="flex items-center justify-center w-2/12">
              <svg
                width="26"
                height="17"
                viewBox="0 0 26 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6.825h22l-5.536-5.589M24 10.648H2l5.536 5.588"
                  stroke="#C62E35"
                ></path>
              </svg>
            </div>

            <span className="flex flex-col relative w-5/12">
              <label
                htmlFor="sqm"
                className="text-gray-500 font-[var(--font-light)] tracking-wide uppercase absolute top-2 left-2 text-[12px]"
              >
                qty (m<sup>2</sup>)
              </label>
              <input
                value={m2Value}
                onChange={handleM2Change}
                onFocus={handleM2Focus}
                onBlur={handleM2Blur}
                min="0"
                step="0.001"
                type="number"
                className="border border-[#e5e5e5] px-2 pt-6 pb-3 text-xl outline-0 focus:border-[#111111] duration-300"
              />
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Calculator;
