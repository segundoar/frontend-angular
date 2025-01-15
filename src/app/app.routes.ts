import { Routes } from '@angular/router';
import { ListaJugadoresComponent } from './lista-jugadores/lista-jugadores.component';
import { RegistrarJugadorComponent } from './registrar-jugador/registrar-jugador.component';
import { ActualizarJugadorComponent } from './actualizar-jugador/actualizar-jugador.component';
import { JugadorDetalleComponent } from './jugador-detalle/jugador-detalle.component';

export const routes: Routes = [
    {path : 'jugadores',component:ListaJugadoresComponent},
    {path:'',redirectTo:'jugadores',pathMatch:'full'},
    {path : 'registrar-jugador',component : RegistrarJugadorComponent},
    {path : 'actualizar-jugador/:id',component : ActualizarJugadorComponent},
    {path : 'jugador-detalle/:id',component : JugadorDetalleComponent}
];
