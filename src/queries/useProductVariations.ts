import { useQuery } from '@tanstack/react-query';
import { fetchSingleProductVariations } from '../lib/api/singleProductVariations.api';

export const useProductVariations = (productId: number, options?: { enabled?: boolean })  => {
  return useQuery({
    queryKey: ['productVariations', productId],
    queryFn: () => fetchSingleProductVariations(productId),
    enabled: options?.enabled !== false && !!productId, 
    /* enabled: !!productId, */ // Only fetch when productId is available
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};