  import Loadmore from "../components/Loadmore";
  import Sort from "../components/Sort";
  import CatTotal from "../components/CatTotal";
  import Breadcrumb from "../components/Breadcrumb";
  import CatProduct from "../components/CatProduct";
  import Filter from "../components/Filter";
  import SelectedFilters from "../components/SelectedFilters";
  import { useEffect, useMemo } from "react";
  import { useLocation, useParams } from "react-router";
  import { queryClient } from "../lib/queryClient";
  import { ROUTE_TITLES } from "../constants/routeTitles";
  import { useDispatch, useSelector } from "react-redux";
  import type { RootState } from "../redux/store";
  import { CATEGORY_FILTER_MAPPINGS } from "../constants/FilterMappings";
  import {
    setAllSelectedFilters,
    setFilterSidebarOpen,
  } from "../redux/slices/FilterSlice";
  import { useCategoryQuery } from "../hooks/useCategoryQuery";
  import useIsMobile from "../hooks/useIsMobile";
  import MobileFilter from "../components/MobileFilter";
import Loader from "../components/Loader";

  const CategoryPage = () => {
    const isMobile = useIsMobile();
    const { itemSlug } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const dispatch = useDispatch();
    /* const isFilterSidebarOpen = useSelector(
      (state: RootState) => state.filters.isFilterSidebarOpen
    ); */
    const selectedFilters = useSelector(
      (state: RootState) => state.filters.selectedFilters
    );

    useEffect(() => {
      const categoryFilters = CATEGORY_FILTER_MAPPINGS[path];

      if (categoryFilters && categoryFilters.length > 0) {
        // Always set category filters when path changes
        dispatch(setAllSelectedFilters(categoryFilters));
      } else if (
        path.includes("/all-products") ||
        path.includes("/new-arrivals")
      ) {
        dispatch(setAllSelectedFilters([]));
      }
    }, [path, itemSlug, dispatch]); // Only depend on path and dispatch

    // Use the new hook - only calls the required query based on route
    const selectedQuery = useCategoryQuery();

    // Memoize products and meta data
    const { products, meta } = useMemo(() => {
      if (!selectedQuery?.data?.pages) {
        return { products: [], meta: null };
      }

      const flatProducts = selectedQuery.data.pages.flatMap(
        (page) => page.data || []
      );
      const metaData = selectedQuery.data.pages[0]?.meta;

      return { products: flatProducts, meta: metaData };
    }, [selectedQuery?.data]);

    // Cache fallback logic
    const getFallbackProducts = () => {
      if (products.length > 0 || !itemSlug) return products;

      const cacheKeys = [
        ["stoneCollection", "all"],
        ["stoneColours", "all"],
        ["stoneUsageAreas", "all"],
        ["stoneFinishes", "all"],
        ["all-products"],
        ["new-arrivals"],
      ];

      for (const cacheKey of cacheKeys) {
        const cachedData = queryClient.getQueryData(cacheKey);
        if (cachedData && typeof cachedData === "object") {
          const data = (cachedData as any)[itemSlug];
          if (data?.data) return data.data;
        }
      }

      return [];
    };

    const finalProducts = getFallbackProducts();
    const totalProducts = meta?.total_products || 0;

    // Get display title
    const getDisplayTitle = () => {
      if (path.includes("new-arrivals")) return "New Arrivals";
      if (path.includes("all-products")) return "All Products";
      if (path.includes("stock-clearance")) return "Stock Clearance";

      if (!itemSlug) return "Products";

      return (
        ROUTE_TITLES[itemSlug as keyof typeof ROUTE_TITLES] ||
        itemSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
      );
    };

    // Loading and error states
    const isLoading = selectedQuery?.isLoading || false;
    const isError = selectedQuery?.isError || !selectedQuery;
    const fetchNextPage = selectedQuery?.fetchNextPage || (() => {});
    const hasNextPage = selectedQuery?.hasNextPage || false;
    const isFetchingNextPage = selectedQuery?.isFetchingNextPage || false;

    if (isLoading) {
      return <div className="text-center min-h-screen py-10">
        <Loader />
      </div>;
    }

    if (isError || !finalProducts || !Array.isArray(finalProducts)) {
      return (
        <div className="text-center min-h-screen py-10">
          No products found for {getDisplayTitle()}
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#ffffff]">
        <Breadcrumb />

        <div className="bg-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mx-auto">
              <h1 className="text-6xl font-medium text-amber-800 mb-4">
                {getDisplayTitle()}
              </h1>
              <div className="description-content mx-auto text-md text-gray-600 max-w-2xl text-center" />
            </div>
          </div>
        </div>

        <div
          className={`bg-white sticky top-0 z-30 flex flex-col ${
            selectedFilters.length > 0 ? "border-b border-[#e5e5e5]" : ""
          }`}
        >
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-end md:justify-end items-center relative">
              {isMobile ? (
                <div
                  onClick={() => dispatch(setFilterSidebarOpen(true))}
                  title="Filters"
                  className="hover:text-amber-800 duration-300 cursor-pointer flex items-center absolute left-0 text-[#1d2328] uppercase font-[var(--font-regular)] text-xs tracking-wider"
                >
                  filters
                  <svg
                    className="ml-2"
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.722 5.778c-.94 0-1.725.668-1.905 1.555H.389a.389.389 0 100 .778h7.428a1.945 1.945 0 003.81 0h1.984a.389.389 0 100-.778h-1.983a1.945 1.945 0 00-1.906-1.555zm0 .778a1.167 1.167 0 110 2.333 1.167 1.167 0 010-2.333zM4.278.333c-.94 0-1.726.668-1.906 1.556H.39a.389.389 0 100 .778h1.983a1.945 1.945 0 003.811 0h7.428a.389.389 0 100-.778H6.183A1.945 1.945 0 004.278.333zm0 .778a1.167 1.167 0 110 2.333 1.167 1.167 0 010-2.333z"
                      fill="#808387"
                    ></path>
                  </svg>
                </div>
              ) : (
                <Filter />
              )}

              <CatTotal totalProducts={totalProducts} />
              <Sort />
            </div>
          </div>
          <div className="py-5 px-0 md:px-8 border-t border-[#e5e5e5]">
            <SelectedFilters />
          </div>
        </div>

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CatProduct products={finalProducts} />
          <Loadmore
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isLoading={isFetchingNextPage}
            loadedProducts={finalProducts.length}
            totalProducts={totalProducts}
          />
        </div>
        {isMobile && <MobileFilter />}
      </div>
    );
  };

  export default CategoryPage;
