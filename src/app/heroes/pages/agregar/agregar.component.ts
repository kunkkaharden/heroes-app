import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../heroe/interfaces/heroe.interface';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
  };
  titulo: string = "Nuevo";
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snakBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroeId(id)))
        .subscribe((heroe) => {
          this.heroe = heroe;
        });
        this.titulo ="Editar";
    }else {
      this.titulo ="Nuevo";
    }
  }
  guardar() {

    if (!this.heroe.id) {
      this.heroesService.guardarHeroe(this.heroe).subscribe((h) => {
        this.router.navigate(['/heroes/editar', h.id]);
        this.mostrarSnakBar('Registro creado');
      });
    } else {
      this.heroesService
        .actualizarHeroe(this.heroe)
        .subscribe((h) => this.mostrarSnakBar('Registro actualizado'));
    }
  }

  borrar() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe,
    });

    dialog.afterClosed().subscribe((r) => {
      if (r) {
        this.heroesService.borrarHeroe(this.heroe.id!).subscribe((r) => {
          this.router.navigate(['/heroes']);
        });
      }
    });
  }
  mostrarSnakBar(mensaje: string) {
    this.snakBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }
}
