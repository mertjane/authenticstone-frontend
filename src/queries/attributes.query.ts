import { useQuery } from "@tanstack/react-query";
import { fetchAttributes } from "../lib/api/attributes.api";

export const useAttributes = () => {
  return useQuery({
    queryKey: ["attributes"],
    queryFn: fetchAttributes,
  });
}; 