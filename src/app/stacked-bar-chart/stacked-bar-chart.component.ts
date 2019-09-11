import { Component, OnInit } from '@angular/core';
import { CompanyInfoService } from '../company-info.service';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.css']
})


export class StackedBarChartComponent implements OnInit {

  chart: any;//industries chart
  public companyInfo: any[] = [];//list of company classifications and descriptions
  companiesPerIndustry: number[] = new Array(100);
  industryCompanyMap = new Map();
  sectorIndustryMap = new Map();
  sector2Industry = [[], [], [], [], [], [], [], [], [], []];//2d array with 10 inner arrays
  datasetsArray: any[] = [];//holds the JSON objects in this format
  data4Chart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  colorCombo: string[] = ["rgb(0,63,130, .7)", "rgb(235,9,62, 1)", "orange"];
  // colorCombo: string[] = ["rgb(80,61,143, 1)", "rgb(0,155,244, 1)", "rgb(40,167,69, 1)"];
  // 

  constructor(private _companyInfoService: CompanyInfoService) { }

  ngOnInit() {
    this.companyInfo = this._companyInfoService.HARDCODE_DATAFRAME();
    //getCompanyClassifications().subscribe(
    //(data: any[]) => {
    //this.companyInfo = data;

    // this._companyInfoService.getCompanyClassifications().subscribe(
    //   (data: any[]) => {
    //     this.companyInfo = data;
    this.companiesPerIndustry.fill(0);//initializes all indicies to 0;
    this.companiesInIndustry();//get number of companies per sector
    // this.generateIndustryLabels();
    // this.generateBackgroundColors();
    this.array2Map();
    // });


    this.chart = new Chart('canvas3', {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], // responsible for how many bars are gonna show on the chart
        datasets: this.getDataSet()
      },
      options: {
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function (tooltipItems, data) {
              return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.yLabel + ' Companies';
            },
            title: function (tooltipItems, data) {
              return "Sector " + data["labels"][tooltipItems[0]["index"]];
            }
          }
        },
        title: {
          display: true,
          text: 'Companies per Industry in a Sector',
          fontSize: 25,
          fontColor: '#7D7C82'
        },
        responsive: true,
        legend: {
          display: false,
          position: 'right' // place legend on the right side of chart
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: "#7D7C82"
            },
            ticks: {
              fontSize: 17,
              fontColor: '#7D7C82'
            },
            type: 'category',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Sectors',
              fontSize: 22,
              fontColor: '#7D7C82'
            },
            stacked: true // this should be set to make the bars stacked
          }],
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
            },
            stacked: true // this also..
          }]
        }
      }
    });

  }

  getDataSet() {
    let p = 0;//index for colorCombo
    for (let i = 0; i < this.data4Chart.length; i++) {

      let dataEntry = this.data4Chart.slice();

      for (let j = 0; j < this.sectorIndustryMap.get(i).length; j++) {

        dataEntry = this.data4Chart.slice();
        dataEntry[i] = this.industryCompanyMap.get(this.sectorIndustryMap.get(i)[j]);

        if (p === this.colorCombo.length) {
          p = 0;
        }

        this.datasetsArray.push({
          label: "Industry " + (this.sectorIndustryMap.get(i)[j] + 1),
          data: dataEntry,
          backgroundColor: this.colorCombo[p]
        });
        p++;
      }
    }
    return this.datasetsArray;
  }

  //Gets the number of companies per industry and stores
  companiesInIndustry() {
    for (let i = 0; i < this.companyInfo.length; i++) {
      this.companiesPerIndustry[+this.companyInfo[i].Industry]++;
    }
  }


  industriesInSectors() {
    let arr: any[] = Array.from(this.industryCompanyMap.keys());//places the keys into array
    for (let element of this.industryCompanyMap) {
      for (let j = 0; j < this.companyInfo.length; j++) {
        if (element[0] == this.companyInfo[j].Industry) {//element[0] gets the key from the map type
          this.sector2Industry[this.companyInfo[j].Sector].push(this.companyInfo[j].Industry);
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
