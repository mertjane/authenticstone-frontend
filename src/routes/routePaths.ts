export const ROUTES = {
  HOME: '/',
  CATEGORY: '/collections/:sectionSlug/:itemSlug',          
  CUSTOM_STONEWORK: '/collections/stone-collection/:itemSlug',   
  DESIGN_PATTERN_COLLECTION: '/collections/:itemSlug',   
  SLABS_CATEGORY: 'collections/:itemSlug',                 
  COLOUR_CATEGORY: '/colour/:itemSlug',                    
  ROOM_TYPE_USAGE_CATEGORY: '/room-type-usage/:itemSlug',  
  FINISH_CATEGORY: '/finish/:itemSlug', 
  ALL_PRODUCTS: '/stone-collection/all-products',               
  CLEARENCE: '/stone-collection/stock-clearance',   
  NEW_ARRIVALS: '/new-arrivals',
  // Single Product Page
  SPP: '/product/:itemName',
  // About Us
  ABOUT_US: '/about-us',
  // Adhesive and grout
  ADHESIVE: '/adhevise-grout-advise',
  // FAQ
  FAQ: '/faq',
  // Delivery Info
  DELIVERY: '/delivery-information',
  // Return Policy
  RETURN_POLICY: '/return-refund-policy',
  // Privacy Policy
  PRIVACY_POLICY: '/privacy-policy',
  // Terms & Conditions
  TERMS_CONDITIONS: '/terms-and-conditions',
  // Contact Us
  CONTACT_US: '/contact-us',
  // SEALING & MAINTENANCE
  SEALING_MAINTENANCE: '/sealing-and-maintenance',
  // INSTALLATION
  INSTALLATION: '/installation',
  // REVIEWS
  REVIEWS: '/reviews',
  // BLOGS
  BLOGS_PAGE: '/blog',
  // AUTH
  AUTH: '/my-account',
  // LOST_PWD
  LOST_PWD: '/my-account/lost-password',
  // CHEKCOUT
  CHECKOUT: '/checkout'
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
