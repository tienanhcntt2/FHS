import { TestBed } from '@angular/core/testing';

import { ExcelserviceService } from './excelservice.service';

describe('ExcelserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelserviceService = TestBed.get(ExcelserviceService);
    expect(service).toBeTruthy();
  });
});
