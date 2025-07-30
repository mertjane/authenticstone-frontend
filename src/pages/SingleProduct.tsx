import { useLocation, useParams } from "react-router";
import ActionButtons from "../components/ActionButtons";
import Breadcrumb from "../components/Breadcrumb";
import Calculator from "../components/Calculator";
import DisplaySizeOptions from "../components/DisplaySizeOptions";
import DisplayWeCanCut from "../components/DisplayWeCanCut";
import type { Product, ProductVariation } from "../types/products.types";
import { useState } from "react";
import { useProductVariations } from "../queries/useProductVariations";
import SizeList from "../components/SizeList";
import WeCanCutForm from "../components/WeCanCutForm";
import FixingSealingSpp from "../components/FixingSealingSpp";
import ProductSuggestion from "../components/ProductSuggestion";
import ImagePreview from "../components/ImagePreview";
import ShareIcons from "../components/ShareIcons";

const SingleProduct = () => {
  const { itemName } = useParams<{ itemName: string }>();
  const location = useLocation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openImageAlbum, setOpenImageAlbum] = useState<boolean>(false);
  const [openSizeList, setOpenSizeList] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);
  const [openCutForm, setOpenCutForm] = useState(false);
  const [showQtyError, setShowQtyError] = useState(false);
  const [fullSampleQty, setFullSampleQty] = useState<number | undefined>();
  const [m2Quantity, setM2Quantity] = useState<number | undefined>(); // Add this state
  const [regularProductQty, setRegularProductQty] = useState<
    number | undefined
  >();
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariation | null>(null);
  const product = location.state?.product as Product | undefined;
  const productId = product?.id || 0;
  const { data: variations = [] } = useProductVariations(productId);

  const handleOpenCutForm = () => setOpenCutForm(true);
  const handleCloseCutForm = () => setOpenCutForm(false);
  const handleOpenSizeList = () => setOpenSizeList(true);
  const handleCloseSizeList = () => setOpenSizeList(false);

  // Calculate hasFreeSample internally
  const hasFreeSample = variations.some((variation) => {
    const isSample = variation.attributes?.some(
      (attr) =>
        ["Sizemm", "pa_sizemm"].includes(attr?.name || "") &&
        attr?.option?.toLowerCase().includes("free sample")
    );
    return isSample && variation.instock;
  });

  const handleVariationSelect = (variation: ProductVariation) => {
    setSelectedVariation(variation);
    // Save to sessionStorage
    sessionStorage.setItem(
      `selectedVariation_${itemName}`,
      JSON.stringify(variation)
    );
    console.log("Selected variation:", variation);
  };


  // If no product data is passed, show error (or you could implement fallback fetching)
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Product not found</h2>
          <p className="text-gray-600 mt-2">
            Please navigate to this product from the product list.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen h-auto md:px-10 px-4 flex flex-col">
        <Breadcrumb />
        <div className="flex md:flex-row flex-col my-8 min-h-screen border-b border-[#e5e5e5] pb-10">
          <div className="md:flex-3 flex-1 flex md:flex-row flex-col">
            {/* product image gallery section */}
            <div className="w-1/8 md:flex hidden flex-col items-center justify-start gap-4">
              {product.images?.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={`w-[90px] h-[125px] border p-1 cursor-pointer transition-colors duration-200 ${
                    selectedImageIndex === index
                      ? "border-amber-800"
                      : "border-gray-300 hover:border-amber-600"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <picture className="w-full h-full">
                    <source type="image/webp" srcSet={image.src} />
                    <img
                      className="w-full h-full object-cover"
                      src={image.src}
                      alt={image.alt || `Product image ${index + 1}`}
                      width="90"
                      height="125"
                      decoding="async"
                    />
                  </picture>
                </div>
              ))}
            </div>

            {/* product main image section */}
            <div className="w-full md:mx-10 mx-0 cursor-zoom-in" onClick={() => setOpenImageAlbum(true)} >
              {product.images && product.images[selectedImageIndex] && (
                <picture className="w-full h-full">
                  <source
                    type="image/webp"
                    srcSet={product.images[selectedImageIndex].src}
                  />
                  <img
                    className="w-full h-full object-cover"
                    src={product.images[selectedImageIndex].src}
                    alt={product.images[selectedImageIndex].alt || product.name}
                    width="800"
                    height="800"
                    decoding="async"
                  />
                </picture>
              )}
            </div>
          </div>

          {/* product details section */}
          <div className="hide-scrollbar flex-2 flex flex-col relative h-screen overflow-y-scroll">
            {/* Product range */}
            <p
              title="View the Range"
              className="md:block hidden mx-auto cursor-pointer pb-2 hover:text-[#1d2328] duration-300 font-[var(--font-light)] text-[12px] text-amber-800 uppercase tracking-wider"
            >
              {product.categories?.[0]?.name || "Product Range"}
            </p>
            <div className="mx-14 md:flex hidden border-b border-[#e5e5e5] h-1/8  items-center justify-center gap-4 pb-6">
              {product.images?.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="w-[54px] h-[54px] border border-amber-800 rounded-lg p-1"
                >
                  <picture className="w-full h-full">
                    <source type="image/webp" srcSet={image.src} />
                    <img
                      className="w-full h-full object-cover rounded"
                      src={image.src}
                      alt={`Range ${index + 1}`}
                      width="54"
                      height="54"
                      decoding="async"
                    />
                  </picture>
                </div>
              ))}
            </div>

            {/* Product Title */}
            <div className="md:mx-14 mx-0 md:px-8 px-4 pt-8 pb-4 flex item-center justify-center">
              <h1 className="tracking-wide text-[#1d2328] md:text-5xl text-3xl mx-auto text-center">
                {product.name}
              </h1>
            </div>
            {/* Price Section */}
            <div className="md:mx-14 mx-0 flex items-center">
              <span className="border-t border-[#e5e5e5] flex-2"></span>
              <span className="flex-3 mx-auto w-max text-nowrap gap-4 uppercase md:px-6 px-4 border rounded-3xl border-[#e5e5e5] flex items-center md:text-md text-sm text-amber-800 tracking-wider font-[var(--font-regular)]">
                from
                <p className="text-[#1d2328] border-l py-2.5 border-l-[#e5e5e5] pl-4">
                  £{product.price_html} / M<sup>2</sup>
                </p>
              </span>
              <span className="border-t border-[#e5e5e5] flex-2"></span>
            </div>

            {/* Size Option Section */}
            <div className="relative md:mx-14 mx-0">
              <DisplaySizeOptions
                onOpenSizeList={handleOpenSizeList}
                variations={variations || []}
                selectedVariation={selectedVariation}
                showSizeError={showSizeError}
                setShowSizeError={setShowSizeError}
              />
            </div>
            {/* Calculator Section */}

            <div className="-mt-10 md:mx-14 mx-0">
              <Calculator
                selectedVariation={selectedVariation}
                setFullSampleQty={setFullSampleQty}
                setRegularProductQty={setRegularProductQty}
                showQtyError={showQtyError}
                setShowQtyError={setShowQtyError}
                onM2QuantityChange={setM2Quantity}
              />
            </div>

            {/* Action Buttons */}
            <div className="md:mx-14 mx-0 relative">
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
            </div>
            <div className=" py-4 text-center">
              <p className="text-gray-900 text-[19px] font-[var(--font-regular)] tracking-normal">
                Available for delivery in 3-5 working days
              </p>
              <p className="text-gray-600 text-md tracking-normal font-[var(--font-light)]">
                Delivery date and costs confirmed at checkout
              </p>
            </div>
            <div className="text-center -mt-10" onClick={handleOpenCutForm}>
              <DisplayWeCanCut isOpen={handleOpenCutForm} />
            </div>
            <ShareIcons />
          </div>
        </div>
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

      {/* FixingSealingSpp */}
      <FixingSealingSpp />
      <ProductSuggestion currentProduct={product} />
      {openImageAlbum && (
        <ImagePreview
          images={product.images}
          selectedIndex={selectedImageIndex}
          onClose={() => setOpenImageAlbum(false)}
          onIndexChange={setSelectedImageIndex}
        />
      )}
    </>
  );
};

export default SingleProduct;
