import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CompanyInfoService } from '../company-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {

  @Input() selectedSector;

  weightsInfo: any[] = [];
  words: any[] = [];
  weights: any[] = [];
  clickedSector: string = "";
  companyData: any[] = [];
  clickedCompanies: any[] = [];

  constructor(private _companyInfoService: CompanyInfoService, private router: Router) { }

  ngOnInit() {
    // this._companyInfoService.getWeights().subscribe(
    //   (data: any[]) => {
    //     this.weightsInfo = data;
    //   }
    // );

    // for(let info of this.weightsInfo){
    //   for(let i = 0; i < info.weights.length; i++){
    //     this.weights[i] = info.weights;
    //     this.words[i] = info.words;
    //   }
    // }
  }

  onNotifyClicked(message: string) {
    this.clickedSector = message;
    this._companyInfoService.getCompanyClassifications().subscribe(
      (data: any[]) => {
        this.companyData = data;
        this.getClickedCompanies();
      }
    );
  }

  getClickedCompanies() {
    this.clickedCompanies = [];
    for (let i = 0; i < this.companyData.length; i++) {
      if (this.companyData[i].Sector === this.clickedSector) {
        this.clickedCompanies.push(this.companyData[i]);
      }
    }
  }

  companyClicked (selectedCompany) {
    this.router.navigate(["/analysis", selectedCompany.Ticker]);
  }

}
