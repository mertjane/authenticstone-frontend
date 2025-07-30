declare module '@woocommerce/woocommerce-rest-api' {
  class WooCommerceRestApi {
    constructor(config: {
      url: string;
      consumerKey: string;
      consumerSecret: string;
      version?: string;
      wpAPI?: boolean;
      encoding?: string;
      queryStringAuth?: boolean;
    });

    get(endpoint: string, params?: object): Promise<any>;
    post(endpoint: string, data: object, params?: object): Promise<any>;
    put(endpoint: string, data: object, params?: object): Promise<any>;
    delete(endpoint: string, params?: object): Promise<any>;
  }

  export default WooCommerceRestApi;
}
