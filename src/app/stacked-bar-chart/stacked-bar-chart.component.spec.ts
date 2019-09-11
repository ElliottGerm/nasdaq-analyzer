import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedBarChartComponent } from './stacked-bar-chart.component';

import { HttpClientModule } from '@angular/common/http';

describe('StackedBarChartComponent', () => {
  let component: StackedBarChartComponent;
  let fixture: ComponentFixture<StackedBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedBarChartComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
