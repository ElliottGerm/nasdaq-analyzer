import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEnhancementsComponent } from './chart-enhancements.component';

describe('ChartEnhancementsComponent', () => {
  let component: ChartEnhancementsComponent;
  let fixture: ComponentFixture<ChartEnhancementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartEnhancementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartEnhancementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
