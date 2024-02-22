import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProduitComponent } from './gestion-produit.component';
import { HttpClientModule } from '@angular/common/http';

describe('GestionProduitComponent', () => {
  let component: GestionProduitComponent;
  let fixture: ComponentFixture<GestionProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionProduitComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
