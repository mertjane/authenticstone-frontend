interface Option {
  label: string;
  note: string;
  price: string;
}

interface Props {
  closeDelivery: () => void;
  openPayment: () => void;
  selectedOption: Option;
  setSelectedOption: (option: Option) => void;
  options: Option[];
}

const CheckoutDelivery = ({
  closeDelivery,
  openPayment,
  selectedOption,
  setSelectedOption,
  options,
}: Props) => {
  return (
    <div className="flex flex-col mb-10 gap-2.5">
      <div
        className="border border-[#e5e5e5] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="py-5 px-3 border-b border-[#e5e5e5] text-[#2d2e2f] text-xs uppercase tracking-widest font-[var(--font-light)]">
          Delivery Type
        </p>
        <ul
          className="py-5 px-3 flex flex-col gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((option) => (
            <li
              key={option.label}
              className={`selection-list flex items-center relative ${
                selectedOption.label === option.label ? "selected" : "" // ✅ Compare labels
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOption(option);
              }}
            >
              <span className="text-lg font-[var(--font-regular)]">
                {option.label}{" "}
                {option.note && (
                  <span className="text-[#707376] font-[var(--font-light)] text-sm">
                    {option.note}
                  </span>
                )}
              </span>
              <span className="text-lg font-[var(--font-regular)] absolute right-0">
                {option.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent parent click
          closeDelivery();
          openPayment();
        }}
        className="hover:bg-[#111] duration-300 py-5 flex items-center justify-center text-md uppercase text-white bg-amber-800 font-[var(--font-regular)] tracking-wider"
      >
        proceed to delivery/collection details
      </button>
    </div>
  );
};

export default CheckoutDelivery;
