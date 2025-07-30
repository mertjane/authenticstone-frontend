import { useAuth } from "../hooks/useAuth";

interface Props {
  closeDetails: () => void;
  openDelivery: () => void;
}

const CheckoutUserDetails = ({ closeDetails, openDelivery}: Props) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col mb-10 gap-2.5">
      <div className="border border-[#e5e5e5] p-3 relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOSA2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNC40OTk3IDUuNTAwMDZMMC45NjM4NjcgMS45NjQyMkwyLjE0MzAzIDAuNzg1ODg5TDQuNDk5NyAzLjE0MzM5TDYuODU2MzcgMC43ODU4ODlMOC4wMzU1MyAxLjk2NDIyTDQuNDk5NyA1LjUwMDA2WiIgZmlsbD0iIzgwODM4NyIvPgo8L3N2Zz4K')] bg-no-repeat bg-[length:15px_15px] bg-[position:calc(100%-15px)_center]">
        <span className="tracking-[.1em] text-[#707376] uppercase text-xs font-[var(--font-light)]">
          billing address
        </span>
        <div onClick={(e) => e.stopPropagation()}  className="text-lg pt-1 font-[var(--font-regular)] text-[#1d2328]">
          {user?.billing.address_1 +
            user?.billing.address_2 +
            ", " +
            user?.billing.city +
            ", " +
            user?.billing.postcode}
        </div>
      </div>

      <div onClick={(e) => e.stopPropagation()}  className="border border-[#e5e5e5] p-3 relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOSA2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNC40OTk3IDUuNTAwMDZMMC45NjM4NjcgMS45NjQyMkwyLjE0MzAzIDAuNzg1ODg5TDQuNDk5NyAzLjE0MzM5TDYuODU2MzcgMC43ODU4ODlMOC4wMzU1MyAxLjk2NDIyTDQuNDk5NyA1LjUwMDA2WiIgZmlsbD0iIzgwODM4NyIvPgo8L3N2Zz4K')] bg-no-repeat bg-[length:15px_15px] bg-[position:calc(100%-15px)_center]">
        <span className="tracking-[.1em] text-[#707376] uppercase text-xs font-[var(--font-light)]">
          delivery address
        </span>
        <div className="text-lg pt-1 font-[var(--font-regular)] text-[#1d2328]">
          {user?.shipping.address_1 +
            user?.shipping.address_2 +
            ", " +
            user?.shipping.city +
            ", " +
            user?.shipping.postcode}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent parent click
          closeDetails();
          openDelivery();
        }}
        className="hover:bg-[#111] duration-300 py-5 flex items-center justify-center text-md uppercase text-white bg-amber-800 font-[var(--font-regular)] tracking-wider"
      >
        proceed to delivery/collection details
      </button>
    </div>
  );
};

export default CheckoutUserDetails;
