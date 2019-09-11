import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAnalysisComponent } from './company-analysis.component';
import { CompanyDataLineChartComponent } from '../company-data-line-chart/company-data-line-chart.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";


describe('CompanyAnalysisComponent', () => {
  let component: CompanyAnalysisComponent;
  let fixture: ComponentFixture<CompanyAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CompanyAnalysisComponent,
        CompanyDataLineChartComponent
       ],
       imports: [
         FormsModule,
         HttpClientModule,
         RouterTestingModule
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
