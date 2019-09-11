import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyInfoService } from '../company-info.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  oneSearch: boolean = false;
  validSearch: boolean = true;
  oldSearch: string = "";
  newSearch: string = "";
  searchResults: any[] = [];//stores the objects based off the search query
  allCompaniesInfo: any[] = [];//stores all the companies
  url: string = "";

  constructor(private router: Router, private _companyInfoService: CompanyInfoService) { }

  ngOnInit() {

    this.validSearch = true;
    this.url = this.router.url.substring(8);
    this.url = this.url.replace(/%20/g, " ");
    this._companyInfoService.getCompanyInfo().subscribe(
      (data: any[]) => {

        this.allCompaniesInfo = data;
        if (this.URL2String(this.url)) {//take out the slash (/)
          return;
        }
        this.runSearch();
        if (this.oneSearch){
          //create single company analysis component
          this.router.navigate(["/analysis", this.searchResults[0].symbol]);//add the encoded JSON array to the URL
        }
      }
    );
  }


  URL2String(url: string): boolean {
    this.newSearch = url;
    if (this.oldSearch.toUpperCase() === this.newSearch.toUpperCase()) {
      window.location.reload();
      return false;
    }
    this.oldSearch = this.newSearch;
    return false;
  }

  runSearch() {
    this.searchResults = [];
    for (let i = 0; i < this.allCompaniesInfo.length; i++) {
      if (this.checkSubString(this.newSearch, this.allCompaniesInfo[i].name)) {
        this.searchResults.push(this.allCompaniesInfo[i]);
      }
      else if (this.checkSubString(this.newSearch, this.allCompaniesInfo[i].symbol)) {
        this.searchResults.push(this.allCompaniesInfo[i]);
      }
    }
    if (this.searchResults.length === 0) {
      this.validSearch = false;
    }
    else if (this.searchResults.length === 1){
      this.oneSearch = true;
    }
  }

  checkSubString(sub: string, main: string): boolean {
    if (sub.length > main.length) {
      return false;
    }
    let subSize = sub.length;
    for (let i = 0; i < ((main.length - subSize) + 1); i++) {
      let subMain = main.slice(i, (i + subSize));
      if (sub.toUpperCase() === subMain.toUpperCase()) {
        this.validSearch = true;
        return true;
      }
    }
    return false;
  }

  /*Routes to 10-year historical data page*/
  go210Year(i) {
    let symbol = JSON.stringify(i.symbol);
    symbol = symbol.substring(1, symbol.length - 1);
    this.router.navigate(["/raw-data", symbol]);
  }

  /*Routes to home view aka analysis view*/
  goToAnalysisView(symbol) {
    let parameter = "/analysis/" + symbol;
    this.router.navigate([parameter]);
  }

}
