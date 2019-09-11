import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDataLineChartComponent } from './company-data-line-chart.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";

describe('CompanyDataLineChartComponent', () => {
  let component: CompanyDataLineChartComponent;
  let fixture: ComponentFixture<CompanyDataLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDataLineChartComponent ],
      imports: [ 
        HttpClientModule,
        FormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDataLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
