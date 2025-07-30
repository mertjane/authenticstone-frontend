import axios from "axios";
import { 
  STONE_COLOURS, STONE_FINISHES, STONE_USAGE_AREAS, 
  type ApiResponse, type Product, type StoneColourSlug, 
  type StoneUsageAreasSlug, type StoneFinishSlug 
} from "../../types/products.types";
import { baseUrl } from "../constants/baseUrl";



/**
 * Stone Colours
 * @param colourSlug 
 * @param page 
 * @param per_page 
 * @returns 
 */

// Generic function to fetch products by colour attribute
export const fetchProductsByColour = async (
  colourSlug: string,
  page = 1,
  per_page = 12
): Promise<ApiResponse<Product[]>> => {
  const queryParams = new URLSearchParams({
    stone_colour: colourSlug, // The server expects 'stone_colour' parameter
    page: page.toString(),
    per_page: per_page.toString(),
  });

  const response = await axios.get(
    `${baseUrl}/filtered-products?${queryParams}`
  );

  return response.data;
};


// Specific API functions for each stone colour
export const stoneColoursAPI = {
  fetchWhiteProducts: (page = 1, per_page = 12) =>
    fetchProductsByColour(STONE_COLOURS.WHITE, page, per_page),
  fetchBlackProducts: (page = 1, per_page = 12) =>
    fetchProductsByColour(STONE_COLOURS.BLACK, page, per_page),
  fetchGreyProducts: (page = 1, per_page = 12) =>
    fetchProductsByColour(STONE_COLOURS.GREY, page, per_page),
  fetchBeigeBrownProducts: (page = 1, per_page = 12) =>
    fetchProductsByColour(STONE_COLOURS.BEIGE_BROWN, page, per_page),
  fetchCreamYellowProducts: (page = 1, per_page = 12) =>
    fetchProductsByColour(STONE_COLOURS.CREAM_YELLOW, page, per_page),
  fetchBluesGreenProducts: (page = 1, per_page = 12) =>
    fetchProductsByColour(STONE_COLOURS.BLUES_GREEN, page, per_page),
  fetchRedPinkProducts: (page = 1, per_page = 12) =>
    fetchProductsByColour(STONE_COLOURS.RED_PINK, page, per_page),
  fetchMultiColourProducts: (page = 1, per_page = 12) =>
    fetchProductsByColour(STONE_COLOURS.MULTI_COLOUR, page, per_page),


  // Fetch multiple colours at once (for homepage background loading)
  fetchAllStoneColours: async () => {
    const promises = Object.values(STONE_COLOURS).map(colourSlug =>
      fetchProductsByColour(colourSlug)
    );

    const results = await Promise.allSettled(promises);

    return results.reduce((acc, result, index) => {
      const colourSlug = Object.values(STONE_COLOURS)[index];
      if (result.status === 'fulfilled') {
        acc[colourSlug] = result.value;
      } else {
        console.error(`Failed to fetch ${colourSlug}:`, result.reason);
        acc[colourSlug] = null;
      }
      return acc;
    }, {} as Record<StoneColourSlug, ApiResponse<Product[]> | null>);
  }
}


/**
 * Stone Usage Areas
 * @param usageAreaSlug 
 * @param page 
 * @param per_page 
 * @returns 
 */

// Generic function to fetch products by colour attribute
export const fetchProductsByUsageArea = async (
  usageAreaSlug: string,
  page = 1,
  per_page = 12
): Promise<ApiResponse<Product[]>> => {
  const queryParams = new URLSearchParams({
    usage_area: usageAreaSlug, // The server expects 'usage-area' parameter
    page: page.toString(),
    per_page: per_page.toString(),
  });

  const response = await axios.get(
    `${baseUrl}/filtered-products?${queryParams}`
  );

  return response.data;
};


