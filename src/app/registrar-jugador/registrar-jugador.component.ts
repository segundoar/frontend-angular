import { Component } from '@angular/core';
import { Jugador } from '../jugador';
import { JugadorService } from '../jugador.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError, tap, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-jugador',
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-jugador.component.html',
  styleUrls: ['./registrar-jugador.component.css']
})
export class RegistrarJugadorComponent {

  jugador: Jugador = new Jugador();

  constructor(private jugadorService: JugadorService, private router: Router) { }

  ngOnInit(): void {
    // Inicializar el arreglo de partidas si no existe
    if (!this.jugador.partidas) {
      this.jugador.partidas = [];
    }
  }

  // Método para agregar una partida
  agregarPartida() {
    // Crear una nueva partida con valores predeterminados
    const nuevaPartida = {
      resultado: '',
      jugadaPartida: ''
    };
    // Añadirla al array de partidas
    this.jugador.partidas.push(nuevaPartida);
  }

  // Método para eliminar una partida
  eliminarPartida(index: number) {
    this.jugador.partidas.splice(index, 1);
  }

  // Método para guardar el jugador
  guardarJugador() {
    this.jugadorService.registrarJugador(this.jugador).pipe(
      tap(dato => {
        console.log(dato);
        this.irALaListaDeJugadores();
      }),
      catchError(error => {
        console.log(error);
        return throwError(() => new Error(error));
      })
    ).subscribe();
  }

  // Método para navegar a la lista de jugadores
  irALaListaDeJugadores() {
    this.router.navigate(['/jugadores']);
    Swal.fire('Jugador registrado', `El jugador ${this.jugador.nombre} ha sido registrado con éxito`, 'success');
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    this.guardarJugador();
  }
}