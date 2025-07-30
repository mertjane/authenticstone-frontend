import { useQuery, useQueries, useInfiniteQuery } from '@tanstack/react-query';
import { STONE_CATEGORIES, type StoneCategorySlug } from '../types/products.types';
import { stoneCollectionAPI } from '../lib/api/stoneCollection.api';

// Query keys for better cache management
export const STONE_QUERY_KEYS = {
  STONE_COLLECTION: 'stoneCollection',
  MARBLE_TILES: ['stoneCollection', 'marble-tiles'],
  LIMESTONE_TILES: ['stoneCollection', 'limestone-tiles'],
  STONE_MOSAIC_TILES: ['stoneCollection', 'stone-mosaic-tiles'],
  TRAVERTINE_TILES: ['stoneCollection', 'travertine-tiles'],
  SLATE_TILES: ['stoneCollection', 'slate-tiles'],
  STONE_PAVERS: ['stoneCollection', 'stone-pavers'],
  GRANITE_TILES: ['stoneCollection', 'granite-tiles'],
  CLAY_BRICK_SLIPS: ['stoneCollection', 'clay-brick-slips'],
  BOOKMATCH_SLABS: ['stoneCollection', 'bookmatch-slabs'],
  SLABS: ['stoneCollection', 'slabs'],
  VANITY_TOP: ['stoneCollection', 'vanity-tops'],
  OFF_CUT_GRANITE: ['stoneCollection', 'off-cut-granite-quartz'],
  WINDOW_SILLS: ['stoneCollection', 'window-sills'],
  MOULDING_SKIRTING: ['stoneCollection', 'mouldings-skirtings'],
  STONE_SINKS: ['stoneCollection', 'stone-sinks'],
  SLATE_HEARTHS: ['stoneCollection', 'slate-hearths'],
  TABLE_TOPS: ['stoneCollection', 'table-tops'],
  CHEQUERBOARD_TILES: ['stoneCollection', 'chequerboard-tiles'],
  HERRINGBONE_TILES: ['stoneCollection', 'herringbone-tiles'],
  HEXAGON_TILES: ['stoneCollection', 'hexagon-tiles'],
  METRO_TILES: ['stoneCollection', 'metro-tiles'],
  MAXI_CHEQUERBOARD_TILES: ['stoneCollection', 'maxi-chequerboard-tiles'],
  OCTAGON_CABOCHON_TILES: ['stoneCollection', 'octagon-cabochon-tiles'],
  TRIANGLE_TILES: ['stoneCollection', 'triangle-tiles'],
  CLEARENCE_TILES: ['stoneCollection', 'stock-clearance'],
  FIXING_SEALING: ['stoneCollection', 'tiling-products'],
  ALL_STONE_COLLECTIONS: ['stoneCollection', 'all'],
} as const;

// Mapping of categories to their API functions
const STONE_API_MAPPING = {
  [STONE_CATEGORIES.MARBLE_TILES]: stoneCollectionAPI.fetchMarbleTiles,
  [STONE_CATEGORIES.LIMESTONE_TILES]: stoneCollectionAPI.fetchLimestoneTiles,
  [STONE_CATEGORIES.STONE_MOSAIC_TILES]: stoneCollectionAPI.fetchStoneMosaicTiles,
  [STONE_CATEGORIES.TRAVERTINE_TILES]: stoneCollectionAPI.fetchTravertineTiles,
  [STONE_CATEGORIES.SLATE_TILES]: stoneCollectionAPI.fetchSlateTiles,
  [STONE_CATEGORIES.STONE_PAVERS]: stoneCollectionAPI.fetchStonePavers,
  [STONE_CATEGORIES.GRANITE_TILES]: stoneCollectionAPI.fetchGraniteTiles,
  [STONE_CATEGORIES.CLAY_BRICK_SLIPS]: stoneCollectionAPI.fetchClayBrickSlips,
  [STONE_CATEGORIES.BOOKMATCH_SLABS]: stoneCollectionAPI.fetchBookmatchSlabs,
  [STONE_CATEGORIES.SLABS]: stoneCollectionAPI.fetchSlabs,
  [STONE_CATEGORIES.VANITY_TOP]: stoneCollectionAPI.fetchVanityTop,
  [STONE_CATEGORIES.OFF_CUT_GRANITE]: stoneCollectionAPI.fetchOffCutGranite,
  [STONE_CATEGORIES.WINDOW_SILLS]: stoneCollectionAPI.fetchWindowSills,
  [STONE_CATEGORIES.MOULDING_SKIRTING]: stoneCollectionAPI.fetchMouldingSkirting,
  [STONE_CATEGORIES.STONE_SINKS]: stoneCollectionAPI.fetchStoneSinks,
  [STONE_CATEGORIES.SLATE_HEARTHS]: stoneCollectionAPI.fetchSlateHearth,
  [STONE_CATEGORIES.TABLE_TOPS]: stoneCollectionAPI.fetchTableTops,
  [STONE_CATEGORIES.CHEQUERBOARD_TILES]: stoneCollectionAPI.fetchChequerboardTiles,
  [STONE_CATEGORIES.HERRINGBONE_TILES]: stoneCollectionAPI.fetchHerringboneTiles,
  [STONE_CATEGORIES.HEXAGON_TILES]: stoneCollectionAPI.fetchHexagonTiles,
  [STONE_CATEGORIES.METRO_TILES]: stoneCollectionAPI.fetchMetroTiles,
  [STONE_CATEGORIES.MAXI_CHEQUERBOARD_TILES]: stoneCollectionAPI.fetchMaxiChequerboardTiles,
  [STONE_CATEGORIES.OCTAGON_CABOCHON_TILES]: stoneCollectionAPI.fetchOctagonCabochonTiles,
  [STONE_CATEGORIES.TRIANGLE_TILES]: stoneCollectionAPI.fetchTriangleTiles,
  [STONE_CATEGORIES.CLEARENCE_TILES]: stoneCollectionAPI.fetchClearenceTiles,
  [STONE_CATEGORIES.FIXING_SEALING]: stoneCollectionAPI.fetchSealingProducts,
} as const;

