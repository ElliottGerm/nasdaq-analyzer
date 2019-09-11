import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustriesBarChartComponent } from './industries-bar-chart.component';

import { HttpClientModule } from '@angular/common/http';


describe('IndustriesBarChartComponent', () => {
  let component: IndustriesBarChartComponent;
  let fixture: ComponentFixture<IndustriesBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustriesBarChartComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustriesBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
