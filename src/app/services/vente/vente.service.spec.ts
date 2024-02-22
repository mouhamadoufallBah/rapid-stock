import { TestBed } from '@angular/core/testing';

import { VenteService } from './vente.service';
import { HttpClientModule } from '@angular/common/http';

describe('VenteService', () => {
  let service: VenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(VenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
