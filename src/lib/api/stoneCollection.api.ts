import axios from "axios";
import { STONE_CATEGORIES, type ApiResponse, type Product, type StoneCategorySlug } from "../../types/products.types";
import { baseUrl } from "../constants/baseUrl";



// Generic function to fetch products by category
export const fetchProductsByCategory = async (
  categorySlug: string,
  page = 1,
  per_page = 12
): Promise<ApiResponse<Product[]>> => {
  const queryParams = new URLSearchParams({
    category: categorySlug,
    page: page.toString(),
    per_page: per_page.toString(),
  });

  const response = await axios.get(
    `${baseUrl}/products/by-category?${queryParams}`
  );
  
  return response.data;
};

// Specific API functions for each stone category
export const stoneCollectionAPI = {
  // Marble Tiles
  fetchMarbleTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.MARBLE_TILES, page, per_page),

  // Limestone Tiles
  fetchLimestoneTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.LIMESTONE_TILES, page, per_page),

  // Stone Mosaic Tiles
  fetchStoneMosaicTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.STONE_MOSAIC_TILES, page, per_page),

  // Travertine Tiles
  fetchTravertineTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.TRAVERTINE_TILES, page, per_page),

  // Slate Tiles
  fetchSlateTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.SLATE_TILES, page, per_page),

  // Stone Pavers
  fetchStonePavers: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.STONE_PAVERS, page, per_page),

  // Granite Tiles
  fetchGraniteTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.GRANITE_TILES, page, per_page),

  // Clay Brick Slips
  fetchClayBrickSlips: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.CLAY_BRICK_SLIPS, page, per_page),

  // Bookmatch Slabs
  fetchBookmatchSlabs: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.BOOKMATCH_SLABS, page, per_page),

  // Slabs
  fetchSlabs: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.SLABS, page, per_page),

  // Vanity Top
  fetchVanityTop: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.VANITY_TOP, page, per_page),

  // Off Cut Granite
  fetchOffCutGranite: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.OFF_CUT_GRANITE, page, per_page),

  // Window Sills
  fetchWindowSills: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.WINDOW_SILLS, page, per_page),

  // Moulding Skirting
  fetchMouldingSkirting: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.MOULDING_SKIRTING, page, per_page),

  // Stone Sinks
  fetchStoneSinks: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.STONE_SINKS, page, per_page),

  // Slate Hearths
  fetchSlateHearth: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.SLATE_HEARTHS, page, per_page),

  // Table Tops
  fetchTableTops: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.TABLE_TOPS, page, per_page),

  // Chequerboard Tiles
  fetchChequerboardTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.CHEQUERBOARD_TILES, page, per_page),

  // Herringbone Tiles
  fetchHerringboneTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.HERRINGBONE_TILES, page, per_page),

  // Hexagon Tiles
  fetchHexagonTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.HEXAGON_TILES, page, per_page),

  // Metro Tiles
  fetchMetroTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.METRO_TILES, page, per_page),

  // Maxi Chequerboard Tiles
  fetchMaxiChequerboardTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.MAXI_CHEQUERBOARD_TILES, page, per_page),

  // Octagon Cabochon Tiles
  fetchOctagonCabochonTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.OCTAGON_CABOCHON_TILES, page, per_page),

  // Triangle Tiles
  fetchTriangleTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.TRIANGLE_TILES, page, per_page),

  // Clearence Tiles
  fetchClearenceTiles: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.CLEARENCE_TILES, page, per_page),

  // Clearence Tiles
  fetchSealingProducts: (page = 1, per_page = 12) =>
    fetchProductsByCategory(STONE_CATEGORIES.FIXING_SEALING, page, per_page),

  // Fetch multiple categories at once (for homepage background loading)
  fetchAllStoneCollections: async () => {
    const promises = Object.values(STONE_CATEGORIES).map(categorySlug =>
      fetchProductsByCategory(categorySlug)
    );


    const results = await Promise.allSettled(promises);
    
    return results.reduce((acc, result, index) => {
      const categorySlug = Object.values(STONE_CATEGORIES)[index];
      if (result.status === 'fulfilled') {
        acc[categorySlug] = result.value;
      } else {
        console.error(`Failed to fetch ${categorySlug}:`, result.reason);
        acc[categorySlug] = null;
      }
      return acc;
    }, {} as Record<StoneCategorySlug, ApiResponse<Product[]> | null>);
  },
};
