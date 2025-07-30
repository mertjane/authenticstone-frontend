import axios from 'axios';
import { baseUrl } from '../constants/baseUrl';

export interface ProductVariation {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  attributes: Array<{
    id: number;
    name: string;
    option: string;
  }>;
  instock: boolean;
  // Add other variation properties as needed
  
}



export const fetchSingleProductVariations = async (productId: number): Promise<ProductVariation[]> => {
  try {
    const response = await axios.get(`${baseUrl}/product/${productId}/variations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product variations:', error);
    throw error;
  }
};