// Route to query mapping for selecting the right data based on URL path
export const ROUTE_QUERY_MAPPING = {
  // Collection routes (updated to match actual URL structure)
  "/stone-collection/all-products": 'allProducts',
  "/new-arrivals": "newArrivals",
  "/collections/stone-collection/marble-tiles": "marbleTiles",
  "/collections/stone-collection/limestone-tiles": "limestoneTiles",
  "/collections/stone-collection/stone-mosaic-tiles": "stoneMosaicTiles",
  "/collections/stone-collection/mosaic-tiles": "stoneMosaicTiles",
  "/collections/stone-collection/travertine-tiles": "travertineTiles",
  "/collections/stone-collection/slate-tiles": "slateTiles",
  "/collections/stone-collection/stone-pavers": "stonePavers",
  "/collections/stone-collection/granite-tiles": "graniteTiles",
  "/collections/stone-collection/clay-brick-slips": "clayBrickSlips",
  "/collections/bookmatch-slabs": "bookmatchSlabs",
  "/collections/slabs": "slabs",
  "/collections/vanity-tops": "vanityTop",
  "/collections/off-cut-granite-quartz": "offCutGranite",
  "/collections/custom-stonework/window-sills": "windowSills",
  "/collections/stone-collection/mouldings-skirtings": "mouldingSkirting",
  "/collections/custom-stonework/stone-sinks": "stoneSinks",
  "/collections/custom-stonework/slate-hearths": "slateHearth",
  "/collections/custom-stonework/table-tops": "tableTops",
  "/collections/design-pattern-collection/chequerboard-tiles": "chequerboardTiles",
  "/collections/design-pattern-collection/herringbone-tiles": "herringboneTiles",
  "/collections/design-pattern-collection/hexagon-tiles": "hexagonTiles",
  "/collections/design-pattern-collection/metro-tiles": "metroTiles",
  "/collections/design-pattern-collection/maxi-chequerboard-tiles": "maxiChequerboardTiles",
  "/collections/design-pattern-collection/octagon-cabochon-tiles": "octagonCabochonTiles",
  "/collections/design-pattern-collection/triangle-tiles": "triangleTiles",
  "/stone-collection/stock-clearance": "stockClearance",

  

  // Color routes
  "/colour/white": "whiteProducts",
  "/colour/whites": "whiteProducts",
  "/colour/black": "blackProducts",
  "/colour/blacks": "blackProducts",
  "/colour/grey": "greyProducts",
  "/colour/greys": "greyProducts",
  "/colour/beige-brown": "beigeBrownProducts",
  "/colour/beiges-browns": "beigeBrownProducts",
  "/colour/cream-yellow": "creamYellowProducts",
  "/colour/creams-yellows": "creamYellowProducts",
  "/colour/blues-green": "bluesGreenProducts",
  "/colour/blue-green": "bluesGreenProducts",
  "/colour/blues-greens": "bluesGreenProducts",
  "/colour/red-pink": "redPinkProducts",
  "/colour/reds-pinks": "redPinkProducts",
  "/colour/multi-colour": "multiColourProducts",
  "/colour/multicolor-pattern": "multiColourProducts",
  "/colour/multicolors-patterns": "multiColourProducts",

  // Usage area routes
  "/room-type-usage/kitchen": "kitchenProducts",
  "/room-type-usage/kitchen-splashback": "kitchenSplashbackProducts",
  "/room-type-usage/bathroom": "bathroomProducts",
  "/room-type-usage/bathroom-floor": "bathroomFloorProducts",
  "/room-type-usage/living-room": "livingroomProducts",
  "/room-type-usage/living-room-floor": "livingroomFloorProducts",
  "/room-type-usage/outdoor": "outdoorProducts",
  "/room-type-usage/pool": "poolProducts",
  "/room-type-usage/wet-room": "wetroomProducts",

  // Finish routes
  "/finish/brushed-rough-finish": "brushedProducts",
  "/finish/honed-matt-smooth": "honedProducts",
  "/finish/polished-shiny-smooth": "polishProducts",
  "/finish/split-face": "splitProducts",
  "/finish/tumbled-rough-edgy": "tumbledProducts",
} as const;

export type RouteQueryMappingKey = keyof typeof ROUTE_QUERY_MAPPING;
export type QueryName = typeof ROUTE_QUERY_MAPPING[RouteQueryMappingKey]; 