import axios from "axios";
import { baseUrl } from "../constants/baseUrl";



export const getPageBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`${baseUrl}/pages/${slug}`);
    return response.data; // Remove .data here since your API returns direct data
  } catch (error: any) {
    console.error('Error fetching WordPress page:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch page');
  }
};