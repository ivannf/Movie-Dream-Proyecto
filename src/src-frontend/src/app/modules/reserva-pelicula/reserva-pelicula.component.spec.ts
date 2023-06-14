import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaPeliculaComponent } from './reserva-pelicula.component';

describe('ReservaPeliculaComponent', () => {
  let component: ReservaPeliculaComponent;
  let fixture: ComponentFixture<ReservaPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaPeliculaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
