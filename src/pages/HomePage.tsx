import Carousel from "../components/Carousel";
import Gridpane from "../components/Gridpane";
import GridpaneLarge from "../components/GridpaneLarge";
import Posts from "../components/Posts";
import ClearanceTilesGrid from "../components/Clearence";
import { useEffect } from "react";
import {
  useInfiniteChequerboardTiles,
  useInfiniteHerringboneTiles,
  useInfiniteMarbleTiles,
  useInfiniteSlabs,
  useInfiniteStoneMosaicTiles,
  useInfiniteTravertineTiles,
} from "../queries/stoneCollection.query";
import { queryClient } from "../lib/queryClient";
import { useInfiniteNewArrivalQuery } from "../queries/newArrivals.query";
import { useInfiniteAllProductsQuery } from "../queries/allProducts.query";
import { useInfiniteBathroomProducts, useInfiniteWhiteProducts } from "../queries/stoneAttributes.query";

const INFINITE_QUERY_CONFIGS = [
  {
    key: 'marble-tiles',
    cacheKey: ['stoneCollection', 'marble-tiles'] as string[]
  },
  {
    key: 'herringbone-tiles', 
    cacheKey: ['stoneCollection', 'herringbone-tiles'] as string[]
  },
  {
    key: 'chequerboard-tiles',
    cacheKey: ['stoneCollection', 'chequerboard-tiles'] as string[]
  },
  {
    key: 'stone-mosaic-tiles',
    cacheKey: ['stoneCollection', 'stone-mosaic-tiles'] as string[]
  },
  {
    key: 'white',
    cacheKey: ['stoneColours', 'white'] as string[]
  },
  {
    key: 'bathroom',
    cacheKey: ['stoneUsageAreas', 'bathroom'] as string[]
  },
  {
    key: 'all-products',
    cacheKey: ['all-products'] as string[]
  },
  {
    key: 'new-arrivals',
    cacheKey: ['new-arrivals'] as string[]
  },
  {
    key: 'slabs',
    cacheKey: ['stoneCollection', 'slabs'] as string[]
  }
];


// Generic function to handle cache setting for infinite query data
const setCacheDataFromInfiniteQuery = (queryData: any, cacheKey: string[]) => {
  if (!queryData?.pages) return;
  
  // Flatten all pages into a single array
  const flattenedData = queryData.pages.flatMap((page: any) => page.data || []);
  
  if (flattenedData.length > 0) {
    queryClient.setQueryData(cacheKey, flattenedData);
  }
};
const HomePage = () => {
  // Use specific infinite queries instead of bulk stoneCollectionsData
  const marbleTilesQuery = useInfiniteMarbleTiles();
  const herringboneTilesQuery = useInfiniteHerringboneTiles();
  const chequerboardTilesQuery = useInfiniteChequerboardTiles();
  const stoneMosaicTilesQuery = useInfiniteStoneMosaicTiles();
  const stoneWhiteTilesQuery = useInfiniteWhiteProducts()
  const bathroomTilesQuery = useInfiniteBathroomProducts();
  const travertineTilesQuery = useInfiniteTravertineTiles();
  const allProductsQuery = useInfiniteAllProductsQuery();
  const newArrivalsQuery = useInfiniteNewArrivalQuery();
  const slabsTilesQuery = useInfiniteSlabs();

  // Map queries to their data for easy processing
  const queryDataMap = {
    'marble-tiles': marbleTilesQuery.data,
    'travertine-tiles': travertineTilesQuery.data,
    'herringbone-tiles': herringboneTilesQuery.data,
    'white': stoneWhiteTilesQuery.data,
    'bathroom': bathroomTilesQuery.data,
    'chequerboard-tiles': chequerboardTilesQuery.data,
    'stone-mosaic-tiles': stoneMosaicTilesQuery.data,
    'all-products': allProductsQuery.data,
    'new-arrivals': newArrivalsQuery.data,
    'slabs': slabsTilesQuery.data,
  };

  // Cache the infinite query data for use in other components
  useEffect(() => {
    INFINITE_QUERY_CONFIGS.forEach(({ key, cacheKey }) => {
      const queryData = queryDataMap[key as keyof typeof queryDataMap];
      setCacheDataFromInfiniteQuery(queryData, cacheKey);
    });
  }, [
    marbleTilesQuery.data,
    travertineTilesQuery.data, 
    stoneMosaicTilesQuery.data,
    stoneWhiteTilesQuery.data,
    bathroomTilesQuery.data,
    herringboneTilesQuery.data,
    chequerboardTilesQuery.data,
    allProductsQuery.data,
    newArrivalsQuery.data,
    slabsTilesQuery.data
  ]);

  // Prefetch additional data in the background if needed
  useEffect(() => {
    const prefetchTimer = setTimeout(() => {
      // Trigger additional prefetching if necessary
      // This can be customized based on your needs
      console.log('Background prefetching complete');
    }, 2000);
    
    return () => clearTimeout(prefetchTimer);
  }, []);

  // Check if any data is loaded
  const hasAnyData = Object.values(queryDataMap).some(data => data?.pages && data.pages.length > 0);

  return (
    <div className="h-full w-full">
      <Carousel autoSlideInterval={10000} />
      <Gridpane />
      <GridpaneLarge />
      <ClearanceTilesGrid />
      <Posts />

      {/* Data is loaded in background - available for other components */}
      {(hasAnyData ) && (
        <div className="hidden">
          {/* Background data loading complete */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
