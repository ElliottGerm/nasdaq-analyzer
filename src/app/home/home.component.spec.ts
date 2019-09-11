import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { StackedBarChartComponent } from '../stacked-bar-chart/stacked-bar-chart.component';
import { SectorsBarChartComponent } from '../sectors-bar-chart/sectors-bar-chart.component';
import { IndustriesBarChartComponent } from '../industries-bar-chart/industries-bar-chart.component';

import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent,
        StackedBarChartComponent,
        SectorsBarChartComponent,
        IndustriesBarChartComponent
       ],
       imports: [
         HttpClientModule
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
