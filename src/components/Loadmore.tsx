type LoadmoreProps = {
  onLoadMore: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  loadedProducts: number;
  totalProducts: number;
};

const Loadmore = ({ 
  onLoadMore, 
  hasNextPage, 
  isLoading, 
  loadedProducts, 
  totalProducts 
}: LoadmoreProps) => {
  const handleLoadMore = () => {
    if (hasNextPage && !isLoading) {
      onLoadMore();
    }
  };

  // Calculate current page and total pages (assuming 12 products per page)
  const productsPerPage = 12;
  const currentPage = Math.ceil(loadedProducts / productsPerPage);
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Don't show the button if there are no more pages
  if (!hasNextPage && loadedProducts > 0) {
    return (
      <div className="flex flex-col items-center gap-4 mt-12">
        <div className="text-sm text-gray-600 tracking-wider">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    );
  }

  // Don't show anything if no products are loaded yet
  if (loadedProducts === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      <button 
        onClick={handleLoadMore}
        disabled={!hasNextPage || isLoading} 
        className="bg-transparent border-2 border-[#1d2328] text-[#1d2328] px-8 py-3 text-sm uppercase tracking-wider hover:bg-[#1d2328] hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="flex items-center gap-2">
          {isLoading && (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
          {isLoading ? 'Loading...' : 'Load More'}
        </span>
      </button>

      <div className="text-sm text-gray-600 tracking-wider">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Loadmore;