// Generic hook factory for regular queries
const createStoneCollectionHook = (category: StoneCategorySlug) => {
  return (page = 1, per_page = 12) => {
    const apiFunction = STONE_API_MAPPING[category];
    return useQuery({
      queryKey: ['stoneCollection', category, page, per_page],
      queryFn: () => apiFunction(page, per_page),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });
  };
};

// Generic hook factory for infinite queries
const createInfiniteStoneCollectionHook = (category: StoneCategorySlug) => {
  return () => {
    const apiFunction = STONE_API_MAPPING[category];
    return useInfiniteQuery({
      queryKey: ['stoneCollection', category, 'infinite'],
      queryFn: ({ pageParam = 1 }) => apiFunction(pageParam, 12),
      /* getNextPageParam: (lastPage) => {
        if (lastPage.meta.has_next_page) {
          return lastPage.meta.current_page + 1;
        }
        return undefined;
      }, */
      getNextPageParam: (lastPage) => {
        if (!lastPage || !lastPage.meta) {
          console.error("⚠️ Invalid API response:", lastPage);
          return undefined;
        }

        return lastPage.meta.has_next_page
          ? lastPage.meta.current_page + 1
          : undefined;
      },
      initialPageParam: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });
  };
};

// Individual category hooks (generated dynamically)
export const useMarbleTiles = createStoneCollectionHook(STONE_CATEGORIES.MARBLE_TILES);
export const useLimestoneTiles = createStoneCollectionHook(STONE_CATEGORIES.LIMESTONE_TILES);
export const useStoneMosaicTiles = createStoneCollectionHook(STONE_CATEGORIES.STONE_MOSAIC_TILES);
export const useTravertineTiles = createStoneCollectionHook(STONE_CATEGORIES.TRAVERTINE_TILES);
export const useSlateTiles = createStoneCollectionHook(STONE_CATEGORIES.SLATE_TILES);
export const useStonePavers = createStoneCollectionHook(STONE_CATEGORIES.STONE_PAVERS);
export const useGraniteTiles = createStoneCollectionHook(STONE_CATEGORIES.GRANITE_TILES);
export const useClayBrickSlips = createStoneCollectionHook(STONE_CATEGORIES.CLAY_BRICK_SLIPS);
export const useBookmatchSlabs = createStoneCollectionHook(STONE_CATEGORIES.BOOKMATCH_SLABS);
export const useSlabs = createStoneCollectionHook(STONE_CATEGORIES.SLABS);
export const useVanityTop = createStoneCollectionHook(STONE_CATEGORIES.VANITY_TOP);
export const useOffCutGranite = createStoneCollectionHook(STONE_CATEGORIES.OFF_CUT_GRANITE);
export const useWindowSills = createStoneCollectionHook(STONE_CATEGORIES.WINDOW_SILLS);
export const useMouldingSkirting = createStoneCollectionHook(STONE_CATEGORIES.MOULDING_SKIRTING);
export const useStoneSinks = createStoneCollectionHook(STONE_CATEGORIES.STONE_SINKS);
export const useSlateHearth = createStoneCollectionHook(STONE_CATEGORIES.SLATE_HEARTHS);
export const useTableTops = createStoneCollectionHook(STONE_CATEGORIES.TABLE_TOPS);
export const useChequerboardTiles = createStoneCollectionHook(STONE_CATEGORIES.CHEQUERBOARD_TILES);
export const useHerringboneTiles = createStoneCollectionHook(STONE_CATEGORIES.HERRINGBONE_TILES);
export const useHexagonTiles = createStoneCollectionHook(STONE_CATEGORIES.HEXAGON_TILES);
export const useMetroTiles = createStoneCollectionHook(STONE_CATEGORIES.METRO_TILES);
export const useMaxiChequerboardTiles = createStoneCollectionHook(STONE_CATEGORIES.MAXI_CHEQUERBOARD_TILES);
export const useOctagonCabochonTiles = createStoneCollectionHook(STONE_CATEGORIES.OCTAGON_CABOCHON_TILES);
export const useTriangleTiles = createStoneCollectionHook(STONE_CATEGORIES.TRIANGLE_TILES);
export const useClearenceTiles = createStoneCollectionHook(STONE_CATEGORIES.CLEARENCE_TILES);


