import axios from "axios";
import type { BlogPosts } from "../../types/post.types";
import { baseUrl } from "../constants/baseUrl";



export const fetchBlogPosts = async (
  limit = 5
): Promise<BlogPosts[]> => {
  const response = await axios.get(`${baseUrl}/posts?limit=${limit}`);
  return response.data.posts;
};