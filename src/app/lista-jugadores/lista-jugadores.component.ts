import { Jugador } from '../jugador';
import { JugadorService } from '../jugador.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagina } from '../pagina';

@Component({
  selector: 'app-lista-jugadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-jugadores.component.html',
  styleUrl: './lista-jugadores.component.css'
})
export class ListaJugadoresComponent implements OnInit{
  
  jugadores:Jugador[];
  loading: boolean = false;

  constructor(private jugadorService:JugadorService, private router: Router) { }

  ngOnInit(): void {

    this.obtenerJugadores();
  }
  private obtenerJugadores(): void {
    this.loading = true;
    this.jugadorService.obtenerListaJugadores().subscribe({
      next: (data: Pagina) => {
        this.jugadores = data.content;  // Asigna la lista de usuarios
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener los usuarios', err);
        this.loading = false;
      }
    });
  }

  eliminarJugador(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar al empleado",
      icon: 'warning', // Cambiado 'type' a 'icon'
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {if (result.isConfirmed) {
      // Llamamos al servicio para eliminar el jugador
      this.jugadorService.eliminarJugador(id).subscribe({
        next: () => {
          // Acción en caso de éxito
          this.obtenerJugadores(); // Actualiza la lista de jugadores
          Swal.fire(
            'Jugador eliminado',
            'El jugador ha sido eliminado con éxito',
            'success'
          );
        },
        error: (err: HttpErrorResponse) => {
          // Acción en caso de error
          Swal.fire(
            'Error',
            'Hubo un error al eliminar el jugador',
            'error'
          );
          console.error(err);
        }
      });
    }
  });
  }

  actualizarJugador(id: number) {
    this.router.navigate(['actualizar-jugador', id]);
  }

  verDetalleJugador(id: number) {
    this.router.navigate(['jugador-detalle', id])
  }
}
