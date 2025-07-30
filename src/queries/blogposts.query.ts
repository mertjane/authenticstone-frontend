import { useQuery } from "@tanstack/react-query";
import { fetchBlogPosts } from "../lib/api/blogposts.api";

export const usePosts = (limit = 5) => {
  return useQuery({
    queryKey: ["posts", limit],
    queryFn: () => fetchBlogPosts(limit),
  });
};