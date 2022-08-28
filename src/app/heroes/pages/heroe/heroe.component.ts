import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from './interfaces/heroe.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
   heroe!:Heroe;
  constructor(
    private activeteRoute: ActivatedRoute,
    private HeroeService: HeroesService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.activeteRoute.params.subscribe(({id})=>{
       this.HeroeService.getHeroeId(id).subscribe(h=>{
        this.heroe = h;
       });
  });

}
regresar(){
  this.router.navigate(['heroes/listado']);
}
}
