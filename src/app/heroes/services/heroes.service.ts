import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../pages/heroe/interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }
  getHeroes() {
   return this.http.get<Heroe[]>('http://localhost:3000/heroes');
  }
  getHeroeId(id: string){
    return this.http.get<Heroe>("http://localhost:3000/heroes/" + id);
  }
  getSugerencias(termino: string){
    return this.http.get<Heroe[]>("http://localhost:3000/heroes?q="+ termino + "&_limit=6" );
  }
}
