export interface ClearanceProduct {
  id: number;
  name: string;
  slug: string;
  date: string;
  permalink: string;
  stock_status: "instock" | "outofstock" | "onbackorder" | string;
  material: string[];
  price_html: string;
  imageURL: string;
}