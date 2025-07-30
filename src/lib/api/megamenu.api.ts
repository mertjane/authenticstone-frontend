import axios from "axios";
import type { MegaMenuItem } from "../../types/menuContent.types";
import { baseUrl } from "../constants/baseUrl";


export const fetchMegamenu = async (): Promise<MegaMenuItem[]> => {
  const { data } = await axios.get<{ data: MegaMenuItem[] }>(`${baseUrl}/megamenu`);
  return data.data;
};