import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RawDataComponent } from './raw-data.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from '@angular/common/http';

describe('RawDataComponent', () => {
  let component: RawDataComponent;
  let fixture: ComponentFixture<RawDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawDataComponent, LoadingSpinnerComponent, DataTableComponent ],
      imports: [FormsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        RouterTestingModule,
        HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
