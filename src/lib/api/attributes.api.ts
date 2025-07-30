import axios from "axios";
import { baseUrl } from "../constants/baseUrl";

export interface AttributesType {
  id: number;
  name: string;
  slug: string;
  type: string;
  order_by: string;
  has_archives: boolean;
}

export const fetchAttributes = async (): Promise<AttributesType[]> => {
  const response = await axios.get<AttributesType[]>(`${baseUrl}/attributes`);
  return response.data;
};

