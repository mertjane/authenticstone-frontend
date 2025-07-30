import { IoCloseOutline } from "react-icons/io5";
import QuickViewImg from "./QuickViewImg";
import DisplaySizeOptions from "./DisplaySizeOptions";
import Calculator from "./Calculator";
import ActionButtons from "./ActionButtons";
import DisplayWeCanCut from "./DisplayWeCanCut";
import DisplayProductInfo from "./DisplayProductInfo";
import SizeList from "./SizeList";
import { useEffect, useState } from "react";

import WeCanCutForm from "./WeCanCutForm";
import { useProductVariations } from "../queries/useProductVariations";
import type { ProductImage, ProductVariation } from "../types/products.types";
import Loader from "./Loader";

interface QuickviewProps {
  onClose: () => void;
  isOpen: boolean;
  dimmed?: boolean;
  productId: number;
  productName: string;
  priceHtml: string;
  images: ProductImage[];
}

const Quickview = ({
  isOpen,
  onClose,
  productName,
  priceHtml,
  images,
  productId,
}: QuickviewProps) => {
  const {
    data: variations = [],
    isLoading,
  } = useProductVariations(productId);
  const [m2Quantity, setM2Quantity] = useState<number | undefined>(); // Add this state
  const [fullSampleQty, setFullSampleQty] = useState<number | undefined>();
  const [regularProductQty, setRegularProductQty] = useState<
    number | undefined
  >();
  const [showQtyError, setShowQtyError] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);
  const [openCutForm, setOpenCutForm] = useState(false);
  const [openSizeList, setOpenSizeList] = useState(false);
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariation | null>(null);

  const handleOpenCutForm = () => setOpenCutForm(true);
  const handleCloseCutForm = () => setOpenCutForm(false);
  const handleOpenSizeList = () => setOpenSizeList(true);
  const handleCloseSizeList = () => setOpenSizeList(false);

  // Load selected variation from sessionStorage on component mount
  useEffect(() => {
    const savedVariation = sessionStorage.getItem(
      `selectedVariation_${productName}`
    );
    if (savedVariation) {
      try {
        const parsedVariation = JSON.parse(savedVariation);
        setSelectedVariation(parsedVariation);
        console.log("Loaded selected variation from storage:", parsedVariation);
      } catch (error) {
        console.error("Error parsing saved variation:", error);
      }
    }
  }, [productName]);

  const handleVariationSelect = (variation: ProductVariation) => {
    setSelectedVariation(variation);
    // Save to sessionStorage
    sessionStorage.setItem(
      `selectedVariation_${productName}`,
      JSON.stringify(variation)
    );
    console.log("Selected variation:", variation);
  };

  // Calculate hasFreeSample internally
  const hasFreeSample = variations.some((variation) => {
    const isSample = variation.attributes?.some(
      (attr) =>
        ["Sizemm", "pa_sizemm"].includes(attr?.name || "") &&
        attr?.option?.toLowerCase().includes("free sample")
    );
    return isSample && variation.instock;
  });

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`quick-view-container fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sliding Quickview */}
      <div
        className={`fixed overflow-y-auto overflow-x-hidden top-0 right-0 w-full md:w-[620px] h-full p-10 bg-white z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="border-b border-[#e5e5e5] flex items-center justify-between flex-1/14 h-1/14">
              <h2 className="text-[#1d2328] text-[2em] font-medium mb-6">
                Quick View
              </h2>
              <IoCloseOutline
                size={40}
                className="hover:text-amber-800 duration-300 cursor-pointer mb-4"
                onClick={onClose}
              />
            </div>

            {/* BODY */}
            <div>
              <QuickViewImg images={images} />
              <div className="w-full py-2 my-2 flex flex-col">
                <DisplayProductInfo
                  name={productName}
                  price={priceHtml}
                  selectedVariation={selectedVariation}
                />
                {/* Size Selection Section */}
                <DisplaySizeOptions
                  onOpenSizeList={handleOpenSizeList}
                  variations={variations || []}
                  selectedVariation={selectedVariation}
                  showSizeError={showSizeError}
                  setShowSizeError={setShowSizeError}
                />
                {/* Quantity Selection Section */}
                <Calculator
                  selectedVariation={selectedVariation}
                  setFullSampleQty={setFullSampleQty}
                  setRegularProductQty={setRegularProductQty}
                  showQtyError={showQtyError}
                  setShowQtyError={setShowQtyError}
                  onM2QuantityChange={setM2Quantity} 
                />
                {/* Action Buttons Section */}
                <ActionButtons
                  selectedVariation={selectedVariation}
                  fullSampleQty={fullSampleQty}
                  showSizeError={showSizeError}
                  regularProductQty={regularProductQty}
                  setShowQtyError={setShowQtyError}
                  setShowSizeError={setShowSizeError}
                  hasFreeSample={hasFreeSample}
                  m2Quantity={m2Quantity} 
                  productId={productId}
                />
                {/* Delivery Info Section */}
                <div className="flex flex-col items-center mt-4">
                  <p className="text-gray-900 text-[19px] font-[var(--font-regular)] tracking-normal">
                    Available for delivery in 3-5 working days
                  </p>
                  <p className="text-gray-600 text-md tracking-normal font-[var(--font-light)]">
                    Delivery date and costs confirmed at checkout
                  </p>
                </div>
                {/* We Can Cut Any Size*/}
                <DisplayWeCanCut isOpen={handleOpenCutForm} />
              </div>
            </div>
          </>
        )}
      </div>
      <WeCanCutForm isOpen={openCutForm} onClose={handleCloseCutForm} />
      <SizeList
        hasFreeSample={hasFreeSample}
        isOpen={openSizeList}
        onClose={handleCloseSizeList}
        variations={variations || []}
        onSelectVariation={handleVariationSelect}
        selectedVariation={selectedVariation}
      />
    </>
  );
};

export default Quickview;
