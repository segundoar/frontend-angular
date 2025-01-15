import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorDetalleComponent } from './jugador-detalle.component';

describe('JugadorDetalleComponent', () => {
  let component: JugadorDetalleComponent;
  let fixture: ComponentFixture<JugadorDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
