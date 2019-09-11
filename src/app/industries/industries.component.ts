import { Component, OnInit } from '@angular/core';
import { CompanyInfoService } from '../company-info.service';
import { Router } from '@angular/router';


// interface industriesJSON {
//   // sector: string,
//   industry: string,
//   companies: any[],
// }

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.css']
})
export class IndustriesComponent implements OnInit {



  companyInfo: any[] = [];  //holds the data coming from the service
  // classificationData: any[] = [];  //holds the data coming from the service
  // twoDArray = [];                  //each index holds an array of companies
  // companyInIndustry: string[] = [];//ticker strings of companies in an industry
  industryCompanyMap = new Map();
  companiesInIndustries: any[] = [];
  // jsonMap: industriesJSON[] = [];
  industryLabels: any[] = [];
  // giantArray: any[] = [];


  constructor(private _companyInfoService: CompanyInfoService, private router: Router) { }

  ngOnInit() {

    this._companyInfoService.getCompanyClassifications().subscribe(
      (data: any[]) => {
        this.companyInfo = data;
        // this.companiesPerIndustry.fill(0);//initializes all indicies to 0;
        this.setMap();
        // this.companiesInIndustry();//get number of companies per industry
        // this.array2Map();
        // this.map2JSON();
      });

    //get ml dataframe info. (ticker, name, description, industry, sector)
    // this._companyInfoService.getCompanyClassifications().subscribe(
    //   (data: any[]) => {
    // this.classificationData = this._companyInfoService.HARDCODE_DATAFRAME();
    // //this.classificationData = data;

    // //format company names and tickers
    // for (let i = 0; i < this.classificationData.length; i++) {
    //   this.companyInIndustry[this.classificationData[i].Industry] += "-"
    //     + this.classificationData[i].Name + " (" + this.classificationData[i].Ticker + ")";
    // }


    // for (let i = 0; i < this.companyInIndustry.length; i++) {
    //   let subStr = this.companyInIndustry[i].split("-");
    //   this.twoDArray.push(subStr);
    //   this.twoDArray[i].shift();//remove undefined
    // }

    // });

  }

  setMap() {
    for (let i = 0; i < this.companyInfo.length; i++) {
      if (this.industryCompanyMap.has(this.companyInfo[i].Industry) === false) {
        this.industryCompanyMap.set(this.companyInfo[i].Industry, [(this.companyInfo[i])]);
        // console.log(this.industryCompanyMap);
      }
      else {
        // console.log(this.industryCompanyMap);
        // console.log("key is " + this.companyInfo[i].Industry);
        let arr = this.industryCompanyMap.get(this.companyInfo[i].Industry);
        arr.push(this.companyInfo[i]);
        // console.log("arr is " + arr);
        // console.log("arr's length is " + arr.length);
        //.push(this.companyInfo[i]);
        // console.log("Object's info is " + this.companyInfo[i].Ticker," -",this.companyInfo[i].Name," -",this.companyInfo[i].Sector," -",this.companyInfo[i].Industry," -",this.companyInfo[i].Description);
        // this.industryCompanyMap.set(this.companyInfo[i].Industry, arr.push(this.companyInfo[i]));
        this.industryCompanyMap.set(this.companyInfo[i].Industry, arr);
        // console.log("arr's length now is " + arr.length);
      }
    }



    // for (var key in this.industryCompanyMap) {
    //   this.industryLabels.push(key);
    //   this.companiesInIndustries.push(this.industryCompanyMap[key]);
    // }

    // let myHash = this.industryCompanyMap;

    // this.industryLabels = Object.keys(myHash);

    for (let [key, value] of this.industryCompanyMap) {
      this.industryLabels.push(key);
      this.companiesInIndustries.push(value);
    }

    // this.companiesInIndustries = this.industryCompanyMap.values();
    // this.companiesInIndustries.toArray();

    // console.log("this.companiesInIndustries  " + this.companiesInIndustries[0].length);


    // alert(array_keys);
    // alert(array_values);
    // // this.industryLabels = Array.from(this.industryCompanyMap.keys());
    // this.industryLabels = [...this.industryCompanyMap.keys()];
    // this.industryLabels.map(String);


  }

  // map2JSON() {
  //   //go through sectors map and iterate through each industry then fill object
  //   //Ex: this.jsonMap[0].sector = 5;
  //   // this.jsonMap
  //   // let counter = 0;
  //   // let i = 0;
  //   for (let i = 0; i < this.companyInfo.length; i++) {
  //     // for (let i = 0; i < this.industryCompanyMap.size; i++) {
  //     this.jsonMap[i] = {
  //       // sector: i,
  //       // industry: this.sectorIndustryMap.get(i)[j],
  //       // sector: value[1],
  //       industry: key,
  //       companies: value[0]
  //     };
  //     i++;
  //   }

  // }


  goToProfile(elementSelected) {
    //gets the string between the parentheses
    // console.log("elementSelected is ", elementSelected);
    console.log("elementSelected's Ticker is ", elementSelected.Ticker);
    // let regExp = /\(([^)]+)\)/;
    // let matches = regExp.exec(elementSelected.Ticker);
    this.router.navigate(["/analysis", elementSelected.Ticker]);
  }

}
