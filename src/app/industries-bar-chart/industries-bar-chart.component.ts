import { Component, OnInit } from '@angular/core';
import { CompanyInfoService } from '../company-info.service';
import { Chart } from 'chart.js';
import { of } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-industries-bar-chart',
  templateUrl: './industries-bar-chart.component.html',
  styleUrls: ['./industries-bar-chart.component.css']
})
export class IndustriesBarChartComponent implements OnInit {

  chart: any;//industries chart
  public companyInfo: any[] = [];//list of company classifications and descriptions
  companiesPerIndustry: number[] = new Array(100);
  industryLabels: string[] = [];
  barBackgroundColors: string[] = new Array(100);

  colorSectors: string[] = ["rgb(235,9,62, .7)",
    "rgb(214,0,99, .7)",
    "rgb(179,22,126, .7)",
    "rgb(133,49,142, .7)",
    "rgb(80,61,143, .7)",
    "rgb(0,63,130, .7)",
    "rgb(65,120,250, .7)",
    "rgb(0,155,244, .7)",
    "rgb(0,167,164, .7)",
    "rgb(40,167,69, .7)"];

  borderColorSectors: string[] = ["rgb(235,9,62, 1)",
    "rgb(214,0,99, 1)",
    "rgb(179,22,126, 1)",
    "rgb(133,49,142, 1)",
    "rgb(80,61,143, 1)",
    "rgb(0,63,130, 1)",
    "rgb(65,120,250, 1)",
    "rgb(0,155,244, 1)",
    "rgb(0,167,164, 1)",
    "rgb(40,167,69, 1)"];

  backgroundColors = [];
  borderColors = [];
  industryMap = new Map();//used for chart values
  sectorMap = new Map();//used for color matching set up
  industryCompanyMap = new Map();
  sectorIndustryMap = new Map();
  sector2Industry = [[], [], [], [], [], [], [], [], [], []];//2d array with 10 inner arrays

  constructor(private _companyInfoService: CompanyInfoService) { }

