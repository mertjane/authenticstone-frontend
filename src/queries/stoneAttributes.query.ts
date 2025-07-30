import { useQuery, useQueries, useInfiniteQuery } from '@tanstack/react-query';
import { STONE_FINISHES, STONE_COLOURS, STONE_USAGE_AREAS, type StoneColourSlug, type StoneUsageAreasSlug, type StoneFinishSlug } from '../types/products.types';
import { stoneColoursAPI, stoneFinishesAPI, stoneUsageAreasAPI } from '../lib/api/stoneAttributes.api';

/**
 * Stone Colours
 */

// Query keys for better cache management
export const STONE_COLOUR_QUERY_KEYS = {
  ALL_STONE_COLOURS: ['stoneColours', 'all'],
  WHITE: ['stoneColours', 'white'],
  BLACK: ['stoneColours', 'black'],
  GREY: ['stoneColours', 'grey'],
  BEIGE_BROWN: ['stoneColours', 'beige-brown'],
  CREAM_YELLOW: ['stoneColours', 'cream-yellow'],
  BLUES_GREEN: ['stoneColours', 'blues-green'],
  RED_PINK: ['stoneColours', 'red-pink'],
  MULTI_COLOUR: ['stoneColours', 'multi-colour'],
} as const;

// Mapping of colours to their API functions
const STONE_COLOUR_API_MAPPING = {
  [STONE_COLOURS.WHITE]: stoneColoursAPI.fetchWhiteProducts,
  [STONE_COLOURS.BLACK]: stoneColoursAPI.fetchBlackProducts,
  [STONE_COLOURS.GREY]: stoneColoursAPI.fetchGreyProducts,
  [STONE_COLOURS.BEIGE_BROWN]: stoneColoursAPI.fetchBeigeBrownProducts,
  [STONE_COLOURS.CREAM_YELLOW]: stoneColoursAPI.fetchCreamYellowProducts,
  [STONE_COLOURS.BLUES_GREEN]: stoneColoursAPI.fetchBluesGreenProducts,
  [STONE_COLOURS.RED_PINK]: stoneColoursAPI.fetchRedPinkProducts,
  [STONE_COLOURS.MULTI_COLOUR]: stoneColoursAPI.fetchMultiColourProducts,
} as const;

// Generic hook factory for colour queries
const createStoneColourHook = (colour: StoneColourSlug) => {
  return (page = 1, per_page = 12) => {
    const apiFunction = STONE_COLOUR_API_MAPPING[colour];
    return useQuery({
      queryKey: ['stoneColours', colour, page, per_page],
      queryFn: () => apiFunction(page, per_page),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });
  };
};

