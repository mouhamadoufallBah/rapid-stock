import { TestBed } from '@angular/core/testing';
import { AchatService } from './achat.service';
import { HttpClientModule } from '@angular/common/http';

describe('AchatService', () => {
  let service: AchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      
    });
    service = TestBed.inject(AchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
