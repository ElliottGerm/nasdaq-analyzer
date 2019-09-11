import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsBarChartComponent } from './sectors-bar-chart.component';

import { HttpClientModule } from '@angular/common/http';

describe('BarChartComponent', () => {
  let component: SectorsBarChartComponent;
  let fixture: ComponentFixture<SectorsBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorsBarChartComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorsBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
