import axios from 'axios';
import type { ApiResponse, Product } from '../../types/products.types';
import { baseUrl } from '../constants/baseUrl';


/**
 * Fetch all new arrivals from backend
 */
export interface FetchNewArrivalsParams {
  page?: number;
  per_page?: number;
}



export const fetchNewArrivals = async (
  params: FetchNewArrivalsParams = {}
): Promise<ApiResponse<Product[]>> => {
  const response = await axios.get<ApiResponse<Product[]>>(
    `${baseUrl}/products/new-arrivals`,
    { params }
  );
  return response.data;
};