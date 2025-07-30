import axios from 'axios';
import type { ApiResponse, FetchAllProductsParams, Product } from '../../types/products.types';
import { baseUrl } from '../constants/baseUrl';



/**
 * Fetch all products from backend
 */
export const fetchAllProducts = async (
  params: FetchAllProductsParams = {}
): Promise<ApiResponse<Product[]>> => {
  const finalParams = {
    per_page: params.per_page ?? 9, // Ensure per_page defaults to 12
    page: params.page ?? 1,
    search: params.search,
    category: params.category,
    featured: params.featured,
    on_sale: params.on_sale,
    orderby: params.orderby ?? "date",
    order: params.order ?? "desc",
    status: params.status ?? "publish",
  };

  const response = await axios.get<ApiResponse<Product[]>>(`${baseUrl}/products`, {
    params: finalParams,
  });

  return response.data;
};