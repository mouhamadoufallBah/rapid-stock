import { TestBed } from '@angular/core/testing';

import { FactureService } from './facture.service';
import { HttpClientModule } from '@angular/common/http';

describe('FactureService', () => {
  let service: FactureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(FactureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
