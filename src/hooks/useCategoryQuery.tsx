import { useLocation } from "react-router";
import { ROUTE_QUERY_MAPPING } from "../constants/routeMappings";

// Import all hooks
import { useInfiniteAllProductsQuery } from "../queries/allProducts.query";
import { useInfiniteNewArrivalQuery } from "../queries/newArrivals.query";
import {
  useInfiniteMarbleTiles,
  useInfiniteLimestoneTiles,
  useInfiniteStoneMosaicTiles,
  useInfiniteTravertineTiles,
  useInfiniteSlateTiles,
  useInfiniteStonePavers,
  useInfiniteGraniteTiles,
  useInfiniteClayBrickSlips,
  useInfiniteBookmatchSlabs,
  useInfiniteSlabs,
  useInfiniteVanityTop,
  useInfiniteOffCutGranite,
  useInfiniteWindowSills,
  useInfiniteMouldingSkirting,
  useInfiniteStoneSinks,
  useInfiniteSlateHearth,
  useInfiniteTableTops,
  useInfiniteChequerboardTiles,
  useInfiniteHerringboneTiles,
  useInfiniteHexagonTiles,
  useInfiniteMetroTiles,
  useInfiniteMaxiChequerboardTiles,
  useInfiniteOctagonCabochonTiles,
  useInfiniteTriangleTiles,
  useInfiniteClearenceTiles,
} from "../queries/stoneCollection.query";

import {
  useInfiniteWhiteProducts,
  useInfiniteBlackProducts,
  useInfiniteGreyProducts,
  useInfiniteBeigeBrownProducts,
  useInfiniteCreamYellowProducts,
  useInfiniteBluesGreenProducts,
  useInfiniteRedPinkProducts,
  useInfiniteMultiColourProducts,
  useInfiniteKitchenProducts,
  useInfiniteKitchenSplashbackProducts,
  useInfiniteBathroomProducts,
  useInfiniteBathroomFloorProducts,
  useInfiniteLivingroomProducts,
  useInfiniteLivingroomFloorProducts,
  useInfiniteOutdoorProducts,
  useInfinitePoolProducts,
  useInfiniteWetroomProducts,
  useInfiniteTumbledProducts,
  useInfinitePolishProducts,
  useInfiniteHonedProducts,
  useInfiniteSplitProducts,
  useInfiniteBrushedProducts,
} from "../queries/stoneAttributes.query"

export const useCategoryQuery = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Get the  name from route mapping
  const Name = ROUTE_QUERY_MAPPING[path as keyof typeof ROUTE_QUERY_MAPPING];
  
  // Use switch to call only the required 
  switch (Name) {
    case 'allProducts':
      return useInfiniteAllProductsQuery();
    
    case 'newArrivals':
      return useInfiniteNewArrivalQuery();
    
    // Stone Collection Queries
    case 'marbleTiles':
      return useInfiniteMarbleTiles();
    
    case 'limestoneTiles':
      return useInfiniteLimestoneTiles();
    
    case 'stoneMosaicTiles':
      return useInfiniteStoneMosaicTiles();
    
    case 'travertineTiles':
      return useInfiniteTravertineTiles();
    
    case 'slateTiles':
      return useInfiniteSlateTiles();
    
    case 'stonePavers':
      return useInfiniteStonePavers();
    
    case 'graniteTiles':
      return useInfiniteGraniteTiles();
    
    case 'clayBrickSlips':
      return useInfiniteClayBrickSlips();
    
    case 'bookmatchSlabs':
      return useInfiniteBookmatchSlabs();
    
    case 'slabs':
      return useInfiniteSlabs();
    
    case 'vanityTop':
      return useInfiniteVanityTop();
    
    case 'offCutGranite':
      return useInfiniteOffCutGranite();
    
    case 'windowSills':
      return useInfiniteWindowSills();
    
    case 'mouldingSkirting':
      return useInfiniteMouldingSkirting();
    
    case 'stoneSinks':
      return useInfiniteStoneSinks();
    
    case 'slateHearth':
      return useInfiniteSlateHearth();
    
    case 'tableTops':
      return useInfiniteTableTops();
    
    case 'chequerboardTiles':
      return useInfiniteChequerboardTiles();
    
    case 'herringboneTiles':
      return useInfiniteHerringboneTiles();
    
    case 'hexagonTiles':
      return useInfiniteHexagonTiles();
    
    case 'metroTiles':
      return useInfiniteMetroTiles();
    
    case 'maxiChequerboardTiles':
      return useInfiniteMaxiChequerboardTiles();
    
    case 'octagonCabochonTiles':
      return useInfiniteOctagonCabochonTiles();
    
    case 'triangleTiles':
      return useInfiniteTriangleTiles();
    
    case 'stockClearance':
      return useInfiniteClearenceTiles();
    
    // Color-based Queries
    case 'whiteProducts':
      return useInfiniteWhiteProducts();
    
    case 'blackProducts':
      return useInfiniteBlackProducts();
    
    case 'greyProducts':
      return useInfiniteGreyProducts();
    
    case 'beigeBrownProducts':
      return useInfiniteBeigeBrownProducts();
    
    case 'creamYellowProducts':
      return useInfiniteCreamYellowProducts();
    
    case 'bluesGreenProducts':
      return useInfiniteBluesGreenProducts();
    
    case 'redPinkProducts':
      return useInfiniteRedPinkProducts();
    
    case 'multiColourProducts':
      return useInfiniteMultiColourProducts();
    
    // Usage Area Queries
    case 'kitchenProducts':
      return useInfiniteKitchenProducts();
    
    case 'kitchenSplashbackProducts':
      return useInfiniteKitchenSplashbackProducts();
    
    case 'bathroomProducts':
      return useInfiniteBathroomProducts();
    
    case 'bathroomFloorProducts':
      return useInfiniteBathroomFloorProducts();
    
    case 'livingroomProducts':
      return useInfiniteLivingroomProducts();
    
    case 'livingroomFloorProducts':
      return useInfiniteLivingroomFloorProducts();
    
    case 'outdoorProducts':
      return useInfiniteOutdoorProducts();
    
    case 'poolProducts':
      return useInfinitePoolProducts();
    
    case 'wetroomProducts':
      return useInfiniteWetroomProducts();
    
    // Finish-based Queries
    case 'tumbledProducts':
      return useInfiniteTumbledProducts();
    
    case 'polishProducts':
      return useInfinitePolishProducts();
    
    case 'honedProducts':
      return useInfiniteHonedProducts();
    
    case 'splitProducts':
      return useInfiniteSplitProducts();
    
    case 'brushedProducts':
      return useInfiniteBrushedProducts();
    
    default:
      // Return a default  or null
      return useInfiniteAllProductsQuery();
  }
};