import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyInfoService } from '../company-info.service';


@Component({
  selector: 'app-company-analysis',
  templateUrl: './company-analysis.component.html',
  styleUrls: ['./company-analysis.component.css']
})
export class CompanyAnalysisComponent implements OnInit {

  public symbol: any;               //company ticker for url
  companyData: any[] = [];          //stores all the company's data

  singleCompany: any;               //a single company's classification
  today: string = '';               //todays date formatted for microservice
  notAvailable: boolean = false;

  /**General info of a single company */
  name: string = '';
  marketCap: any;
  isMarketCap: boolean = false;
  ipoYear: number;
  sector: string = '';
  industry: string = '';
  isIndustry: boolean = false;
  isSector: boolean = false;

  /**reclassified sector and industry */
  dataFrameSec: any;
  isDataFrameSec: boolean = false;
  dataFrameInd: any;
  isDataFrameInd: boolean = false;

  /**Market totals */
  secMarkTotal: number;
  indMarkTotal: number;

  /**Last close's market data */
  mostRecentDate: string = "";
  open: string = '';
  high: string = '';
  low: string = '';
  close: string = '';
  volume: string = '';


  /**Classification data */
  classificationData: any[] = [];
  companyDescription: string;

  constructor(private route: ActivatedRoute, private _companyInfoService: CompanyInfoService) { }

  ngOnInit() {
    this.symbol = this.route.snapshot.paramMap.get("symbol");

    //get market data for specific date range (open, close, high, low, volume)
    this._companyInfoService.getDataRange(this.symbol, "01-01-94", this.currentDate()).subscribe(
      (data: any[]) => {
        this.companyData = data;

        //get last close's market data
        this.mostRecentDate = this.companyData[0].Date;
        this.open = this.companyData[0].Open;
        this.high = this.companyData[0].High;
        this.low = this.companyData[0].Low;
        this.close = this.companyData[0].Close;
        this.volume = this.companyData[0].Volume;
      });

    //get name, market cap, ipo year, sector number, and industry number for a specific compamny
    this._companyInfoService.getSingleComapanyGenInfo(this.symbol).subscribe(
      (data: any) => {
        this.singleCompany = data;
        this.name = this.singleCompany.name;
        this.marketCap = this.singleCompany.market_cap;
        this.ipoYear = this.singleCompany.ipo_year;
        this.sector = this.singleCompany.sector;
        this.industry = this.singleCompany.industry;


        this.checkEmpty();

      });


    this._companyInfoService.getDescriptions(this.symbol.toUpperCase()).subscribe(
      (data: any) => {
        // console.log("Data is " + data[0]);
        this.companyDescription = data[0];
        if ((this.companyDescription.indexOf('"') == 0)) {
          // if ((this.companyDescription.indexOf('"') == 0) && (this.companyDescription.indexOf('"') == (this.companyDescription.length-1))) {
            this.companyDescription = this.companyDescription.substring(1, (this.companyDescription.length - 1));
          // this.companyDescription = this.companyDescription.substring(1, this.companyDescription.length);
        }
        //   this.companyDescription = this.companyDescription.substring(1, this.companyDescription.length);
        // this.companyDescription = this.companyDescription.substr(1);
        // this.companyDescription = this.companyDescription.substr(-1);

        // console.log("company description is " + this.companyDescription);
      });

    //get ml dataframe info. (ticker, name, description, industry, sector)
    this._companyInfoService.getCompanyClassifications().subscribe(
      (data: any) => {
        this.classificationData = data;

        //scan for company description, and sector/industry number
        for (let company of this.classificationData) {
          if (company.Ticker == this.symbol) {
            // this.companyDescription = company.Description;

            //Gets rid of quote at the begining
            // if (this.companyDescription.indexOf('"') == 0) {
            //   this.companyDescription = this.companyDescription.substring(1, this.companyDescription.length);
            // }

            this.dataFrameSec = company.Sector;
            this.dataFrameInd = company.Industry;
          }
        }

        let trimmedSecTot = this.dataFrameSec.replace(/\s/g, "");
        let trimmedIndTot = this.dataFrameInd.replace(/\s/g, "");

        //get sector market total
        this._companyInfoService.getMarketTotals("sector", trimmedSecTot).subscribe(
          (data: any) => {
            this.secMarkTotal = data;
          });

        //get industry market total  
        this._companyInfoService.getMarketTotals("industry", trimmedIndTot).subscribe(
          (data: any) => {
            this.indMarkTotal = data;
          });




      });

  }

  checkEmpty() {
    //if ipo year is -1, swap with "not available" string
    if (this.ipoYear < 0) {
      this.notAvailable = true;
    }
    if (this.industry == "n/a") {
      this.isIndustry = true;
      this.industry = "Not available";
    }
    if (this.sector == "n/a") {
      this.isSector = true;
      this.sector = "Not available";
    }
    if (this.marketCap == null) {
      this.isMarketCap = true;
      this.marketCap = "Not available";
    }
  }

  //Gets current date to be used to fetch yesterdays 
  //Open, close, high, low, and volume
  currentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let todayDate = mm + '-' + dd + '-' + yyyy;
    return todayDate;
  }

}
