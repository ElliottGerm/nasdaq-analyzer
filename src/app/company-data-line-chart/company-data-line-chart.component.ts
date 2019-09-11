import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyInfoService } from '../company-info.service';
import * as $ from 'jquery';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-company-data-line-chart',
  templateUrl: './company-data-line-chart.component.html',
  styleUrls: ['./company-data-line-chart.component.css']
})
export class CompanyDataLineChartComponent implements OnInit {

  symbol: string = "";
  companyData: any[] = [];//stores all the company's data
  companyStartDate: string = "";
  startInputDate: string = "2019-06-01";
  endInputDate: string = "2019-07-01";
  reformatStartInputDate: string = "";
  reformatEndInputDate: string = "";
  public lineChart: Chart;

  /**arrays used for lines on the line chart */
  companyDataOneYearOpen: number[] = [];
  companyDataOneYearHigh: number[] = [];
  companyDataOneYearLow: number[] = [];
  companyDataOneYearClose: number[] = [];

  //date labels for xAxis ticks
  stringLabel: string[] = [];

  constructor(private router: Router, private _companyInfoService: CompanyInfoService) { }

  ngOnInit() {
    this.symbol = this.router.url.substring(10);
    this.symbol = this.symbol.replace(/%20/g, " ");

    /**HARD CODE SERVICE FOR TESTING */
    // this.companyData = this._companyInfoService.HARDCODE_COMPANY_DATA();
    // this.checkYears();
    // this.companyData = this.companyData.reverse();
    // this.setCompanyData();
    // this.updateChartData();
    /**HARD CODE SERVICE FOR TESTING */

    //MM-DD-YY format
    this._companyInfoService.getDataRange(this.symbol, "01-01-94", this.currentDate()).subscribe(
      (data: any[]) => {

        this.companyData = data;
        this.checkYears();
        this.companyData = this.companyData.reverse();

      });

    this.grabData();


  }

  /**function checks the company's active years and 
   * sets the min and max for the date input */
  checkYears() {
    this.companyStartDate = this.companyData[(this.companyData.length - 1)].Date;
    let yyyyDecade = this.companyStartDate.substring(6);

    if (yyyyDecade.charAt(0) === '9') {
      yyyyDecade = "19" + yyyyDecade;
    }
    else {
      yyyyDecade = "20" + yyyyDecade;
    }

    let startDateFormatted = yyyyDecade + "-" + this.companyStartDate.slice(0, 2) + "-" + this.companyStartDate.slice(3, 5);
    document.getElementsByName("startSearch")[0].setAttribute('min', startDateFormatted);
    document.getElementsByName("endSearch")[0].setAttribute('min', startDateFormatted);

    let todayDate = this.currentDate();
    let endDateFormatted = todayDate.slice(6, 10) + "-" + todayDate.slice(0, 2) + "-" + todayDate.slice(3, 5)
    document.getElementsByName("startSearch")[0].setAttribute('max', endDateFormatted);
    document.getElementsByName("endSearch")[0].setAttribute('max', endDateFormatted);
    this.grabData();

  }

  /**Gets todays date */
  currentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let todayDate = mm + '-' + dd + '-' + yyyy;
    return todayDate;
  }


  async updateChartData() {

    /**Clears canvas of old chart in order to generate new chart*/
    if (this.lineChart != null) {
      this.lineChart.clear();
      this.lineChart.destroy();
      $('#lineChart').remove();
      $('.line-chart').append('<canvas id="lineChart"></canvas>');
    }

    this.lineChart = null;
    this.lineChart = undefined;

    // var ctx = $("#lineChart");
    // this.lineChart = new Chart((ctx), {
    this.lineChart = new Chart(('lineChart'), {
      type: 'line',
      data: {
        labels: this.stringLabel,
        datasets: [
          {
            data: this.companyDataOneYearOpen,
            label: 'Open',
            borderColor: "#007BFF",
            fill: false,
          },
          {
            data: this.companyDataOneYearClose,
            label: 'Close',
            borderColor: "#f13af1",
            fill: false,
          },
          {
            data: this.companyDataOneYearHigh,
            label: 'High',
            borderColor: "#28A745",
            fill: false,
          },
          {
            data: this.companyDataOneYearLow,
            label: 'Low',
            borderColor: "#EB090D",
            fill: false,
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Company: ' + this.symbol,
          fontSize: 25,
          fontColor: '#7D7C82'
        },
        scales: {
          xAxes: [{
            type: 'time',
            ticks: {
              fontColor: '#7D7C82',
            },
            gridLines: {
              display: true,
              color: "#7D7C82",
              drawTicks: true
            }
          }],
          yAxes: [{
            ticks: {
              fontColor: '#7D7C82',
            },
            gridLines: {
              display: true,
              color: "#7D7C82"
            }
          }]
        },
        tooltips: {
          displayColors: true,
          callbacks: {
            label: function (tooltipItem) {
              var label = tooltipItem.yLabel + ' USD';
              return label;
            },
          }
        }
      }
    });

  }

  /**Reads specific date range entered by the user, formats the 
   * date for the microservice, and uses that date range to 
   * grab a specific company's stock data and generate a new chart
   */
  grabData() {
    let d1 = new Date(this.startInputDate);
    let d2 = new Date(this.endInputDate);
    if (this.startInputDate.length != 10 || this.endInputDate.length != 10) {
      alert("Fill all required fields");
      return;
    }
    if (d1 >= d2) {
      alert("DateRange Error");
      return;
    }
    this.reformatStartInputDate = this.startInputDate.slice(5, 7) + "-" + this.startInputDate.slice(8, 10) + "-" + this.startInputDate.slice(2, 4);
    this.reformatEndInputDate = this.endInputDate.slice(5, 7) + "-" + this.endInputDate.slice(8, 10) + "-" + this.endInputDate.slice(2, 4);

    this._companyInfoService.getDataRange(this.symbol, this.reformatStartInputDate, this.reformatEndInputDate).subscribe(
      (data: any[]) => {
        this.companyData = [];
        this.companyData = data;
        this.companyData = this.companyData.reverse();

        this.setCompanyData();
        this.updateChartData();

      });

  }

  /**Populates the array used for each line in the line chart */
  setCompanyData() {

    /**Clear Open, High, Low, Close to zero */
    this.companyDataOneYearOpen.length = 0;
    this.companyDataOneYearHigh.length = 0;
    this.companyDataOneYearLow.length = 0;
    this.companyDataOneYearClose.length = 0;
    this.stringLabel.length = 0;


    for (let i = 0; i < this.companyData.length; i++) {
      this.companyDataOneYearOpen[i] = this.companyData[i].Open;
      this.companyDataOneYearHigh[i] = this.companyData[i].High;
      this.companyDataOneYearLow[i] = this.companyData[i].Low;
      this.companyDataOneYearClose[i] = this.companyData[i].Close;
      this.stringLabel[i] = this.companyData[i].Date;//xAxis tick label
    }

  }

}
