import type { ProductVariation } from "../types/products.types";


interface DisplayProductInfoProps {
  name: string;
  price: string;
  selectedVariation?: ProductVariation | null;
}

const DisplayProductInfo = ({
  name,
  price,
  selectedVariation,
}: DisplayProductInfoProps) => {
  return (
    <>
      <h2 className="p-2 text-3xl text-center">{name}</h2>
      <div className="w-full mt-4 p-2 flex items-center justify-center">
        <span
          className="relative flex items-center text-xl 
                   before:content-[''] before:block before:w-[200px] before:h-px before:bg-[#e5e5e5] before:mr-0
                   after:content-[''] after:block after:w-[200px] after:h-px after:bg-[#e5e5e5] after:ml-0 overflow-hidden"
        >
          {price && (
            <div className="border border-[#e5e5e5] rounded-3xl min-w-max px-6 text-center text-amber-800 uppercase text-[17px] tracking-wide font-[var(--font-regular)] flex gap-2">
              <span className="border-r border-[#e5e5e5] py-2.5 pr-2">From{" "}</span>
              {selectedVariation ? (
                <span className="py-2.5">
                  £
                  {selectedVariation?.attributes?.[0]?.option.includes("Full Size Sample") ? (
  selectedVariation.price
) : (
  <>
    {selectedVariation.price} /M<sup>2</sup>
  </>
)}
                </span>
              ) : (
                <span className="text-[#1d2328] py-2.5">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: price
                        .replace('<span class="sales-unit"> / m²</span>', "")
                        .replace("&pound;", "£"),
                    }}
                  />{" "}
                  / M<sup>2</sup>
                </span>
              )}
            </div>
          )}
        </span>
      </div>
    </>
  );
};

export default DisplayProductInfo;