// Infinite query hooks (generated dynamically)
export const useInfiniteMarbleTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.MARBLE_TILES);
export const useInfiniteLimestoneTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.LIMESTONE_TILES);
export const useInfiniteStoneMosaicTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.STONE_MOSAIC_TILES);
export const useInfiniteTravertineTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.TRAVERTINE_TILES);
export const useInfiniteSlateTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.SLATE_TILES);
export const useInfiniteStonePavers = createInfiniteStoneCollectionHook(STONE_CATEGORIES.STONE_PAVERS);
export const useInfiniteGraniteTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.GRANITE_TILES);
export const useInfiniteClayBrickSlips = createInfiniteStoneCollectionHook(STONE_CATEGORIES.CLAY_BRICK_SLIPS);
export const useInfiniteBookmatchSlabs = createInfiniteStoneCollectionHook(STONE_CATEGORIES.BOOKMATCH_SLABS);
export const useInfiniteSlabs = createInfiniteStoneCollectionHook(STONE_CATEGORIES.SLABS);
export const useInfiniteVanityTop = createInfiniteStoneCollectionHook(STONE_CATEGORIES.VANITY_TOP);
export const useInfiniteOffCutGranite = createInfiniteStoneCollectionHook(STONE_CATEGORIES.OFF_CUT_GRANITE);
export const useInfiniteWindowSills = createInfiniteStoneCollectionHook(STONE_CATEGORIES.WINDOW_SILLS);
export const useInfiniteMouldingSkirting = createInfiniteStoneCollectionHook(STONE_CATEGORIES.MOULDING_SKIRTING);
export const useInfiniteStoneSinks = createInfiniteStoneCollectionHook(STONE_CATEGORIES.STONE_SINKS);
export const useInfiniteSlateHearth = createInfiniteStoneCollectionHook(STONE_CATEGORIES.SLATE_HEARTHS);
export const useInfiniteTableTops = createInfiniteStoneCollectionHook(STONE_CATEGORIES.TABLE_TOPS);
export const useInfiniteChequerboardTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.CHEQUERBOARD_TILES);
export const useInfiniteHerringboneTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.HERRINGBONE_TILES);
export const useInfiniteHexagonTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.HEXAGON_TILES);
export const useInfiniteMetroTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.METRO_TILES);
export const useInfiniteMaxiChequerboardTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.MAXI_CHEQUERBOARD_TILES);
export const useInfiniteOctagonCabochonTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.OCTAGON_CABOCHON_TILES);
export const useInfiniteTriangleTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.TRIANGLE_TILES);
export const useInfiniteClearenceTiles = createInfiniteStoneCollectionHook(STONE_CATEGORIES.CLEARENCE_TILES);

// Hook to fetch all stone collections at once
export const useAllStoneCollections = () => {
  return useQuery({
    queryKey: [...STONE_QUERY_KEYS.ALL_STONE_COLLECTIONS],
    queryFn: () => stoneCollectionAPI.fetchAllStoneCollections(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Alternative approach: Use useQueries for individual control over each category
export const useAllStoneCollectionsQueries = () => {
  const queries = useQueries({
    queries: Object.entries(STONE_CATEGORIES).map(([_, categorySlug]) => ({
      queryKey: ['stoneCollection', categorySlug],
      queryFn: () => {
        const apiFunction = STONE_API_MAPPING[categorySlug];
        if (!apiFunction) {
          throw new Error(`Unknown category: ${categorySlug}`);
        }
        return apiFunction();
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    })),
  });

  // Transform results into a more usable format
  const results = Object.keys(STONE_CATEGORIES).reduce((acc, key, index) => {
    const categorySlug = STONE_CATEGORIES[key as keyof typeof STONE_CATEGORIES];
    acc[categorySlug] = queries[index];
    return acc;
  }, {} as Record<StoneCategorySlug, typeof queries[0]>);

  return {
    queries: results,
    isLoading: queries.some(query => query.isLoading),
    isError: queries.some(query => query.isError),
    errors: queries.filter(query => query.isError).map(query => query.error),
    allDataLoaded: queries.every(query => query.data),
  };
};

// Prefetch functions for background loading
export const prefetchStoneCollections = (queryClient: any) => {
  // Prefetch all categories in the background
  Object.entries(STONE_API_MAPPING).forEach(([categorySlug, apiFunction]) => {
    queryClient.prefetchQuery({
      queryKey: ['stoneCollection', categorySlug],
      queryFn: () => apiFunction(),
      staleTime: 5 * 60 * 1000,
    });
  });
};