  ngOnInit() {

    this._companyInfoService.getCompanyClassifications().subscribe(
      (data: any[]) => {
        this.companyInfo = data;

        this.companySortByIndustry();//get number of companies per sector
        this.generateIndustryLabels();

        // this.mapSectors();

        // this.array2Map();
        // this.setColors();
        let count = 0;
        for(let i = 0; i < 100; i++){
          
            this.backgroundColors[i] = this.colorSectors[count];
            this.borderColors[i] = this.borderColorSectors[count];
            count++
          if(count > 9){
            count = 0;
          }
            
          
        }


        /*generates bar chart: Number of companies per sector*/
        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: this.industryLabels,
            datasets:
              [{
                label: 'Companies per Industry',
                data: this.companiesPerIndustry,
                backgroundColor: this.backgroundColors,
                borderColor: this.borderColors,
                borderWidth: 1,
              }]
          },
          options: {
            tooltips: {
              enabled: true,
              mode: 'single',
              callbacks: {
                title: function (tooltipItems, data) {
                  return data["labels"][tooltipItems[0]["index"]];
                }
              }
            },
            title: {
              display: true,
              text: 'Companies per Industry',
              fontSize: 25,
              fontColor: '#7D7C82'
            },
            legend: {
              display: false
            },
            layout: {
              padding: {
                left: 50,
                right: 0,
                top: 0,
                bottom: 10
              }
            },
            scales: {
              yAxes: [{
                gridLines: {
                  color: "#7D7C82"
                },
                ticks: {
                  beginAtZero: true,
                  fontSize: 14,
                  fontColor: '#7D7C82'
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Companies',
                  fontSize: 22,
                  fontColor: '#7D7C82'
                }
              }],
              xAxes: [{
                gridLines: {
                  color: "#7D7C82"
                },
                ticks: {
                  fontColor: '#7D7C82'
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Industries',
                  fontSize: 22,
                  fontColor: '#7D7C82'
                }
              }]
            },
            animation: {
              duration: 2000,
              easing: 'linear'
            },
            responsive: true,
            maintainAspectRatio: false
          }
        })
      }
    );
  }

  /*Gets the number of companies per industry and stores
  the results in an array to be used in the bar graph*/
  companySortByIndustry() {
    for (let i = 0; i < this.companyInfo.length; i++) {

      //ignore nameless industries
      if (this.companyInfo[i].Industry.length > 2) {
        if (!this.industryMap.has(this.companyInfo[i].Industry)) {
          this.industryMap.set(this.companyInfo[i].Industry, { val: 1 });
        } else {
          this.industryMap.get(this.companyInfo[i].Industry).val++
        }
      }
    }
  }

  mapSectors() {
    var sectorNum = 0;
    for (let i = 0; i < this.companyInfo.length; i++) {

      if (this.companyInfo[i].Sector.length > 2) {//ignore nameless sectors
        if (!this.sectorMap.has(this.companyInfo[i].Sector)) {
          this.sectorMap.set(this.companyInfo[i].Sector, sectorNum);
          sectorNum++;
        }
      }
    }
  }

  /*Generates unique label names for each Industry*/
  generateIndustryLabels() {

    let arr: any[] = Array.from(this.industryMap.keys());//places the keys into array
    this.industryLabels = arr.sort(); //xAxis labels for chart

    //stores the number of companies per industry in each 
    //index of the array to be used for bar chart
    for (let i = 0; i < this.industryMap.size; i++) {
      this.companiesPerIndustry[i] = this.industryMap.get(this.industryLabels[i]).val
    }

  }


  setColors() {
    let match: number = 7;//stores the sector number that matches the industry
    let hit: boolean = false;
    // for (let j = 0; j < this.companiesPerIndustry.length; j++) {//j is the industry
    for (let j = 0; j < this.industryMap.size; j++) {
      //for (let i = 0; i < this.sectorIndustryMap.size; i++) {//i is the sector
        //console.log(this.sectorIndustryMap.get(0).length)
        this.sectorIndustryMap.forEach((listOfInd: number, secNum: string) => {

        
        for (let k = 0; k < (this.sectorIndustryMap.get(secNum)).length; k++) {//loop through for as many industries in a sector

          this.industryMap.forEach((numCompanies: number, indName: string) => {
            if (indName == this.sectorIndustryMap.get(secNum)[k]) {
              match = +secNum;
              k = 999;
              hit = true;
            }
          });

          // if (this.industryMap) {
          // // if (j == (this.sectorIndustryMap.get(i)[k])) {
          //   match = i;
          //   k = 999;
          //   hit = true;
          // }
        }
        if (hit) {
          //i = 9999;//match found, exit loop
          
          hit = false;
        }
      });
      //}
      this.backgroundColors.push(this.colorSectors[match]);
      this.borderColorSectors.push(this.barBackgroundColors[match]);
    }
    console.table("TCL: IndustriesBarChartComponent -> setColors -> this.backgroundColors", this.backgroundColors)
    console.log("TCL: IndustriesBarChartComponent -> setColors -> this.borderColorSectors", this.borderColorSectors.length)

  }


  industriesInSectors() {
    //let arr: any[] = Array.from(this.industryCompanyMap.keys());//places the keys into array

    for (let element of this.industryMap) {
      for (let j = 0; j < this.companyInfo.length; j++) {
        if (element[0] == this.companyInfo[j].Industry) {// if the key of indusrtyMap matches the Industry from companyInfo
        // console.log("TCL: IndustriesBarChartComponent -> industriesInSectors -> element[0]", element[0])


          this.sectorMap.forEach((sectorNum: number, sectorName: string) => {
            if (sectorName == this.companyInfo[j]) {
              this.sector2Industry[sectorNum].push(this.companyInfo[j].Industry);
            }
          });
          //this.sector2Industry[this.companyInfo[j].Sector].push(this.companyInfo[j].Industry);
          j = 9999;//exits inner loop
        }
      }
    }
    for (let i = 0; i < 10; i++) {
      this.sectorIndustryMap.set(i, this.sector2Industry[i]);//VIP
    }

  }


  array2Map() {
    for (let i = 0; i < this.companiesPerIndustry.length; i++) {
      this.industryCompanyMap.set(i, this.companiesPerIndustry[i]);
    }

    this.industriesInSectors();

  }


}
