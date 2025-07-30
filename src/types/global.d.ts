export {};

declare global {
  interface Window {
    initMap: () => void;
    google: any;
    Trustindex?: any;
  }
}