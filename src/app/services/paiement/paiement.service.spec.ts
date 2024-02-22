import { TestBed } from '@angular/core/testing';

import { PaiementService } from './paiement.service';
import { HttpClientModule } from '@angular/common/http';

describe('PaiementService', () => {
  let service: PaiementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(PaiementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
