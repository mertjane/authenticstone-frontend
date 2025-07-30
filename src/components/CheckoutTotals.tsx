import { useCart } from "../hooks/useCart";

interface Props {
  selectedOption: { label: string; note: string; price: string };
}


const CheckoutTotals = ({ selectedOption }: Props) => {
  const { getSubtotal } = useCart();

  // Get subtotal as number
  const subTotal = getSubtotal();
  // convert shipping to number (remove £ or handle Free)
  const shipping = selectedOption.price === "Free" ? 0 : parseFloat(selectedOption.price.replace("£", ""));

  // Calculate VAT
  const vatAmount = (subTotal * 0.2).toFixed(2);

  // Final total as number
  const finalTotal = shipping + subTotal;

  return (
    <div className="flex flex-col py-4">
      <div className="border border-[#e5e5e5] p-4 flex items-center justify-between">
        <p className="font-[var(--font-regular)] text-lg leading-tight">
          Subtotal
        </p>
        <p className="font-[var(--font-regular)] text-lg leading-tight">
          £{subTotal.toFixed(2)}
        </p>
      </div>
      <div className="border border-t-0 border-[#e5e5e5] p-4 flex items-center justify-between">
        <p className="font-[var(--font-regular)] text-lg leading-tight">
          Delivery charge
        </p>
        <p className="font-[var(--font-regular)] text-lg leading-tight">
          £{shipping.toFixed(2)}
        </p>
      </div>
      <div className="border border-t-0 border-[#e5e5e5] p-4 flex items-center justify-between">
        <p className="font-[var(--font-regular)] text-lg leading-tight">
          VAT amount
        </p>
        <p className="font-[var(--font-regular)] text-lg leading-tight">
          £{vatAmount}
        </p>
      </div>
      <div className="bg-[#222] p-4 flex items-center justify-between">
        <p className="text-white font-[var(--font-regular)] text-lg leading-tight">
          Total (Inc VAT)
        </p>
        <p className="text-white font-[var(--font-regular)] text-lg leading-tight">
          £{finalTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CheckoutTotals;
