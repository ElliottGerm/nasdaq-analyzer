import { Component, OnInit } from '@angular/core';
import 'chartjs-chart-treemap';
import { CompanyInfoService } from '../company-info.service';
declare var Chart: any;


interface industriesJSON {
  sector: string,
  industry: string,
  companies: number,
}

@Component({
  selector: 'app-tree-map',
  templateUrl: './tree-map.component.html',
  styleUrls: ['./tree-map.component.css']
})
export class TreeMapComponent implements OnInit {

  treeMap: any;
  // colorSectors: string[] = ["rgb(4,30,66, .8)", "rgb(157,34,53, .8)", "rgb(139,111,78, .8)", "rgb(85,37,131, .8)", "rgb(253,185,39, .8)",
  //   "rgb(0,122,193, .8)", "rgb(239,59,36, .8)", "rgb(0,71,27, .8)", "rgb(65,182,230, .8)", "rgb(219,62,177, .8)"];
  // borderColorSectors: string[] = ["rgb(4,30,66, 1)", "rgb(157,34,53, 1)", "rgb(139,111,78, 1)", "rgb(85,37,131, 1)", "rgb(253,185,39, 1)",
  //   "rgb(0,122,193, 1)", "rgb(239,59,36, 1)", "rgb(0,71,27, 1)", "rgb(65,182,230, 1)", "rgb(219,62,177, 1)"];

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

  public companyInfo: any[] = [];//list of company classifications and descriptions
  industryCompanyMap = new Map();
  sectorIndustryMap = new Map();
  sector2Industry = [[], [], [], [], [], [], [], [], [], []];//2d array with 10 inner arrays
  datasetsArray: any[] = [];//holds the JSON objects in this format
  companiesPerIndustry: number[] = new Array(100);

  jsonMap: industriesJSON[] = [];

  constructor(private _companyInfoService: CompanyInfoService) { }

  ngOnInit() {

    this._companyInfoService.getCompanyClassifications().subscribe(
      (data: any[]) => {
        this.companyInfo = data;
        // this.companiesPerIndustry.fill(0);//initializes all indicies to 0;
        this.setMap();
        // this.companiesInIndustry();//get number of companies per industry
        // this.array2Map();
        this.map2JSON();
        this.treeMap = new Chart('canvas66', {
          type: 'treemap',
          data: {
            datasets: [
              {
                tree: this.jsonMap,
                key: "companies",
                groups: ['sector', 'industry'],
                backgroundColor: this.colorSectors,
                borderColor: this.borderColorSectors,
              }
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Companies per Sector & Companies per Industry',
              fontSize: 28,
              fontColor: '#7D7C82'
            },
            maintainAspectRatio: false,
            responsive: true,
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                title: function (item, data) {
                  var item = item[0];
                  var dataItem = data.datasets[item.datasetIndex].data[item.index];
                  var obj = dataItem._data;
                  if (dataItem.l === 0) return obj.sector;
                  if (dataItem.l === 1) {
                    // let str = obj.industry.slice(2);
                    // return "Industry " + obj.industry;
                    return obj.industry;
                  }
                  // return obj.industry;
                  // return "Industry " + obj;
                },
                label: function (item, data) {
                  var dataset = data.datasets[item.datasetIndex];
                  var dataItem = dataset.data[item.index];
                  var obj = dataItem._data;
                  // return dataset.key + ": " + dataItem.v;
                  return dataItem.v + " Companies";
                }
              }
            }
          }
        });
      });

    //hardcoded
    // this.companyInfo = this._companyInfoService.HARDCODE_DATAFRAME();

    // this.companiesPerIndustry.fill(0);//initializes all indicies to 0;
    // this.companiesInIndustry();//get number of companies per industry
    // this.array2Map();
    // this.map2JSON();
    //hardcoded




  }

  setMap() {
    for (let i = 0; i < this.companyInfo.length; i++) {
      //array first stores the number of companies in that industry then the sector that its in
      if (this.industryCompanyMap.has(this.companyInfo[i].Industry) === false) {
        if (this.companyInfo[i].Sector === "") {
          this.industryCompanyMap.set(this.companyInfo[i].Industry, [1, "ETF or Other"]);
        }
        else {
          this.industryCompanyMap.set(this.companyInfo[i].Industry, [1, this.companyInfo[i].Sector]);
        }
      }
      else {
        if (this.companyInfo[i].Sector === "") {
          this.industryCompanyMap.set(this.companyInfo[i].Industry, [(this.industryCompanyMap.get(this.companyInfo[i].Industry)[0] + 1), "ETF or Other"]);
        }
        else {
          this.industryCompanyMap.set(this.companyInfo[i].Industry, [(this.industryCompanyMap.get(this.companyInfo[i].Industry)[0] + 1), this.companyInfo[i].Sector]);
        }
      }
    }
    // for (let [key, value] of this.industryCompanyMap) {
    //   console.log(key + "-VALS-" + value);
    // }
  }


  // companiesInIndustry() {
  //   for (let i = 0; i < this.companyInfo.length; i++) {
  //     this.companiesPerIndustry[+this.companyInfo[i].Industry]++;
  //   }
  // }

  // industriesInSectors() {
  //   let arr: any[] = Array.from(this.industryCompanyMap.keys());//places the keys into array
  //   for (let element of this.industryCompanyMap) {
  //     for (let j = 0; j < this.companyInfo.length; j++) {
  //       if (element[0] == this.companyInfo[j].Industry) {//element[0] gets the key from the map type
  //         this.sector2Industry[this.companyInfo[j].Sector].push(this.companyInfo[j].Industry);
  //         j = 9999;//exits inner loop
  //       }
  //     }
  //     //check which sector the industry is in starting from industry 0 
  //   }
  //   for (let i = 0; i < 10; i++) {
  //     this.sectorIndustryMap.set(i, this.sector2Industry[i]);//VIP
  //   }
  // }

  // array2Map() {
  //   for (let i = 0; i < this.companiesPerIndustry.length; i++) {
  //     this.industryCompanyMap.set(i, this.companiesPerIndustry[i]);
  //   }

  //   this.industriesInSectors();
  // }

  map2JSON() {
    //go through sectors map and iterate through each industry then fill object
    //Ex: this.jsonMap[0].sector = 5;
    // this.jsonMap
    // let counter = 0;
    let i = 0;
    for (let [key, value] of this.industryCompanyMap) {
      // for (let i = 0; i < this.industryCompanyMap.size; i++) {
      this.jsonMap[i] = {
        // sector: i,
        // industry: this.sectorIndustryMap.get(i)[j],
        sector: value[1],
        industry: key,
        companies: value[0]
      };
      i++;
    }
    // console.log(this.jsonMap);


    // for (let i = 0; i < this.jsonMap.length; i++) {
    //   console.table(this.jsonMap);
    // }
  }



}
