import { TestBed } from '@angular/core/testing';
import { ProduitService } from './produit.service';
import { HttpClientModule } from '@angular/common/http';

import { Storage} from '@angular/fire/storage';

describe('ProduitService', () => {
  let service: ProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [Storage]
    });
    service = TestBed.inject(ProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
