import { useQuery } from "@tanstack/react-query";
import { fetchAllAttributeTerms } from "../lib/api/attributeItems.api";


export const useAllAttributeTerms = () => {
  return useQuery({
    queryKey: ["all-attribute-terms"],
    queryFn: fetchAllAttributeTerms,
    staleTime: 1000 * 60 * 10, // 10 mins
  });
};