// Generic hook factory for infinite colour queries
const createInfiniteStoneColourHook = (colour: StoneColourSlug) => {
  return () => {
    const apiFunction = STONE_COLOUR_API_MAPPING[colour];
    return useInfiniteQuery({
      queryKey: ['stoneColours', colour, 'infinite'],
      queryFn: ({ pageParam = 1 }) => apiFunction(pageParam, 12),
      /* getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.meta && lastPage.meta.has_next_page) {
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

// Individual colour hooks (generated dynamically)
export const useWhiteProducts = createStoneColourHook(STONE_COLOURS.WHITE);
export const useBlackProducts = createStoneColourHook(STONE_COLOURS.BLACK);
export const useGreyProducts = createStoneColourHook(STONE_COLOURS.GREY);
export const useBeigeBrownProducts = createStoneColourHook(STONE_COLOURS.BEIGE_BROWN);
export const useCreamYellowProducts = createStoneColourHook(STONE_COLOURS.CREAM_YELLOW);
export const useBluesGreenProducts = createStoneColourHook(STONE_COLOURS.BLUES_GREEN);
export const useRedPinkProducts = createStoneColourHook(STONE_COLOURS.RED_PINK);
export const useMultiColourProducts = createStoneColourHook(STONE_COLOURS.MULTI_COLOUR);

// Infinite colour hooks (generated dynamically)
export const useInfiniteWhiteProducts = createInfiniteStoneColourHook(STONE_COLOURS.WHITE);
export const useInfiniteBlackProducts = createInfiniteStoneColourHook(STONE_COLOURS.BLACK);
export const useInfiniteGreyProducts = createInfiniteStoneColourHook(STONE_COLOURS.GREY);
export const useInfiniteBeigeBrownProducts = createInfiniteStoneColourHook(STONE_COLOURS.BEIGE_BROWN);
export const useInfiniteCreamYellowProducts = createInfiniteStoneColourHook(STONE_COLOURS.CREAM_YELLOW);
export const useInfiniteBluesGreenProducts = createInfiniteStoneColourHook(STONE_COLOURS.BLUES_GREEN);
export const useInfiniteRedPinkProducts = createInfiniteStoneColourHook(STONE_COLOURS.RED_PINK);
export const useInfiniteMultiColourProducts = createInfiniteStoneColourHook(STONE_COLOURS.MULTI_COLOUR);

export const useAllStoneColours = () => {
  return useQuery({
    queryKey: [...STONE_COLOUR_QUERY_KEYS.ALL_STONE_COLOURS],
    queryFn: () => stoneColoursAPI.fetchAllStoneColours(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAllStoneColoursQueries = () => {
  const queries = useQueries({
    queries: Object.entries(STONE_COLOURS).map(([_, colourSlug]) => ({
      queryKey: ['stoneColours', colourSlug],
      queryFn: () => {
        const apiFunction = STONE_COLOUR_API_MAPPING[colourSlug];
        if (!apiFunction) {
          throw new Error(`Unknown colour: ${colourSlug}`);
        }
        return apiFunction();
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    })),
  });

  // Transform results into a more usable format
  const results = Object.keys(STONE_COLOURS).reduce((acc, key, index) => {
    const colourSlug = STONE_COLOURS[key as keyof typeof STONE_COLOURS];
    acc[colourSlug] = queries[index];
    return acc;
  }, {} as Record<StoneColourSlug, typeof queries[0]>);

  return {
    queries: results,
    isLoading: queries.some(query => query.isLoading),
    isError: queries.some(query => query.isError),
    errors: queries.filter(query => query.isError).map(query => query.error),
    allDataLoaded: queries.every(query => query.data),
  }
};

// Prefetch functions for background loading
export const prefetchStoneColours = (queryClient: any) => {
  // Prefetch all colours in the background
  Object.entries(STONE_COLOUR_API_MAPPING).forEach(([colourSlug, apiFunction]) => {
    queryClient.prefetchQuery({
      queryKey: ['stoneColours', colourSlug],
      queryFn: () => apiFunction(),
      staleTime: 5 * 60 * 1000,
    });
  });
};

/**
 * Stone Usage Areas
 */

// Query keys for better cache management
export const STONE_USAGE_AREA_QUERY_KEYS = {
  ALL_STONE_USAGE_AREAS: ['stoneUsageAreas', 'all'],
  KITCHEN: ['stoneUsageAreas', 'kitchen'],
  KITCHEN_SPLASHBACK: ['stoneUsageAreas', 'kitchen-splashback'],
  BATHROOM: ['stoneUsageAreas', 'bathroom'],
  BATHROOM_FLOOR: ['stoneUsageAreas', 'bathroom-floor'],
  LIVING_ROOM: ['stoneUsageAreas', 'living-room'],
  LIVING_ROOM_FLOOR: ['stoneUsageAreas', 'living-room-floor'],
  OUTDOOR: ['stoneUsageAreas', 'outdoor'],
  POOL: ['stoneUsageAreas', 'pool'],
  WET_ROOM: ['stoneUsageAreas', 'wet-room'],
} as const;

// Mapping of usage areas to their API functions
const STONE_USAGE_AREA_API_MAPPING = {
  [STONE_USAGE_AREAS.KITCHEN]: stoneUsageAreasAPI.fetchAttrKitchen,
  [STONE_USAGE_AREAS.KITCHEN_SPLASHBACK]: stoneUsageAreasAPI.fetchAttrKitchenSplashback,
  [STONE_USAGE_AREAS.BATHROOM]: stoneUsageAreasAPI.fetchAttrBathroom,
  [STONE_USAGE_AREAS.BATHROOM_FLOOR]: stoneUsageAreasAPI.fetchAttrBathFloor,
  [STONE_USAGE_AREAS.LIVING_ROOM]: stoneUsageAreasAPI.fetchAttrLivingroom,
  [STONE_USAGE_AREAS.LIVING_ROOM_FLOOR]: stoneUsageAreasAPI.fetchAttrLivingroomFloor,
  [STONE_USAGE_AREAS.OUTDOOR]: stoneUsageAreasAPI.fetchAttrOutdoor,
  [STONE_USAGE_AREAS.POOL]: stoneUsageAreasAPI.fetchAttrPool,
  [STONE_USAGE_AREAS.WET_ROOM]: stoneUsageAreasAPI.fetchAttrWetroom,
} as const;

// Generic hook factory for usage area queries
const createStoneUsageAreaHook = (usageArea: StoneUsageAreasSlug) => {
  return (page = 1, per_page = 12) => {
    const apiFunction = STONE_USAGE_AREA_API_MAPPING[usageArea];
    return useQuery({
      queryKey: ['stoneUsageAreas', usageArea, page, per_page],
      queryFn: () => apiFunction(page, per_page),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });
  };
};

// Generic hook factory for infinite usage area queries
const createInfiniteStoneUsageAreaHook = (usageArea: StoneUsageAreasSlug) => {
  return () => {
    const apiFunction = STONE_USAGE_AREA_API_MAPPING[usageArea];
    return useInfiniteQuery({
      queryKey: ['stoneUsageAreas', usageArea, 'infinite'],
      queryFn: ({ pageParam = 1 }) => apiFunction(pageParam, 12),
      /* getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.meta && lastPage.meta.has_next_page) {
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

// Individual usage area hooks (generated dynamically)
export const useKitchenProducts = createStoneUsageAreaHook(STONE_USAGE_AREAS.KITCHEN);
export const useKitchenSplashbackProducts = createStoneUsageAreaHook(STONE_USAGE_AREAS.KITCHEN_SPLASHBACK);
export const useBathroomProducts = createStoneUsageAreaHook(STONE_USAGE_AREAS.BATHROOM);
export const useBathroomFloorProducts = createStoneUsageAreaHook(STONE_USAGE_AREAS.BATHROOM_FLOOR);
export const useLivingroomProducts = createStoneUsageAreaHook(STONE_USAGE_AREAS.LIVING_ROOM);
export const useLivingroomFloorProducts = createStoneUsageAreaHook(STONE_USAGE_AREAS.LIVING_ROOM_FLOOR);
export const useOutdoorProducts = createStoneUsageAreaHook(STONE_USAGE_AREAS.OUTDOOR);
export const usePoolProducts = createStoneUsageAreaHook(STONE_USAGE_AREAS.POOL);
export const useWetroomProducts = createStoneUsageAreaHook(STONE_USAGE_AREAS.WET_ROOM);

// Infinite usage area hooks (generated dynamically)
export const useInfiniteKitchenProducts = createInfiniteStoneUsageAreaHook(STONE_USAGE_AREAS.KITCHEN);
export const useInfiniteKitchenSplashbackProducts = createInfiniteStoneUsageAreaHook(STONE_USAGE_AREAS.KITCHEN_SPLASHBACK);
export const useInfiniteBathroomProducts = createInfiniteStoneUsageAreaHook(STONE_USAGE_AREAS.BATHROOM);
export const useInfiniteBathroomFloorProducts = createInfiniteStoneUsageAreaHook(STONE_USAGE_AREAS.BATHROOM_FLOOR);
export const useInfiniteLivingroomProducts = createInfiniteStoneUsageAreaHook(STONE_USAGE_AREAS.LIVING_ROOM);
export const useInfiniteLivingroomFloorProducts = createInfiniteStoneUsageAreaHook(STONE_USAGE_AREAS.LIVING_ROOM_FLOOR);
export const useInfiniteOutdoorProducts = createInfiniteStoneUsageAreaHook(STONE_USAGE_AREAS.OUTDOOR);
export const useInfinitePoolProducts = createInfiniteStoneUsageAreaHook(STONE_USAGE_AREAS.POOL);
export const useInfiniteWetroomProducts = createInfiniteStoneUsageAreaHook(STONE_USAGE_AREAS.WET_ROOM);

export const useAllStoneUsageAreas = () => {
  return useQuery({
    queryKey: [...STONE_USAGE_AREA_QUERY_KEYS.ALL_STONE_USAGE_AREAS],
    queryFn: () => stoneUsageAreasAPI.fetchAllStoneUsageAreas(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAllStoneUsageAreasQueries = () => {
  const queries = useQueries({
    queries: Object.entries(STONE_USAGE_AREAS).map(([_, usageAreaSlug]) => ({
      queryKey: ['stoneUsageAreas', usageAreaSlug],
      queryFn: () => {
        const apiFunction = STONE_USAGE_AREA_API_MAPPING[usageAreaSlug];
        if (!apiFunction) {
          throw new Error(`Unknown usage area: ${usageAreaSlug}`);
        }
        return apiFunction();
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    })),
  });

  // Transform results into a more usable format
  const results = Object.keys(STONE_USAGE_AREAS).reduce((acc, key, index) => {
    const usageAreaSlug = STONE_USAGE_AREAS[key as keyof typeof STONE_USAGE_AREAS];
    acc[usageAreaSlug] = queries[index];
    return acc;
  }, {} as Record<StoneUsageAreasSlug, typeof queries[0]>);

  return {
    queries: results,
    isLoading: queries.some(query => query.isLoading),
    isError: queries.some(query => query.isError),
    errors: queries.filter(query => query.isError).map(query => query.error),
    allDataLoaded: queries.every(query => query.data),
  }
};

// Prefetch functions for background loading
export const prefetchStoneUsageAreas = (queryClient: any) => {
  // Prefetch all usage areas in the background
  Object.entries(STONE_USAGE_AREA_API_MAPPING).forEach(([usageAreaSlug, apiFunction]) => {
    queryClient.prefetchQuery({
      queryKey: ['stoneUsageAreas', usageAreaSlug],
      queryFn: () => apiFunction(),
      staleTime: 5 * 60 * 1000,
    });
  });
};

/**
 * Stone Finishes
 */

// Query keys for better cache management
export const STONE_FINISHES_QUERY_KEYS = {
  ALL_FINISHES: ['stoneFinishes', 'all'],
  BRUSHED: ['stoneFinishes', 'brushed-rough-finish'],
  HONED: ['stoneFinishes', 'honed-matt-smooth'],
  POLISHED: ['stoneFinishes', 'polished-shiny-smooth'],
  SPLIT_FACE: ['stoneFinishes', 'split-face'],
  TUMBLED: ['stoneFinishes', 'tumbled-rough-edgy']
} as const;

// Mapping of finishes to their API functions
const STONE_FINISHES_API_MAPPING = {
  [STONE_FINISHES.BRUSHED]: stoneFinishesAPI.fetchFinishBrushed,
  [STONE_FINISHES.HONEST]: stoneFinishesAPI.fetchFinishHoned,
  [STONE_FINISHES.POLISHED]: stoneFinishesAPI.fetchFinishPolished,
  [STONE_FINISHES.SPLIT]: stoneFinishesAPI.fetchFinishSplit,
  [STONE_FINISHES.TUMBLED]: stoneFinishesAPI.fetchFinishTumbled,
} as const;

// Generic hook factory for finish queries
const createStoneFinishHook = (finish: StoneFinishSlug) => {
  return (page = 1, per_page = 12) => {
    const apiFunction = STONE_FINISHES_API_MAPPING[finish];
    return useQuery({
      queryKey: ['stoneFinishes', finish, page, per_page],
      queryFn: () => apiFunction(page, per_page),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });
  };
};

// Generic hook factory for infinite finish queries
const createInfiniteStoneFinishHook = (finish: StoneFinishSlug) => {
  return () => {
    const apiFunction = STONE_FINISHES_API_MAPPING[finish];
    return useInfiniteQuery({
      queryKey: ['stoneFinishes', finish, 'infinite'],
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

// Individual finish hooks (generated dynamically)
export const useBrushedProducts = createStoneFinishHook(STONE_FINISHES.BRUSHED);
export const useHonedProducts = createStoneFinishHook(STONE_FINISHES.HONEST);
export const usePolishProducts = createStoneFinishHook(STONE_FINISHES.POLISHED);
export const useSplitProducts = createStoneFinishHook(STONE_FINISHES.SPLIT);
export const useTumbledProducts = createStoneFinishHook(STONE_FINISHES.TUMBLED);

// Infinite finish hooks (generated dynamically)
export const useInfiniteBrushedProducts = createInfiniteStoneFinishHook(STONE_FINISHES.BRUSHED);
export const useInfiniteHonedProducts = createInfiniteStoneFinishHook(STONE_FINISHES.HONEST);
export const useInfinitePolishProducts = createInfiniteStoneFinishHook(STONE_FINISHES.POLISHED);
export const useInfiniteSplitProducts = createInfiniteStoneFinishHook(STONE_FINISHES.SPLIT);
export const useInfiniteTumbledProducts = createInfiniteStoneFinishHook(STONE_FINISHES.TUMBLED);

export const useAllFinishedProducts = () => {
  return useQuery({
    queryKey: [...STONE_FINISHES_QUERY_KEYS.ALL_FINISHES],
    queryFn: () => stoneFinishesAPI.fetchAllFinishes(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export const allStoneFinishesQueries = () => {
  const queries = useQueries({
    queries: Object.entries(STONE_FINISHES).map(([_, finishesSlug]) => ({
      queryKey: ['stoneFinishes', finishesSlug],
      queryFn: () => {
        const apiFunction = STONE_FINISHES_API_MAPPING[finishesSlug];
        if (!apiFunction) {
          throw new Error(`Unknown stone finish: ${finishesSlug}`);
        }
        return apiFunction();
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }))
  })

  // Transform result into a more usable format
  const results = Object.keys(STONE_FINISHES).reduce((acc, key, index) => {
    const finishesSlug = STONE_FINISHES[key as keyof typeof STONE_FINISHES];
    acc[finishesSlug] = queries[index];
    return acc;
  }, {} as Record<StoneFinishSlug, typeof queries[0]>);

  return {
    queries: results,
    isLoading: queries.some(query => query.isLoading),
    isError: queries.some(query => query.isError),
    errors: queries.filter(query => query.isError).map(query => query.error),
    allDataLoaded: queries.every(query => query.data),
  }
};

// Prefetch functions for background loading
export const prefetchStoneFinishes = (queryClient: any) => {
  // Prefetch all finishes in the background
  Object.entries(STONE_FINISHES_API_MAPPING).forEach(([finishSlug, apiFunction]) => {
    queryClient.prefetchQuery({
      queryKey: ['stoneFinishes', finishSlug],
      queryFn: () => apiFunction(),
      staleTime: 5 * 60 * 1000,
    });
  });
};

