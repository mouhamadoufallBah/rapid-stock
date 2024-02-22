import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClientComponent } from './gestion-client.component';
import { HttpClientModule } from '@angular/common/http';

describe('GestionClientComponent', () => {
  let component: GestionClientComponent;
  let fixture: ComponentFixture<GestionClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionClientComponent,HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
