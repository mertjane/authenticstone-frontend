import axios from "axios";
import { baseUrl } from "../constants/baseUrl";

export interface AttrItemType {
  id: number;
  name: string;
  slug: string;
  count: number;
  _links: {
    collection: {
      href: string;
    }[];
  };
}

export interface AttrTermResponse {
  data: AttrItemType[];
  meta: {
    attribute_id: number;
    current_page: number;
    per_page: number;
    total_pages: number;
    total_terms: number;
  };
}



/**
 * Fetch for a Single Attribute ID
 * @param attributeId 
 * @returns 
 */

export const fetchAttributeTerms = async (
  attributeId: number
): Promise<AttrTermResponse> => {
  const response = await axios.get(`${baseUrl}/attribute/${attributeId}/terms`, {
    params: {
      page: 1,
      per_page: 100,
    },
  });

  return response.data;
};

/**
 * Fetch All Attribute Terms at Once
 * @returns 
 */

export const fetchAllAttributeTerms = async () => {
  const attributeIds = [6, 7, 2, 8];

  const results = await Promise.all(
    attributeIds.map((id) => fetchAttributeTerms(id))
  );

  // Optional: Map by attribute ID or any custom logic
  const formatted = {
    material: results.find((r) => r.meta.attribute_id === 6)?.data || [],
    usage: results.find((r) => r.meta.attribute_id === 7)?.data || [],
    finish: results.find((r) => r.meta.attribute_id === 2)?.data || [],
    colour: results.find((r) => r.meta.attribute_id === 8)?.data || [],
  };

  return formatted;
};