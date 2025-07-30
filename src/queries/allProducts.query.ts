import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse, FetchAllProductsParams, Product } from "../types/products.types";
import { fetchAllProducts } from "../lib/api/allProducts.api";

const DEFAULT_PER_PAGE = 12;

const allProductsQueryKey = (params: FetchAllProductsParams = {}) => [
  "all-products",
  { ...params, per_page: params.per_page ?? DEFAULT_PER_PAGE },
];

export const useAllProductsQuery = (params: FetchAllProductsParams = {}) => {
  const finalParams = {
    ...params,
    per_page: params.per_page ?? DEFAULT_PER_PAGE,
  };

  return useQuery<ApiResponse<Product[]>, Error>({
    queryKey: allProductsQueryKey(finalParams),
    queryFn: () => fetchAllProducts(finalParams),
    gcTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 60 * 1000,     // 1 minute
  });
};


/**
 * Infinite query for "Load More" pagination
 */
export const useInfiniteAllProductsQuery = (
  initialParams: Omit<FetchAllProductsParams, "page"> = {}
) => {
  const baseParams = {
    ...initialParams,
    per_page: initialParams.per_page ?? DEFAULT_PER_PAGE,
  };

  return useInfiniteQuery<ApiResponse<Product[]>, Error>({
    queryKey: ["all-products-infinite", baseParams],
    queryFn: ({ pageParam = 1 }) =>
      fetchAllProducts({ ...baseParams, page: Number(pageParam) }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { current_page, total_pages } = lastPage.meta;
      return current_page < total_pages ? current_page + 1 : undefined;
    },
  });
};

/**
 * Prefetch function for SSR or page transitions
 */
export const prefetchAllProductsQuery = async (
  queryClient: ReturnType<typeof useQueryClient>,
  params: FetchAllProductsParams = {}
) => {
  const finalParams = {
    ...params,
    per_page: params.per_page ?? DEFAULT_PER_PAGE,
  };

  await queryClient.prefetchQuery({
    queryKey: allProductsQueryKey(finalParams),
    queryFn: () => fetchAllProducts(finalParams),
  });
};