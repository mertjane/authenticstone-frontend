import { useState } from "react";
import PaypalSVG from "./PaypalSVG";
import type { JSX } from "react/jsx-runtime";
import PaypalButton from "./PaypalButton";
import { ROUTES } from "../routes/routePaths";

interface PaymentOption {
  label: string;
  icon: JSX.Element;
}

const paymentOptions: PaymentOption[] = [
  {
    label: "Card Payment",
    icon: (
      <img
        src="/images/cards.png"
        alt="Card Payment"
        className="max-h-[40px]"
      />
    ),
  },
  {
    label: "PayPal",
    icon: <PaypalSVG />,
  },
];

const CheckoutPaymentToggle = () => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentOption>(
    paymentOptions[0]
  ); // Default to Card Payment

  return (
    <div className="flex flex-col mb-10 gap-2.5">
      <div
        className="border border-[#e5e5e5] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="py-5 px-3 border-b border-[#e5e5e5] text-[#2d2e2f] text-xs uppercase tracking-widest font-[var(--font-light)]">
          payment method
        </p>
        <ul
          className="py-5 px-3 flex flex-col gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {paymentOptions.map((option) => (
            <li
              key={option.label}
              className={`selection-list flex items-center relative ${
                selectedPayment.label === option.label ? "selected" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPayment(option); // ✅ update selected option
              }}
            >
              <span className="text-lg font-[var(--font-regular)]">
                {option.icon}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* Aggrements */}
      <div
        className="flex flex-col gap-5 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="flex items-center gap-5 font-[var(--font-light)] uppercase tracking-wider text-[#1d2328] text-xs">
          <input type="checkbox" className="terms-checkboxes" />
          <span>
            I have read and agree to the website{" "}
            <a
              href={ROUTES.TERMS_CONDITIONS}
              target="_blank"
              className="text-amber-800 underline"
            >
              terms and conditions
            </a>
            {" *"}
          </span>
        </p>
        <p className="flex items-center uppercase gap-5 font-[var(--font-light)] tracking-wider text-[#1d2328] text-xs">
          <input type="checkbox" className="terms-checkboxes" />
          <span>
            I understand and agree to the{" "}
            <a
              href={ROUTES.TERMS_CONDITIONS}
              target="_blank"
              className="text-amber-800 underline"
            >
              delivery and collection process.
            </a>
            {" *"}
          </span>
        </p>
        <p className="flex items-center uppercase gap-5 font-[var(--font-light)] tracking-wider text-[#1d2328] text-xs">
          <input type="checkbox" className="terms-checkboxes" />
          <span>Subscribe to our newsletter</span>
        </p>
      </div>
      {selectedPayment === paymentOptions[1] ? (
        <PaypalButton />
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent parent click
          }}
          className="hover:bg-[#111] duration-300 py-5 flex items-center justify-center text-md uppercase text-white bg-amber-800 font-[var(--font-regular)] tracking-wider"
        >
          place order
        </button>
      )}
    </div>
  );
};

export default CheckoutPaymentToggle;
