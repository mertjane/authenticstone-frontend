import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useCart } from "../hooks/useCart";
import Loader from "./Loader";
import { useCartState } from "../hooks/useCartState";
import { useNavigate } from "react-router";
import { ROUTES } from "../routes/routePaths";
import { useAuth } from "../hooks/useAuth";
import useIsMobile from "../hooks/useIsMobile";

const Cart = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isCartOpen, closeCart } = useCartState();
  const { isAuthenticated } = useAuth();
  const { cartItems, isLoading, getItemTotal, getSubtotal, removeFromCart } =
    useCart();
  const [removingItem, setRemovingItem] = useState<number[]>([]);

  // Calculate total items count
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subTotal = getSubtotal().toFixed(2);
  const vatAmount = (parseFloat(subTotal) * 0.2).toFixed(2);
  const total = parseFloat(subTotal);

  const handleRemoveItem = async (itemId: number) => {
    setRemovingItem((prev) => [...prev, itemId]);
    try {
      await removeFromCart.mutateAsync(itemId);
    } finally {
      setRemovingItem((prev) => prev.filter((id) => id !== itemId));
    }
  };

  const navigateToCheckout = () => {
    isAuthenticated ? navigate(ROUTES.CHECKOUT) : navigate(ROUTES.AUTH);
    closeCart();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sliding Cart */}
      <div
        className={`fixed top-0 right-0 w-full md:w-[650px] h-screen py-10 md:pl-10 pl-4 md:pr-5 pr-2 bg-white z-[1001] transform transition-transform duration-300 flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="border-b border-[#e5e5e5] flex items-center justify-between flex-1/14 h-1/14">
          <h2 className="text-[#1d2328] md:text-[2em] text-2xl font-medium mb-6">
            Your Basket {totalItems > 0 && `(${totalItems} items)`}
          </h2>
          <IoCloseOutline
            size={40}
            className="hover:text-amber-800 duration-300 cursor-pointer mb-4"
            onClick={closeCart}
          />
        </div>
        <div className="py-10 pr-5 flex-10/12 h-10/12 overflow-y-auto">
          {isLoading ? (
            <Loader />
          ) : cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const isRemoving = removingItem.includes(item.id);
                const isSample =
                  item.is_sample ||
                  item.meta_data?.some(
                    (m) =>
                      m.key === "free-sample" ||
                      m.value === "free-sample" ||
                      m.key === "full-size-sample" ||
                      m.value === "full-size-sample" ||
                      m.key.includes("full-size-sample-") ||
                      m.value.includes("full-size-sample-")
                  );

                const itemTotal = getItemTotal(item).toFixed(2);

                const calculatePricePerPiece = (item: any) => {
                  const sizeData = item.meta_data?.find(
                    (m: any) => m.key === "pa_sizemm"
                  )?.value;
                  if (!sizeData) return item.price;

                  // Extract dimensions (e.g., "305x305x10" -> [305, 305, 10])
                  const dimensions = sizeData.split("x").map(Number);
                  if (dimensions.length < 2) return item.price;

                  // Calculate area of one piece in square meters
                  const lengthM = dimensions[0] / 1000; // Convert mm to meters
                  const widthM = dimensions[1] / 1000; // Convert mm to meters
                  const pieceAreaM2 = lengthM * widthM;

                  // Price per piece = price per m² × area of one piece
                  return (item.price * pieceAreaM2).toFixed(2);
                };
                return (
                  <div
                    key={item.id}
                    /* key={`${item.product_id}-${item.variation_id || 0}`} */
                    className={`flex items-start transition-opacity duration-300 ${
                      isRemoving ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    <div className="h-full ">
                      <img
                        className="md:h-[147px] md:w-[114px] h-[120px] w-[145px]"
                        src={item.image.src}
                        alt={item.name}
                      />
                    </div>
                    <div className="md:w-3/5 w-full md:px-4 px-2">
                      <p className="md:text-md text-sm text-[##1d2328] md:font-[var(--font-regular)] font-[var(--font-light)]">
                        {item.name}
                      </p>
                      {item.variation_id && (
                        <>
                          {/* <p className="text-xs text-gray-500 font-[var(--font-light)] mt-1">
                            Size:{" "}
                            {item.meta_data?.find(
                              (m: any) =>
                                m.key === "free-sample" ||
                                m.value === "free-sample"
                            )
                              ? "Free Sample"
                              : item.meta_data?.find(
                                  (m: any) =>
                                    m.key === "full-size-sample" ||
                                    m.value === "full-size-sample" ||
                                    m.key.includes("full-size-sample-") ||
                                    m.value.includes("full-size-sample-")
                                )
                              ? "Full Size Sample"
                              : item.meta_data?.find(
                                  (m: any) => m.key === "pa_sizemm"
                                )?.value ||
                                item.meta_data?.find(
                                  (m: any) => m.key === "Size"
                                )?.value ||
                                "Variation"}{" "}
                            | Price Per Piece: £{item.price}
                          </p> */}
                          <p className="text-xs text-gray-500 font-[var(--font-light)] mt-1">
                            Size:{" "}
                            {item.meta_data?.find(
                              (m: any) =>
                                m.key === "free-sample" ||
                                m.value === "free-sample"
                            )
                              ? "Free Sample"
                              : item.meta_data?.find(
                                  (m: any) =>
                                    m.key === "full-size-sample" ||
                                    m.value === "full-size-sample" ||
                                    m.key.includes("full-size-sample-") ||
                                    m.value.includes("full-size-sample-")
                                )
                              ? "Full Size Sample"
                              : item.meta_data?.find(
                                  (m: any) => m.key === "pa_sizemm"
                                )?.value ||
                                item.meta_data?.find(
                                  (m: any) => m.key === "Size"
                                )?.value ||
                                "Variation"}{" "}
                            | Price Per Piece: £
                            {isSample
                              ? item.price
                              : calculatePricePerPiece(item)}
                          </p>
                          <div className="h-full my-2 flex md:gap-5 gap-3">
                            <span className="flex flex-col">
                              <label
                                htmlFor="qty"
                                className="text-xs text-[#1d2328] font-[var(--font-light)] ml-1 py-1.5"
                              >
                                Quantity (Pieces)
                              </label>
                              <span className="relative max-w-min">
                                <button className="cursor-pointer absolute left-4 md:top-5 top-4.5 flex items-center justify-center">
                                  <svg
                                    width="9"
                                    height="3"
                                    viewBox="0 0 9 3"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M.125.875h8.75v1.25H.125V.875z"
                                      fill="#000"
                                    ></path>
                                  </svg>
                                </button>
                                <input
                                  type="text"
                                  className="border border-[#e5e5e5] text-center py-2 md:w-[120px] w-[100px] outline-none md:text-md text-sm"
                                  value={item.quantity}
                                />
                                <button className="cursor-pointer absolute right-4 md:top-4 top-3.5 flex items-center justify-center">
                                  <svg
                                    width="11"
                                    height="11"
                                    viewBox="0 0 13 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M5.667 5.167v-5h1.667v5h5v1.666h-5v5H5.667v-5h-5V5.167h5z"
                                      fill="#000"
                                    ></path>
                                  </svg>
                                </button>
                              </span>
                            </span>

                            {/* Conditionally render SQM input only if NOT a sample */}
                            {!isSample && (
                              <span className="flex flex-col">
                                <label
                                  htmlFor="qty"
                                  className="text-xs text-[#1d2328] font-[var(--font-light)] ml-1 py-1.5"
                                >
                                  Quantity (M²)
                                </label>
                                <span className="relative max-w-min">
                                  <button className="cursor-pointer absolute left-4 md:top-5 top-4.5 flex items-center justify-center">
                                    <svg
                                      width="9"
                                      height="3"
                                      viewBox="0 0 9 3"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M.125.875h8.75v1.25H.125V.875z"
                                        fill="#000"
                                      ></path>
                                    </svg>
                                  </button>
                                  <input
                                    type="text"
                                    value={item.m2_quantity}
                                    className="border border-[#e5e5e5] text-center py-2 md:w-[120px] w-[100px] outline-none md:text-md text-sm"
                                  />
                                  <button className="cursor-pointer absolute right-4 md:top-4 top-3.5 flex items-center justify-center">
                                    <svg
                                      width="11"
                                      height="11"
                                      viewBox="0 0 13 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M5.667 5.167v-5h1.667v5h5v1.666h-5v5H5.667v-5h-5V5.167h5z"
                                        fill="#000"
                                      ></path>
                                    </svg>
                                  </button>
                                </span>
                              </span>
                            )}
                          </div>
                          {/* Item total */}
                          {isMobile && (
                            <p className="flex items-center justify-between h-max text-sm font-[var(--font-light)] pb-4 ">
                             <span>Line total:</span> <span className="absolute right-6">£{itemTotal}</span>
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex flex-col items-end justify-between md:w-[110px] w-[30px] md:h-[139px] h-max md:my-[9px] my-0">
                      <div
                        onClick={() => handleRemoveItem(item.id)}
                        className="cursor-pointer"
                      >
                        {isRemoving ? (
                          <svg
                            className="animate-spin h-5 w-5 text-[#808387]"
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
                        ) : (
                          <svg
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.166 5.5h4.167v1.667h-1.667V18a.833.833 0 01-.833.833H4.166A.833.833 0 013.333 18V7.167H1.666V5.5h4.167V3a.833.833 0 01.833-.833h6.667a.833.833 0 01.833.833v2.5zm.833 1.667H5v10h10v-10zm-7.5 2.5h1.667v5H7.499v-5zm3.334 0h1.666v5h-1.666v-5zM7.499 3.833V5.5h5V3.833h-5z"
                              fill="#808387"
                            />
                          </svg>
                        )}
                      </div>
                      {/* Item total */}
                      {!isMobile && (
                        <p className="h-max text-lg font-[var(--font-regular)]">
                          £{itemTotal}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[#393b3c] text-[17.7px] tracking-normal">
              There are no items currently in your basket.
            </p>
          )}
        </div>

        {cartItems.length > 0 ? (
          <div className="">
            <div className="flex justify-between mb-1.5">
              <span className="text-xs text-gray-500 font-[var(--font-light)] tracking-wide">
                Subtotal
              </span>
              <span className="text-xs text-gray-500 font-[var(--font-light)] tracking-wide">
                £{subTotal}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-xs text-gray-500 font-[var(--font-light)] tracking-wide">
                VAT amount
              </span>
              <span className="text-xs text-gray-500 font-[var(--font-light)] tracking-wide">
                £{vatAmount}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-xl text-[#1d2328]  font-[var(--font-regular)] tracking-wide">
                Total
              </span>
              <span className="text-xl font-[var(--font-regular)] tracking-wide">
                £{total}
              </span>
            </div>
            <div className="flex md:flex-row flex-col gap-3">
              <button
                onClick={closeCart}
                className="flex-1 border border-[#e5e5e5] py-4 px-12 uppercase tracking-wider font-light hover:bg-[#111111] duration-300 hover:text-[#ffffff]"
              >
                continue shopping
              </button>
              <button
                onClick={navigateToCheckout}
                className="flex-1 bg-[#aa4a44] text-white py-4 px-12 uppercase tracking-wider flex items-center justify-center font-light hover:bg-[#8a3a34] duration-300"
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="body flex-1/12 h-1/12">
            <button
              onClick={closeCart}
              className="border border-[#e5e5e5] py-4 px-12 uppercase tracking-wider font-light hover:bg-[#111111] duration-300 hover:text-[#ffffff]"
            >
              continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
