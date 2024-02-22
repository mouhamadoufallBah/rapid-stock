import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAchatComponent } from './gestion-achat.component';
import { HttpClientModule } from '@angular/common/http';

describe('GestionAchatComponent', () => {
  let component: GestionAchatComponent;
  let fixture: ComponentFixture<GestionAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAchatComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
