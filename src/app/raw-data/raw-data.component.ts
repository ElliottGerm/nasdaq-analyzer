import { Component, OnInit } from '@angular/core';
import { CompanyInfoService } from '../company-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raw-data',
  templateUrl: './raw-data.component.html',
  styleUrls: ['./raw-data.component.scss']
})
export class RawDataComponent implements OnInit {

  showSpinner: boolean = true;//for loading graphic
  public allCompaniesInfo: any[] = [];//list of all companies

  constructor(private _companyInfoService: CompanyInfoService, private router: Router) {
  }

  ngOnInit() {
    this._companyInfoService.getCompanyInfo().subscribe(
      (data: any[]) => {
        this.allCompaniesInfo = data;
        this.showSpinner = false;
      }
    );
  }

  go2Top() {
    scroll(0, 0);
  }

  /*For routing to 10-year historical data page*/
  go210Year(i) {
    let symbol = JSON.stringify(i.symbol);
    symbol = symbol.substring(1, symbol.length - 1);
    this.router.navigate(["/raw-data", symbol]);
  }

}
