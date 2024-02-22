import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCategorieComponent } from './gestion-categorie.component';
import { HttpClientModule } from '@angular/common/http';

describe('GestionCategorieComponent', () => {
  let component: GestionCategorieComponent;
  let fixture: ComponentFixture<GestionCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCategorieComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
