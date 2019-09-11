import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TenYearDataComponent } from './ten-year-data.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from '@angular/common/http';

describe('TenYearDataComponent', () => {
  let component: TenYearDataComponent;
  let fixture: ComponentFixture<TenYearDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenYearDataComponent, LoadingSpinnerComponent ],
      imports: [RouterTestingModule, HttpClientModule, InfiniteScrollModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenYearDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shouild append 100 items', () => {
    expect(component.currentLength).toBeGreaterThanOrEqual(50);
    component.appendItems(100);
    expect(component.currentLength).toBeGreaterThanOrEqual(150);
  });

  it('should download JSON', () => {
    expect(component.downloadJsonHref).toBeNull();
    component.downloadJson(component.companyInfo);
    expect(component.downloadJsonHref).toBeDefined();
  });

});
