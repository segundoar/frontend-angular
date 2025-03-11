import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jugador } from './jugador';
import { Pagina } from './pagina';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private baseURL = "http://localhost:8085/api/v1"
  private envPRO = "https://backend-ajedrez.onrender.com/api/v1"

  constructor(private httpClient : HttpClient) { }

  obtenerListaJugadores(): Observable<Pagina> {
    return this.httpClient.get<Pagina>(this.envPRO + '/jugadores');
  }
  
  registrarJugador(jugador: Jugador): Observable<Object> {
    return this.httpClient.post(`${this.envPRO}`, jugador);
  }

  actualizarJugador(id: number, jugador: Jugador): Observable<Object> {
    return this.httpClient.patch(`${this.envPRO+ '/jugador'}/${id}`, jugador);
  }

  obtenerJugadorPorId(id: number): Observable<Jugador> {
    return this.httpClient.get<Jugador>(`${this.envPRO + '/jugador'}/${id}`);
  }

  eliminarJugador(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.envPRO}/${id}`);
  }

}
