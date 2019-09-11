import { TestBed } from '@angular/core/testing';

import { CompanyInfoService } from './company-info.service';
import { HttpClientModule } from '@angular/common/http';

describe('CompanyInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ]
  }));

  it('should be created', () => {
    const service: CompanyInfoService = TestBed.get(CompanyInfoService);
    expect(service).toBeTruthy();
  });
});
