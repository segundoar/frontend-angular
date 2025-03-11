import { Jugador } from '../jugador';
import { JugadorService } from '../jugador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, of, tap } from 'rxjs';
import { Partida } from '../partida';

@Component({
  selector: 'app-jugador-detalle',
  imports: [CommonModule],
  templateUrl: './jugador-detalle.component.html',
  styleUrl: './jugador-detalle.component.css'
})
export class JugadorDetalleComponent {
  
  id: number;
  jugador: Jugador = new Jugador();
  partidas: Partida[] = []; // Lista de partidas del jugador

  constructor(private jugadorService: JugadorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.jugadorService.obtenerJugadorPorId(this.id).pipe(
      tap(dato => { //realiza algun efecto secundario
        this.jugador = dato;
        this.partidas = dato.partidas || []; // Asigna la lista de partidas si existe
      }),
      catchError(error => {
        console.error(error);
        return of(null); // Retorna un observable vacío en caso de error
      })
    ).subscribe();
  }
}