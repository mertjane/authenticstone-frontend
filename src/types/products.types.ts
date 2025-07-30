export interface ProductVariation {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  parent_id?: number;
  attributes?: Array<{
    id: number;
    name: string;
    option: string;
  }>;
  instock: boolean;
}

export interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}


export interface Product {
  id: number;
  name: string;
  slug: string;
  type?: 'simple' | 'variable' | 'variation'; 
  permalink: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  price: string;
  regular_price: string;
  sale_price: string;
  price_html: string;
  stock_status: string;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  images: ProductImage[];
  attributes: any[];
  variations?: ProductVariation[]; 
  yoast_head_json: {
    og_image: any[];
  };
}



export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta: {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_products: number;
    has_next_page?: boolean;
    has_prev_page: boolean;
    category_id: number;
    category_slug: string;
  };
}

export interface FetchAllProductsParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string;
  status?: string;
  featured?: boolean;
  on_sale?: boolean;
  orderby?: string;
  order?: "asc" | "desc";
}



// Stone Collection Categories
export const STONE_CATEGORIES = {
  MARBLE_TILES: 'marble-tiles',
  LIMESTONE_TILES: 'limestone-tiles',
  STONE_MOSAIC_TILES: 'mosaic-tiles',
  TRAVERTINE_TILES: 'travertine-tiles',
  SLATE_TILES: 'slate-tiles',
  STONE_PAVERS: 'stone-pavers',
  GRANITE_TILES: 'granite-tiles',
  CLAY_BRICK_SLIPS: 'clay-brick-slips',
  BOOKMATCH_SLABS: 'bookmatch-slabs',
  SLABS: 'slabs',
  VANITY_TOP: 'vanity-tops',
  OFF_CUT_GRANITE: "off-cut-granite-quartz",
  WINDOW_SILLS: "window-sills",
  MOULDING_SKIRTING: "mouldings-skirtings",
  STONE_SINKS: "stone-sinks",
  SLATE_HEARTHS: "slate-hearths",
  TABLE_TOPS: "table-tops",
  CHEQUERBOARD_TILES: "chequerboard-tiles",
  HERRINGBONE_TILES: "herringbone-tiles",
  HEXAGON_TILES: "hexagon-tiles",
  METRO_TILES: "metro-tiles",
  MAXI_CHEQUERBOARD_TILES: "maxi-chequerboard-tiles",
  OCTAGON_CABOCHON_TILES: "octagon-cabochon-tiles",
  TRIANGLE_TILES: "triangle-tiles",
  CLEARENCE_TILES: 'stock-clearance',
  FIXING_SEALING: 'tiling-products',
} as const;

// Stone Colours
export const STONE_COLOURS = {
  WHITE: 'white',
  BLACK: 'black',
  GREY: 'grey',
  BEIGE_BROWN: 'beige-brown',
  CREAM_YELLOW: 'cream-yellow',
  BLUES_GREEN: 'blue-green',
  RED_PINK: 'red-pink',
  MULTI_COLOUR: 'multi-colour',
} as const;

// Stone Usage Areas
export const STONE_USAGE_AREAS = {
  KITCHEN: 'kitchen',
  KITCHEN_SPLASHBACK: 'kitchen-splashback',
  BATHROOM: 'bathroom',
  BATHROOM_FLOOR: 'bathroom-floor',
  LIVING_ROOM: 'living-room',
  LIVING_ROOM_FLOOR: 'living-room-floor',
  OUTDOOR: 'outdoor',
  POOL: 'pool',
  WET_ROOM: 'wet-room',
} as const;

// Stone Finishes
export const STONE_FINISHES = {
  POLISHED: 'polished-shiny-smooth',
  HONEST: 'honed-matt-smooth',
  BRUSHED: 'brushed-rough-finish',
  SPLIT: 'split-face',
  TUMBLED: 'tumbled-rough-edgy',
} as const;


export type StoneCategorySlug = typeof STONE_CATEGORIES[keyof typeof STONE_CATEGORIES];
export type StoneColourSlug = typeof STONE_COLOURS[keyof typeof STONE_COLOURS];
export type StoneUsageAreasSlug = typeof STONE_USAGE_AREAS[keyof typeof STONE_USAGE_AREAS];
export type StoneFinishSlug = typeof STONE_FINISHES[keyof typeof STONE_FINISHES];
