import { useQuery } from "@tanstack/react-query";
import type { ClearanceProduct } from "../types/clearence.types";
import { fetchClearanceProducts } from "../lib/api/clearence.api";

export const useClearanceQuery = (limit = 9) =>
  useQuery<ClearanceProduct[]>({
    queryKey: ["clearance", limit],
    queryFn: () => fetchClearanceProducts(limit),
  });