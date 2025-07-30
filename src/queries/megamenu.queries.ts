import { useQuery } from "@tanstack/react-query";
import type { MegaMenuItem } from "../types/menuContent.types";
import { fetchMegamenu } from "../lib/api/megamenu.api";

export const useMegamenuQuery = () => {
  return useQuery<MegaMenuItem[]>({
    queryKey: ["megamenu"],
    queryFn: fetchMegamenu,
  });
};
