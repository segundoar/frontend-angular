import { Component } from '@angular/core';
import { Jugador } from '../jugador';
import { JugadorService } from '../jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-jugador',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-jugador.component.html',
  styleUrl: './actualizar-jugador.component.css'
})
export class ActualizarJugadorComponent {
  id: number;
  jugador: Jugador = new Jugador();
  constructor(private jugadorService: JugadorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.jugadorService.obtenerJugadorPorId(this.id).pipe(
      tap(dato => { //realiza algun efecto secundario
        this.jugador = dato;
      }),
      catchError(error => {
        console.error(error);
        return of(null); // Retorna un observable vacío en caso de error
      })
    ).subscribe();
  }

  irAlaListaDeJugadores() {
    this.router.navigate(['/jugadores']);
    Swal.fire('Jugador actualizado', `El jugador ${this.jugador.nombre} ha sido actualizado con exito`, `success`);
  }

  onSubmit(): void {
    if (this.jugador) {
      this.jugadorService.actualizarJugador(this.id, this.jugador).pipe(
        tap(dato => {
          this.irAlaListaDeJugadores(); // Redirige en caso de éxito
        }),
        catchError(error => {
          console.error('Error al actualizar el empleado:', error);
          return of(null); // Retorna un observable vacío en caso de error
        })
      ).subscribe(); // Realiza la suscripción
    }
  }
}
