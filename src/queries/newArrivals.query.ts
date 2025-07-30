import type { ApiResponse, Product } from './../types/products.types';
import { fetchNewArrivals, type FetchNewArrivalsParams } from "../lib/api/newArrivals.api";
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

const DEFAULT_PER_PAGE = 12;

const newArrivalsQueryKey = (params: FetchNewArrivalsParams = {}) => [
  "new-arrivals",
  {...params, per_page: params.per_page ?? DEFAULT_PER_PAGE},
]

export const useNewArrivalsQuery = (params: FetchNewArrivalsParams = {}) => {
  const finalParams = {
    ...params, 
    per_page: params.per_page ?? DEFAULT_PER_PAGE,
  };

  return useQuery<ApiResponse<Product[]>, Error>({
    queryKey: newArrivalsQueryKey(finalParams),
    queryFn: () => fetchNewArrivals(finalParams),
    gcTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 60 * 1000,     // 1 minute
  });
};

export const useInfiniteNewArrivalQuery = (
  initialParams: Omit<FetchNewArrivalsParams, "page"> = {}
) => {
  const baseParams = {
    ...initialParams,
    per_page: initialParams.per_page ?? DEFAULT_PER_PAGE,
  };

  return useInfiniteQuery<ApiResponse<Product[]>, Error>({
    queryKey: ["new-arrival-infinite", baseParams],
    queryFn: ({ pageParam = 1 }) =>
      fetchNewArrivals({ ...baseParams, page: Number(pageParam) }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // ✅ Check before destructuring
      if (!lastPage || !lastPage.meta) {
        console.warn("⚠️ Missing meta in lastPage:", lastPage);
        return undefined;
      }

      const { current_page, total_pages } = lastPage.meta;
      return current_page < total_pages ? current_page + 1 : undefined;
    },
  });
};



/**
 * Prefetch function for SSR or page transitions
 */
export const prefetchNewArrivalsQuery = async (
  queryClient: ReturnType<typeof useQueryClient>,
  params: FetchNewArrivalsParams = {}
) => {
  const finalParams = {
    ...params,
    per_page: params.per_page ?? DEFAULT_PER_PAGE,
  };

  await queryClient.prefetchQuery({
    queryKey: newArrivalsQueryKey(finalParams),
    queryFn: () => fetchNewArrivals(finalParams),
  });
};