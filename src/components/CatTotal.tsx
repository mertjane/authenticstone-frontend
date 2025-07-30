import useIsMobile from "../hooks/useIsMobile";

type CatTotalProps = {
  totalProducts: number;
};


const CatTotal = ({ totalProducts }: CatTotalProps) => {
  const isMobile = useIsMobile();
  return (
    <div className="text-sm font-[var(--font-light)] text-gray-500 tracking-wider mr-3 md:mr-8">
      
      {isMobile ? (
        `${totalProducts} items`
      ) : (
        `${totalProducts} products`
      )}
    </div>
  );
};

export default CatTotal;
