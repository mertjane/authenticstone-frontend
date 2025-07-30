import { useState } from "react";
import CheckoutItem from "../components/CheckoutItem";
import CheckoutTotals from "../components/CheckoutTotals";
import CheckoutUserDetails from "../components/CheckoutUserDetails";
import CheckoutDelivery from "../components/CheckoutDelivery";
import CheckoutPaymentToggle from "../components/CheckoutPaymentToggle";
import useIsMobile from "../hooks/useIsMobile";
import { useCartState } from "../hooks/useCartState";

const options = [
  {
    label: "Economy Delivery",
    note: "(2 - 3 Days)",
    price: "£78.00",
  },
  {
    label: "Next Day Delivery",
    note: "(Orders Before 12:00 noon)",
    price: "£90.00",
  },
  {
    label: "Collection",
    note: "",
    price: "Free",
  },
];

const Checkout = () => {
  const isMobile = useIsMobile();
  const { openCart } = useCartState();
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState<boolean>(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleToggle = (section: "details" | "delivery" | "payment") => {
    setIsDetailsOpen(section === "details" ? !isDetailsOpen : false);
    setIsDeliveryOpen(section === "delivery" ? !isDeliveryOpen : false);
    setIsPaymentOpen(section === "payment" ? !isPaymentOpen : false);
  };

  return (
    <div className="min-h-screen md:py-20 py-10 md:px-10 px-2">
      <span className="mx-auto">
        <h1 className="capitalize text-amber-800 tracking-tight md:text-7xl text-5xl text-center pb-10">
          checkout
        </h1>
        <div className="flex md:flex-row flex-col min-h-screen gap-0 ">
          <div className="md:order-1 order-2 flex-2 h-full md:p-8 p-0">
            {/* Billing Details */}
            <div className="flex-1 flex flex-col md:gap-8 gap-5 py-8">
              <div
                className="cursor-pointer h-auto"
                onClick={() => handleToggle("details")}
              >
                <h1 className="md:text-3xl text-2xl pb-5">
                  <strong className="font-medium text-amber-800">1.</strong>{" "}
                  Your Details
                </h1>
                {/* Animated content */}
                <div
                  className={`transition-[max-height] duration-500 ease-in-out overflow-hidden border-b border-[#e5e5e5]`}
                  style={{
                    maxHeight: isDetailsOpen ? "500px" : "0px", // adjust max height
                  }}
                >
                  <CheckoutUserDetails
                    closeDetails={() => setIsDetailsOpen(false)}
                    openDelivery={() => setIsDeliveryOpen(true)}
                  />
                </div>
              </div>
              {/* Delivery Options */}
              <div
                className="cursor-pointer h-auto"
                onClick={() => handleToggle("delivery")}
              >
                <h1 className="md:text-3xl text-2xl pb-5">
                  <strong className="font-medium text-amber-800">2.</strong>{" "}
                  Delivery/Collection
                </h1>
                {/* Animated content */}
                <div
                  className={`transition-[max-height] duration-500 ease-in-out overflow-hidden border-b border-[#e5e5e5]`}
                  style={{
                    maxHeight: isDeliveryOpen ? "500px" : "0px", // adjust max height
                  }}
                >
                  <CheckoutDelivery
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    closeDelivery={() => setIsDeliveryOpen(false)}
                    openPayment={() => setIsPaymentOpen(true)}
                    options={options}
                  />
                </div>
              </div>
              <div
                className="cursor-pointer h-auto"
                onClick={() => handleToggle("payment")}
              >
                <h1 className="md:text-3xl text-2xl pb-5">
                  <strong className="font-medium text-amber-800">3.</strong>{" "}
                  Payment
                </h1>
                {/* Animated content */}
                <div
                  className={`transition-[max-height] duration-500 ease-in-out overflow-hidden border-b border-[#e5e5e5]`}
                  style={{
                    maxHeight: isPaymentOpen ? "500px" : "0px", // adjust max height
                  }}
                >
                  <CheckoutPaymentToggle />
                </div>
              </div>
            </div>
            {isMobile && (
              <div className="footer md:px-10 px-0 pt-10 pb-5 gap-8">
                <h1 className="text-3xl">Totals</h1>
                <CheckoutTotals selectedOption={selectedOption} />
              </div>
            )}
          </div>
          <div className="flex-3 md:order-2 order-1 h-full">
            <div className="header md:px-10 px-0 pt-10 pb-5 flex items-center gap-8">
              <h1 className="text-3xl">Your order</h1>
              <button onClick={() => openCart()} className="flex items-center justify-center rounded-2xl border px-3.5 relative top-0.5 hover:bg-amber-800 hover:text-white hover:border-amber-800 duration-300 py-1.5 uppercase text-xs font-[var(--font-light)] text-[#1d2328] tracking-wide">
                edit basket
              </button>
            </div>
            <div className="body flex flex-col border border-[#e5e5e5] md:mx-10 mx-0 md:px-6 md:py-6 py-2 px-2 gap-8">
              {/* product1 */}
              <CheckoutItem />
            </div>

            {/* Totals */}
            {!isMobile && (
              <div className="footer md:px-10 px-0 pt-10 pb-5 gap-8">
                <h1 className="text-3xl">Totals</h1>
                <CheckoutTotals selectedOption={selectedOption} />
              </div>
            )}
          </div>
        </div>
      </span>
    </div>
  );
};

export default Checkout;
