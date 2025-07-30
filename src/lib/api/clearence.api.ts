import axios from 'axios';
import type { ClearanceProduct } from '../../types/clearence.types';
import { baseUrl } from '../constants/baseUrl';



export const fetchClearanceProducts = async (limit = 9): Promise<ClearanceProduct[]> => {
  const response = await axios.get(`${baseUrl}/clearance`, {
    params: { limit },
  });

  return response.data.data;
};
