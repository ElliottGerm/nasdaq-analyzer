import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-chart-enhancements',
  templateUrl: './chart-enhancements.component.html',
  styleUrls: ['./chart-enhancements.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChartEnhancementsComponent implements OnInit {

  @Input() selectedSector;

  constructor() { }

  ngOnInit() {
  }

}
