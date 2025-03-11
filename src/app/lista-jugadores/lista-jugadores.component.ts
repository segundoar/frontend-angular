import { Jugador } from '../jugador';
import { JugadorService } from '../jugador.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pagina } from '../pagina';

@Component({
  selector: 'app-lista-jugadores',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-jugadores.component.html',
  styleUrls: ['./lista-jugadores.component.css']

})
export class ListaJugadoresComponent implements OnInit{
  
  jugadores: Jugador[] = [];
  jugadoresFiltrados: any[] = [];
  jugadoresPorPagina: number = 10;
  paginaActual = 0;
  columnaOrdenada: string = '';
  ordenAscendente: boolean = true;
  loading: boolean = true; //Indica si los datos están cargado
  ordenarPor: string = '';
  searchText: string = '';

  constructor(private jugadorService:JugadorService, private router: Router) { }

  ngOnInit(): void {

    this.obtenerJugadores();
    this.ordenarJugadores();
  }

  private obtenerJugadores(): void {
    this.loading = true;
    this.jugadorService.obtenerListaJugadores().subscribe({
      next: (data: Pagina) => {
        this.jugadores = data.content; // Asigna la lista de jugadores
        this.jugadoresFiltrados = this.jugadores; // Inicializa los jugadores filtrados
        this.loading = false; //Desactivar el estado de carga cuando se obtienen los datos
      },
      error: (err) => {
        console.error('Error al obtener los jugadores', err);
        this.loading = false; //Desactivar en caso de error
      }
    });
  }

  ordenarJugadores() {
    if (this.ordenarPor) {
      this.ordenarPorColumna(this.ordenarPor as keyof Jugador);
    }
  }

  ordenarPorColumna(columna: keyof Jugador) {
    if (this.columnaOrdenada === columna) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.columnaOrdenada = columna;
      this.ordenAscendente = true;
    }

    this.jugadores.sort((a, b) => {
      const valorA = a[columna];
      const valorB = b[columna];

      if (typeof valorA === 'string' && typeof valorB === 'string') {
        return this.ordenAscendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
      } else if (typeof valorA === 'number' && typeof valorB === 'number') {
        return this.ordenAscendente ? valorA - valorB : valorB - valorA;
      }
      return 0;
    });
  }

  cambiarNumeroJugadores(numero: number) {
    this.jugadoresPorPagina = numero;
    this.paginaActual = 0; // Reseteamos a la primera página al cambiar el número de jugadores por página
  }

  cambiarPagina(incremento: number) {
    const totalJugadores = this.jugadoresFiltrados.length;
    const maxPaginas = Math.ceil(totalJugadores / this.jugadoresPorPagina);

    this.paginaActual = Math.min(Math.max(this.paginaActual + incremento, 0), maxPaginas - 1);
  }

  // Método para filtrar jugadores (lo que ya tienes para búsqueda)
  filtrarJugadores() {
    // Filtramos jugadores según el texto de búsqueda
    this.jugadoresFiltrados = this.jugadores.filter(jugador => 
      jugador.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      jugador.apellido.toLowerCase().includes(this.searchText.toLowerCase()) ||
      jugador.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
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
