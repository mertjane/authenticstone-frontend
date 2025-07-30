import { useEffect, useState } from "react";
import type { Product, ProductVariation } from "../types/products.types";
import Quickview from "./Quickview";
import { Link } from "react-router";
import { ROUTES } from "../routes/routePaths";
import { useProductVariations } from "../queries/useProductVariations";
import { useCart } from "../hooks/useCart";
import { useCartState } from "../hooks/useCartState";

type CatProductProps = {
  products: Product[];
};

const CatProduct = ({ products }: CatProductProps) => {
  const [openQuickview, setOpenQuickview] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [variationProductId, setVariationProductId] = useState<number | null>(
    null
  );
  const [sampleProduct, setSampleProduct] = useState<Product | null>(null);
  const [addingSampleFor, setAddingSampleFor] = useState<number | null>(null);
  const [sampleAvailabilityMap, setSampleAvailabilityMap] = useState<
    Record<number, boolean>
  >({});

  const { addToCart } = useCart();
  const { openCart } = useCartState();

  const { data: variations = [], isLoading: variationsLoading } =
    useProductVariations(variationProductId as number, {
      enabled: !!variationProductId,
    });

  const handleQuickview = (product: Product) => {
    setSelectedProduct(product);
    setOpenQuickview(true);
  };

  const closeQuickview = () => {
    setOpenQuickview(false);
    setSelectedProduct(null);
  };

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (openQuickview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openQuickview]);


  const handleAddSample = (product: Product) => {
    // Don't allow clicking if already determined no sample is available
    const hasSample = sampleAvailabilityMap[product.id];
    if (hasSample === false) {
      return;
    }

    // trigger variation fetch
    setVariationProductId(product.id);
    setSampleProduct(product);
    setAddingSampleFor(product.id);
    console.log(product);
  };

  useEffect(() => {
    if (!variationProductId || !sampleProduct) return;

    // Wait for variations to load - don't mark as unavailable immediately
    if (variationsLoading) return;

    // Only after variations have loaded, check if no variations exist
    if (variations.length === 0) {
      setSampleAvailabilityMap((prev) => ({
        ...prev,
        [sampleProduct.id]: false,
      }));
      setAddingSampleFor(null);
      setSampleProduct(null);
      setVariationProductId(null);
      return;
    }

    const variation = variations.find((v) =>
      v.attributes?.some((attr) =>
        attr.option?.toLowerCase().includes("free sample")
      )
    ) as ProductVariation | undefined;

    console.log("Found variation:", variation);

    // Check if sample variation exists AND is in stock
    const hasSample = !!variation && variation.instock;

    setSampleAvailabilityMap((prev) => ({
      ...prev,
      [sampleProduct.id]: hasSample,
    }));

    if (!hasSample) {
      setAddingSampleFor(null);
      setSampleProduct(null);
      setVariationProductId(null);
      return;
    }

    const cartItem = {
      product_id: variation.parent_id || sampleProduct.id,
      variation_id: variation.id,
      is_sample: true,
      quantity: 1,
      m2_quantity: undefined,
    };

    addToCart.mutate(cartItem, {
      onSuccess: (data) => {
        console.log("Sample added to cart:", data);
        openCart();
        setAddingSampleFor(null);
      },
      onError: (error: any) => {
        console.error(
          "Error adding sample to cart:",
          error.response?.data || error.message
        );
        setAddingSampleFor(null);
      },
    });

    // Reset to prevent re-triggering
    setSampleProduct(null);
    setVariationProductId(null);
  }, [variationProductId, variations, sampleProduct, variationsLoading]); // Add variationsLoading to dependencies

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 relative">
        {products.map((product) => {
          const isLoading = addingSampleFor === product.id;
          const hasSample = sampleAvailabilityMap[product.id];
          /* const canAddSample = hasSample !== false; */
          const canAddSample =
            hasSample !== false && // Only disable if explicitly marked as false
            !isLoading; // Don't check main product stock status
          return (
            <div className="bg-white overflow-hidden" key={product.id}>
              <div className="aspect-square bg-gray-200 relative group">
                <Link
                  to={ROUTES.SPP.replace(":itemName", product.slug)}
                  state={{ product }}
                  className="block w-full h-full z-1 relative"
                >
                  <picture className="w-full h-full">
                    <source
                      type="image/webp"
                      srcSet={product.images?.[0]?.src}
                    />
                    <img
                      className="w-full h-full object-cover"
                      src={product.images?.[0]?.src}
                      alt={product.name}
                      width="800"
                      height="800"
                      decoding="async"
                    />
                  </picture>
                </Link>
              </div>
              <div className="py-0 px-0">
                <div className="flex justify-between">
                  <button
                    onClick={() => handleQuickview(product)}
                    className="flex-1 font-[var(--font-light)] border border-black text-black py-2 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-200"
                  >
                    Quick View
                  </button>
                  <div className="relative flex flex-1 group">
                    <button
                      disabled={isLoading || !canAddSample}
                      onClick={() => handleAddSample(product)}
                      className="w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black flex items-center justify-center gap-2 font-[var(--font-light)] border border-black text-black px-4 py-2 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-200"
                    >
                      {isLoading ? "Adding..." : "Add Sample"}
                      {isLoading && (
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
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
                      )}
                    </button>
                    {/* Tooltip on hover when disabled due to no sample */}
                    {!isLoading && !canAddSample && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-black text-white text-xs px-3 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap ">
                        Sample is not available
                      </div>
                    )}
                  </div>
                </div>
                <strong className="font-[var(--font-regular)] text-[#1d2328] mt-4 mb-2 line-clamp-2 text-xl text-start">
                  {product.name}
                </strong>
                <div className="mb-3 text-start">
                  <div className="text-md text-amber-800 uppercase tracking-wide font-[var(--font-regular)]">
                    From <span>£{product.price_html}</span>/M<sup>2</sup>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedProduct && (
        <Quickview
          isOpen={openQuickview}
          onClose={closeQuickview}
          productId={selectedProduct.id}
          productName={selectedProduct.name}
          priceHtml={selectedProduct.price_html}
          images={selectedProduct.images}
        />
      )}
    </>
  );
};

export default CatProduct;
