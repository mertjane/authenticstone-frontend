import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';
/* import { getPageBySlug } from '../lib/api/wordpress.api'; */

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
}

export interface BlogPosts {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: [
      {
        source_url: string;
      }
    ];
  };
}

export const usePages = (slug: string) =>
  useQuery({
    queryKey: ["page", slug],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://karakedi.xyz/wp-json/wp/v2/pages?slug=${slug}&_embed`
      );
      return data[0]; // first match
    },
  });

export const usePaginatedBlogPosts = (page = 1, perPage = 12) =>
  useQuery({
    queryKey: ['blog-posts', page],
    queryFn: async () => {
      const res = await axios.get(
        `https://karakedi.xyz/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${perPage}`
      );
      return {
        posts: res.data,
        totalPages: parseInt(res.headers['x-wp-totalpages'] || '1', 10),
      };
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });