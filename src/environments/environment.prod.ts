//PROD ENVIRONMENT

export const environment = {
  production: true,
  getLiveData1: "https://sandbox.iexapis.com/stable/stock/",
  getLiveData2: "/quote?token=Tpk_11041f324ede4416994820370b092ae0",

  ctjPort: 8091,
  getCompanyInfo1: "http://csv-to-json:",// + this.ctjPort,
  //uses ctjPort
  getCompanyInfo2: "/companies/",
  
  getSingleComapanyGenInfo1: "http://csv-to-json:",// + this.ctjPort,
  //uses ctjPort
  getSingleComapanyGenInfo2: "/companies",
  
  getDataRange1: "http://csv-to-json:",// + this.ctjPort,
  //uses ctjPort
  getDataRange2: "/tenyear/",
  
  get10YearCompanyData1: "http://csv-to-json:",// + this.ctjPort,
  //uses ctjPort
  get10YearCompanyData2: "/tenyear/",
  
  dtjPort: 8091,
  getCompanyClassifications1: "http://dataframe-to-json:",// + this.dtjPort,
  getCompanyClassifications2: "/classifications",//dtj

  getWeights1: "http://dataframe-to-json:",
  //dtjport
  getWeights2: "/weights",
  
  goCrawl1: "http://gocrawler:",// + this.goPort,
  gcPort: 1234,
  goCrawl2: "/crawl",

  getMarketTotals: "http://market-cap:",// + this.mcPort,
  mcPort: 8090  
};
