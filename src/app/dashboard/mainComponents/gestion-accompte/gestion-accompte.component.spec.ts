import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAccompteComponent } from './gestion-accompte.component';

describe('GestionAccompteComponent', () => {
  let component: GestionAccompteComponent;
  let fixture: ComponentFixture<GestionAccompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAccompteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionAccompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
