import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {

  secNums: String[] = ["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5",
                       "Sector 6", "Sector 7", "Sector 8", "Sector 9", "Sector 10"];
  secNames: string[] = ["Technology", "Consumer Services & Entertainment", "Mergeres & Aquisitions",
                        "Mergeres & Aquisitions", "Bonds & ETFS", "Technology", "Finances", 
                        "Pharmaceuticals", "Energy", "Resources"];
  constructor() { }

  ngOnInit() {

  }

}
