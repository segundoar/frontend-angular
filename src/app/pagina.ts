import { Jugador } from "./jugador";
import { Pageable } from "./pageable";
import { Sort } from "./sort";

export class Pagina {

  content: Jugador[];  
  pageable: Pageable;  
  last: boolean;  
  totalPages: number;  
  totalElements: number;  
  size: number;  
  number: number;  
  sort: Sort;  
  numberOfElements: number;  
  first: boolean;  
  empty: boolean;
}
