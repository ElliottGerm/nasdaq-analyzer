import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompanyInfoService } from '../company-info.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-sectors-bar-chart',
  templateUrl: './sectors-bar-chart.component.html',
  styleUrls: ['./sectors-bar-chart.component.css']
})
export class SectorsBarChartComponent implements OnInit {

  @Output() notify:EventEmitter<string> = new EventEmitter<string>();

  barChart: any;//sectors bar chart
  pieChart: any;//sectors pie chart

  public companyInfo: any[] = [];//list of company classifications and descriptions
  sector2CompanyMap = new Map();
  companiesPerSector: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//holds the number of companies per sector
  toggleBar: boolean = false;//display bar chart by default
  togglePie: boolean = true;
  numCompanies: number;
  selectedSector: any = "empty";
  labelSectors: string[] = [];

  // colorSectors: string[] = ["rgb(4,30,66, .8)", "rgb(157,34,53, .8)", "rgb(139,111,78, .8)", "rgb(85,37,131, .8)", "rgb(253,185,39, .8)",
  //   "rgb(0,122,193, .8)", "rgb(239,59,36, .8)", "rgb(0,71,27, .8)", "rgb(65,182,230, .8)", "rgb(219,62,177, .8)"];
  // borderColorSectors: string[] = ["rgb(4,30,66, 1)", "rgb(157,34,53, 1)", "rgb(139,111,78, 1)", "rgb(85,37,131, 1)", "rgb(253,185,39, 1)",
  //   "rgb(0,122,193, 1)", "rgb(239,59,36, 1)", "rgb(0,71,27, 1)", "rgb(65,182,230, 1)", "rgb(219,62,177, 1)"];

  // colorSectors: string[] = ["#28a745", "#00986f", "#003f82", "#007bff", "#8c4fb8",
  //   "#963582", "#1f0c96", "#00d17e", "#eb093e", "#b3167e"];

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

  // dummy: any[] = [];

  constructor(private _companyInfoService: CompanyInfoService) { }

  ngOnInit() {
    // this.companyInfo = this._companyInfoService.getCompanyClassifications().subscribe(
    // //(data: any[]) => {
    // //this.companyInfo = data;
    // this.numCompanies = this.companyInfo.length;

    // this.companyInfo = this._companyInfoService.HARDCODE_DATAFRAME();

    this._companyInfoService.getCompanyClassifications().subscribe(
      (data: any[]) => {
        this.companyInfo = data;
        this.numCompanies = this.companyInfo.length;
        this.companySortbySector();//get number of companies per sector
        this.createChart();        //creates bar chart and pie chart
      });


  }

  /** Gets the number of companies per sector and stores
  the results in an array to be used in the bar graph */
  companySortbySector() {
    let emptySector = 0;
    for (let i = 0; i < this.companyInfo.length; i++) {
      if (this.companyInfo[i].Sector === "") {
        emptySector++;
      }
      else if (this.sector2CompanyMap.has(this.companyInfo[i].Sector) === false) {
        this.sector2CompanyMap.set(this.companyInfo[i].Sector, 1);
      }
      else {
        this.sector2CompanyMap.set(this.companyInfo[i].Sector, (this.sector2CompanyMap.get(this.companyInfo[i].Sector) + 1));
      }
    }
    this.sector2CompanyMap.set("ETF or Other", (this.sector2CompanyMap.get("ETF or Other") + emptySector));
    let i = 0;
    for (let [key, value] of this.sector2CompanyMap) {
      this.labelSectors[i] = key;
      this.companiesPerSector[i] = value;
      i++;
    }

  }

  getItem(selected) {
    console.log("Selected is in getItem() " + selected);
    console.log("SelectedII getItem() " + this.selectedSector);
    this.selectedSector = selected;
    // this.dummy.push(selected);
    console.log("SelectedIII getItem() " + this.selectedSector);
  }

  /**Changes the type of chart on click event */
  toggleChart(changeChart: number) {
    // this.selectedSector = ["asdf"];

    if (changeChart == 1) {
      this.togglePie = true;
      this.toggleBar = false;
    }
    if (changeChart == 2) {
      this.togglePie = false;
      this.toggleBar = true;
    }

  }

