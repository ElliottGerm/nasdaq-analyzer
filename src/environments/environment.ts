// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//DEV ENVIRONMENT
export const environment = {
  production: false,
  getLiveData1: "https://sandbox.iexapis.com/stable/stock/",
  getLiveData2: "/quote?token=Tpk_11041f324ede4416994820370b092ae0",

  getDescriptions: "http://dataframe-to-json-prod.3.13.39.124.xip.io/descriptions/",
  
  getCompanyInfo1: "http://csv-to-json-prod.3.13.39.124.xip.io/companies",
  getCompanyInfo2: "",

  getDataRange1: "http://csv-to-json-prod.3.13.39.124.xip.io/tenyear/",
  getDataRange2: "",

  get10YearCompanyData1: "http://csv-to-json-prod.3.13.39.124.xip.io/tenyear/",
  get10YearCompanyData2: "", 

  getCompanyClassifications1: "http://dataframe-to-json-prod.3.13.39.124.xip.io/classifications",
  getCompanyClassifications2: "",

  getSingleComapanyGenInfo1: "http://csv-to-json-prod.3.13.39.124.xip.io/companies/",
  getSingleComapanyGenInfo2: "", 

  goCrawl1: "http://gocrawler-prod.3.13.39.124.xip.io/crawl",
  goCrawl2: "",

  getMarketTotals: "http://market-cap-prod.3.13.39.124.xip.io/",

  getWeights1: "http://dataframe-to-json-prod.3.13.39.124.xip.io/weights",
  getWeights2: "",


  ctjPort: "",
  dtjPort: "",
  mcPort: "",
  gcPort: "",
    
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