// Specific API functions for each stone usage areas
export const stoneUsageAreasAPI = {
  fetchAttrBathroom: (page = 1, per_page = 12) =>
    fetchProductsByUsageArea(STONE_USAGE_AREAS.BATHROOM, page, per_page),
  fetchAttrBathFloor: (page = 1, per_page = 12) =>
    fetchProductsByUsageArea(STONE_USAGE_AREAS.BATHROOM_FLOOR, page, per_page),
  fetchAttrKitchen: (page = 1, per_page = 12) =>
    fetchProductsByUsageArea(STONE_USAGE_AREAS.KITCHEN, page, per_page),
  fetchAttrKitchenSplashback: (page = 1, per_page = 12) =>
    fetchProductsByUsageArea(STONE_USAGE_AREAS.KITCHEN_SPLASHBACK, page, per_page),
  fetchAttrLivingroom: (page = 1, per_page = 12) =>
    fetchProductsByUsageArea(STONE_USAGE_AREAS.LIVING_ROOM, page, per_page),
  fetchAttrLivingroomFloor: (page = 1, per_page = 12) =>
    fetchProductsByUsageArea(STONE_USAGE_AREAS.LIVING_ROOM_FLOOR, page, per_page),
  fetchAttrOutdoor: (page = 1, per_page = 12) =>
    fetchProductsByUsageArea(STONE_USAGE_AREAS.OUTDOOR, page, per_page),
  fetchAttrPool: (page = 1, per_page = 12) =>
    fetchProductsByUsageArea(STONE_USAGE_AREAS.POOL, page, per_page),
  fetchAttrWetroom: (page = 1, per_page = 12) =>
    fetchProductsByUsageArea(STONE_USAGE_AREAS.WET_ROOM, page, per_page),


  // Fetch multiple usage areas at once (for homepage background loading)
  fetchAllStoneUsageAreas: async () => {
    const promises = Object.values(STONE_USAGE_AREAS).map(usageAreaSlug =>
      fetchProductsByUsageArea(usageAreaSlug)
    );

    const results = await Promise.allSettled(promises);

    return results.reduce((acc, result, index) => {
      const usageSlug = Object.values(STONE_USAGE_AREAS)[index];
      if (result.status === 'fulfilled') {
        acc[usageSlug] = result.value;
      } else {
        console.error(`Failed to fetch ${usageSlug}:`, result.reason);
        acc[usageSlug] = null;
      }
      return acc;
    }, {} as Record<StoneUsageAreasSlug, ApiResponse<Product[]> | null>);
  }
}


/**
 * Stone Finishes
 * @param finishSlug 
 * @param page 
 * @param per_page 
 * @returns 
 */

// Generic function to fetch products by finish attribute
export const fetchProductsByFinish = async (
  finishSlug: string,
  page = 1,
  per_page = 12
): Promise<ApiResponse<Product[]>> => {
  const queryParams = new URLSearchParams({
    stone_finish: finishSlug, // The server expects 'finish' parameter
    page: page.toString(),
    per_page: per_page.toString(),
  });

  const response = await axios.get(
    `${baseUrl}/filtered-products?${queryParams}`
  );

  return response.data;
};

// Specific API functions for each stone usage areas
export const stoneFinishesAPI = {
  fetchFinishPolished: (page = 1, per_page = 12) =>
    fetchProductsByFinish(STONE_FINISHES.POLISHED, page, per_page),
  fetchFinishHoned: (page = 1, per_page = 12) =>
    fetchProductsByFinish(STONE_FINISHES.HONEST, page, per_page),
  fetchFinishBrushed: (page = 1, per_page = 12) =>
    fetchProductsByFinish(STONE_FINISHES.BRUSHED, page, per_page),
  fetchFinishSplit: (page = 1, per_page = 12) =>
    fetchProductsByFinish(STONE_FINISHES.SPLIT, page, per_page),
  fetchFinishTumbled: (page = 1, per_page = 12) =>
    fetchProductsByFinish(STONE_FINISHES.TUMBLED, page, per_page),

  // Fetch multiple usage areas at once (for homepage background loading)
  fetchAllFinishes: async () => {
    const promises = Object.values(STONE_FINISHES).map(stoneFinishSlug =>
      fetchProductsByFinish(stoneFinishSlug)
    );

    const results = await Promise.allSettled(promises);

    return results.reduce((acc, result, index) => {
      const slug = Object.values(STONE_FINISHES)[index];
      if (result.status === 'fulfilled') {
        acc[slug] = result.value;
      } else {
        console.error(`Failed to fetch ${slug}:`, result.reason);
        acc[slug] = null;
      }
      return acc;
    }, {} as Record<StoneFinishSlug, ApiResponse<Product[]> | null>);
  }
}