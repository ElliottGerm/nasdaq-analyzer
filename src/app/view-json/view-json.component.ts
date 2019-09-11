import { Component, OnInit } from '@angular/core';
import { CompanyInfoService } from '../company-info.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-json',
  templateUrl: './view-json.component.html',
  styleUrls: ['./view-json.component.scss']
})
export class ViewJsonComponent implements OnInit {

  showSpinner: boolean = true;      //for loading graphic
  public companyInfo: any[] = [];   //list of all info for single company             
  public symbol: any;               //company ticker for url

  constructor(private _companyInfoService: CompanyInfoService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.symbol = this.route.snapshot.paramMap.get("symbol");

    this._companyInfoService.get10YearCompanyData(this.symbol).subscribe(
      (data: any[]) => {
        this.companyInfo = data;

        this.showSpinner = false;
      }
    );

  }

}
