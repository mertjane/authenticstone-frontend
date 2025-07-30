import type { UseInfiniteQueryResult, InfiniteData } from '@tanstack/react-query';
import type { ApiResponse, Product } from '../types/products.types';

// Type for the query result structure (infinite queries return InfiniteData)
type QueryResult = UseInfiniteQueryResult<InfiniteData<ApiResponse<Product[]>, unknown>, Error>;

// Interface for all the query parameters that will be passed to createAllQueries
interface QueryParams {
  // New Arrivals queries
  newArrivalsQuery: QueryResult;
  // All Products queries
  allProductsQuery: QueryResult;
  // Collection queries
  marbleTilesQuery: QueryResult;
  limestoneTilesQuery: QueryResult;
  stoneMosaicTilesQuery: QueryResult;
  travertineTilesQuery: QueryResult;
  slateTilesQuery: QueryResult;
  stonePaversQuery: QueryResult;
  graniteTilesQuery: QueryResult;
  clayBrickSlipsQuery: QueryResult;
  bookmatchSlabsQuery: QueryResult;
  slabsQuery: QueryResult;
  vanityTopQuery: QueryResult;
  offCutGraniteQuery: QueryResult;
  windowSillsQuery: QueryResult;
  mouldingSkirtingQuery: QueryResult;
  stoneSinksQuery: QueryResult;
  slateHearthQuery: QueryResult;
  tableTopsQuery: QueryResult;
  chequerboardTilesQuery: QueryResult;
  herringboneTilesQuery: QueryResult;
  hexagonTilesQuery: QueryResult;
  metroTilesQuery: QueryResult;
  maxiChequerboardTilesQuery: QueryResult;
  octagonCabochonTilesQuery: QueryResult;
  triangleTilesQuery: QueryResult;
  clearenceTilesQuery: QueryResult;
  
  // Color queries
  whiteProductsQuery: QueryResult;
  blackProductsQuery: QueryResult;
  greyProductsQuery: QueryResult;
  beigeBrownProductsQuery: QueryResult;
  creamYellowProductsQuery: QueryResult;
  bluesGreenProductsQuery: QueryResult;
  redPinkProductsQuery: QueryResult;
  multiColourProductsQuery: QueryResult;
  
  // Usage area queries
  kitchenProductsQuery: QueryResult;
  kitchenSplashbackProductsQuery: QueryResult;
  bathroomProductsQuery: QueryResult;
  bathroomFloorProductsQuery: QueryResult;
  livingroomProductsQuery: QueryResult;
  livingroomFloorProductsQuery: QueryResult;
  outdoorProductsQuery: QueryResult;
  poolProductsQuery: QueryResult;
  wetroomProductsQuery: QueryResult;
  
  // Finish queries
  tumbledProductsQuery: QueryResult;
  polishProductsQuery: QueryResult;
  honedProductsQuery: QueryResult;
  splitProductsQuery: QueryResult;
  brushedProductsQuery: QueryResult;
}

// Utility function to create the allQueries mapping object
export const createAllQueries = (params: QueryParams) => {
  return {
    allProducts: params.allProductsQuery,
    newArrivals: params.newArrivalsQuery,
    marbleTiles: params.marbleTilesQuery,
    limestoneTiles: params.limestoneTilesQuery,
    stoneMosaicTiles: params.stoneMosaicTilesQuery,
    travertineTiles: params.travertineTilesQuery,
    slateTiles: params.slateTilesQuery,
    stonePavers: params.stonePaversQuery,
    graniteTiles: params.graniteTilesQuery,
    clayBrickSlips: params.clayBrickSlipsQuery,
    bookmatchSlabs: params.bookmatchSlabsQuery,
    slabs: params.slabsQuery,
    vanityTop: params.vanityTopQuery,
    offCutGranite: params.offCutGraniteQuery,
    windowSills: params.windowSillsQuery,
    mouldingSkirting: params.mouldingSkirtingQuery,
    stoneSinks: params.stoneSinksQuery,
    slateHearth: params.slateHearthQuery,
    tableTops: params.tableTopsQuery,
    chequerboardTiles: params.chequerboardTilesQuery,
    herringboneTiles: params.herringboneTilesQuery,
    hexagonTiles: params.hexagonTilesQuery,
    metroTiles: params.metroTilesQuery,
    maxiChequerboardTiles: params.maxiChequerboardTilesQuery,
    octagonCabochonTiles: params.octagonCabochonTilesQuery,
    triangleTiles: params.triangleTilesQuery,
    stockClearance: params.clearenceTilesQuery,
    whiteProducts: params.whiteProductsQuery,
    blackProducts: params.blackProductsQuery,
    greyProducts: params.greyProductsQuery,
    beigeBrownProducts: params.beigeBrownProductsQuery,
    creamYellowProducts: params.creamYellowProductsQuery,
    bluesGreenProducts: params.bluesGreenProductsQuery,
    redPinkProducts: params.redPinkProductsQuery,
    multiColourProducts: params.multiColourProductsQuery,
    kitchenProducts: params.kitchenProductsQuery,
    kitchenSplashbackProducts: params.kitchenSplashbackProductsQuery,
    bathroomProducts: params.bathroomProductsQuery,
    bathroomFloorProducts: params.bathroomFloorProductsQuery,
    livingroomProducts: params.livingroomProductsQuery,
    livingroomFloorProducts: params.livingroomFloorProductsQuery,
    outdoorProducts: params.outdoorProductsQuery,
    poolProducts: params.poolProductsQuery,
    wetroomProducts: params.wetroomProductsQuery,
    tumbledProducts: params.tumbledProductsQuery,
    polishProducts: params.polishProductsQuery,
    honedProducts: params.honedProductsQuery,
    splitProducts: params.splitProductsQuery,
    brushedProducts: params.brushedProductsQuery,
  };
};

// Type for the return value of createAllQueries
export type AllQueriesType = ReturnType<typeof createAllQueries>; 