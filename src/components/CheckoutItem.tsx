import { useCart } from "../hooks/useCart";


const CheckoutItem = () => {
  const { cartItems } = useCart();
  return (
    <>
      {cartItems?.map((item) => {
        const sizeMeta = item.meta_data.find(
          (meta) => meta.key === "pa_sizemm"
        );
        const isSample = item.is_sample || item.meta_data.some(
          (meta) => meta.key === "_is_sample" && 
                  (meta.value === "1" || meta.value === 1 || meta.value === true)
        );

        // For free samples, use display_value, otherwise use the size value
        const displaySize = isSample 
          ? sizeMeta?.display_value || "Free Sample"
          : sizeMeta?.value || "";

        // Calculate price per piece
        const pricePerPiece = item.is_sample
          ? item.price.toFixed(2)
          : (item.m2_quantity 
              ? (item.price * item.m2_quantity / item.quantity).toFixed(2)
              : item.price.toFixed(2));


        return (
          <div className="flex md:gap-4 gap-1.5" key={item.id}>
            <div className="image-section md:h-25 md:w-25 h-20 w-20">
              <img
                src={item.image?.src}
                alt={item.name}
                className="object-cover"
              />
            </div>
            <div className="desc md:max-w-2/4 max-w-3/4">
              <p className="md:font-[var(--font-regular)] font-[var(--font-light)] md:text-lg text-sm leading-tight">
                {item.parent_name}
              </p>
              <small className="font-[var(--font-light)] text-xs text-gray-500 tracking-wide">
                Size: {displaySize} | Price Per Piece: £{pricePerPiece}
              </small>
              <p className="font-[var(--font-regular)] md:text-lg text-sm leading-tight relative md:top-1.5 top-0.5">
                Qty: {item.quantity}
              </p>
            </div>

            <div className="price flex-1 flex flex-col items-end justify-center">
              <p className="font-[var(--font-regular)] md:text-lg text-sm leading-tight">
                £{item.total}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CheckoutItem;
