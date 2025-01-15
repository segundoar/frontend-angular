import { Partida } from "./partida";

export class Jugador {
    
    id:number;
    email:string;
    nombre:string;
    apellido:string;
    edad:number;
    nivel:string;
    rating:number;
    nacionalidad:string;
    fecRegistro: string
    partidas: Partida[];
}