  /**Generates bar and pie charts */
  createChart() {

    let numCompanies = this.companyInfo.length;

    var _that = this;

    /*generates bar chart: Number of companies per sector*/
    this.barChart = new Chart('canvas1', {
      type: 'bar',
      data: {
        labels: this.labelSectors,
        datasets: [{
          label: 'Companies per Sector',
          data: this.companiesPerSector,
          backgroundColor: this.colorSectors,
          borderColor: this.borderColorSectors,
          borderWidth: 2
        }]
      },
      options: {
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function (tooltipItems, data) {

              let companyPerSector: any = data['datasets'][0]['data'][tooltipItems['index']];

              _that.selectedSector = data['labels'][tooltipItems['index']];
              _that.selectedSector = data['labels'][tooltipItems['index']];
              _that.selectedSector = data['labels'][tooltipItems['index']];
              _that.selectedSector = data['labels'][tooltipItems['index']];


              let label = [(companyPerSector + " Companies")];




              // label.push(((companyPerSector / numCompanies) * 100).toFixed(2) + '%');

              // _that.selectedSector = data['labels'][tooltipItems['index']];
              // _that.selectedSector = data['labels'][tooltipItems['index']];


              // this._companyInfoService.setSelectedSector(data['labels'][tooltipItems['index']]);
              // this._companyInfoService.setSelectedSector(data['labels'][tooltipItems['index']]);
              // this._companyInfoService.setSelectedSector(data['labels'][tooltipItems['index']]);
              // this._companyInfoService.setSelectedSector(data['labels'][tooltipItems['index']]);
              //this._companyInfoService


              return label;
            }
            // title: function (tooltipItems, data) {
            //   return "Title: " + data['labels'];
            // }
          }
        },
        title: {
          display: true,
          text: 'Companies per Sector',
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
            bottom: 0
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
              fontSize: 17,
              fontColor: '#7D7C82'
            },
            display: true,
            scaleLabel: {
              display: false,
              labelString: 'Sectors',
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
      },
    });

    // function getItem(selected) {
    //   console.log("Selected is in getItem() " + selected);
    //   console.log("SelectedII getItem() " + this.selectedSector);
    //   this.selectedSector = selected;
    //   console.log("SelectedIII getItem() " + this.selectedSector);
    // }
    // let asdf: any;




    this.pieChart = new Chart('canvas2', {
      type: 'pie',
      data: {
        labels: this.labelSectors,
        datasets: [{
          label: 'Companies per Sector',
          data: this.companiesPerSector,
          backgroundColor: this.colorSectors,
          borderColor: this.borderColorSectors,
          borderWidth: 2
        }]
      },
      options: {
        tooltips: {
          displayColors: false,
          callbacks: {
            label: function (tooltipItems, data) {

              let companyPerSector: any = data['datasets'][0]['data'][tooltipItems['index']];

              _that.selectedSector = data['labels'][tooltipItems['index']];
              _that.selectedSector = data['labels'][tooltipItems['index']];
              _that.selectedSector = data['labels'][tooltipItems['index']];
              _that.selectedSector = data['labels'][tooltipItems['index']];


              let label = [(data['labels'][tooltipItems['index']] + ": " + companyPerSector + " Companies")];




              label.push(((companyPerSector / numCompanies) * 100).toFixed(2) + '%');

              _that.selectedSector = data['labels'][tooltipItems['index']];
              _that.selectedSector = data['labels'][tooltipItems['index']];


              return label;
            }
          }
        },
        title: {
          display: true,
          text: 'Companies per Sector',
          fontSize: 25,
          fontColor: '#7D7C82'
        },
        legend: {
          display: true,
          position: 'bottom',
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                return '';
              },
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                return '';
              },
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          }],
        },
        animation: {
          duration: 1500,
          easing: 'linear'
        },
        responsive: true,
        maintainAspectRatio: false
      },
    })
    // this.selectedSector = asdf;

    // console.log("selectedSector is " + this.selectedSector);
  }

  pieClick() {
    this.notify.emit(this.selectedSector);
    // this._companyInfoService.setSelectedSector(this.selectedSector);
  }

  barClick() {
    this.notify.emit(this.selectedSector);
    // this._companyInfoService.setSelectedSector(this.selectedSector);
  }




  // barHoverEvent(e) {
  //   console.log("selectedSector inside Hover is " + this.selectedSector);
  //   this.selectedSector = ["CHANGED"];
  //   console.log("selectedSector inside Hover is " + this.selectedSector);
  // }

  mouseEnter(div: string) {
    // this.selectedSector = "Inside";
    // console.log("selectedSector inside moueseEnter is " + this.selectedSector);
    // console.log("dummy is " + this.dummy);
    // console.log("mouse enter : " + div);
  }

  mouseLeave(div: string) {
    // this.selectedSector = "Outside";
    // this.selectedSector = this.selectedSector;
    console.log("selectedSector inside moueseLeave is " + this.selectedSector);
    // console.log("dummy is " + this.dummy);

  }
  // getHoveredSector (){

  // }


}
