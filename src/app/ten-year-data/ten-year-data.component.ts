import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInfoService } from '../company-info.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-ten-year-data',
  templateUrl: './ten-year-data.component.html',
  styleUrls: ['./ten-year-data.component.scss']
})
export class TenYearDataComponent implements OnInit { //, AfterViewInit {

  @ViewChild('noRecord', { static: false }) noRecordElement: ElementRef; //FIXME: do we need this here?????

  /*Used for infinite scrolling*/
  currentLength = 50;
  newLength = 0;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  infoExists: boolean = true;       //checks if the company has 10-year data
  showSpinner: boolean = true;      //for loading graphic
  public companyInfo: any[] = [];   //list of all info for single company             
  public scrollCompany: any[] = []; //view of single company info that user sees
  public symbol: any;               //company ticker for url
  downloadJsonHref: SafeUrl;        //for json download

  constructor(private _companyInfoService: CompanyInfoService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) { }

  ngOnInit() {

    let companySymbol = this.route.snapshot.paramMap.get("symbol");
    this.symbol = companySymbol;

    this._companyInfoService.get10YearCompanyData(this.symbol).subscribe(
      (data: any[]) => {

        //FIXME: DO we need this????
        if (data.length === 0) {
          this.showSpinner = false;
          this.infoExists = false;
          return;
        }

        this.companyInfo = data;
        this.downloadJson(this.companyInfo);//download json

        //Load more company data to view
        this.scrollCompany = this.companyInfo.slice(0, this.currentLength);
        this.showSpinner = false;
      }
    );

  }

  appendItems(addNItems: number) {
    this.newLength = this.currentLength + addNItems;
    let newElements = this.companyInfo.slice(this.currentLength, this.newLength);
    this.currentLength = this.newLength;
    this.scrollCompany = this.scrollCompany.concat(newElements);
  }

  onScrollDown(ev) {
    this.appendItems(100);
  }

  go2Top() {
    scroll(0, 0);
  }

  /**routes to the analysis/profile view
   *  of a specific company's data*/
  viewProfile(symbol: string) {
    this.router.navigate(["/analysis/", symbol]);
  }

  /**routes to a view showing the raw json 
   * object of a specific company's data*/
  viewJson(symbol: string) {
    this.router.navigate(["/jsonView", symbol]);
  }

  /**converst company data array to Json 
   * then coverts the json to blob type 
   * so it can be downloaded */
  downloadJson(companyData: any[]) {
    var theJSON = JSON.stringify(companyData);            //JOSN conversion
    let blob = new Blob([theJSON], { type: 'text/json' });//json too big, must be converted to blob
    let url = window.URL.createObjectURL(blob);
    let uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    this.downloadJsonHref = uri;                          //html tag indentifier
  }

}
