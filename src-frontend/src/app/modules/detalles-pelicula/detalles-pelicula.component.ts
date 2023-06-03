import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pelicula } from './pelicula.model';
import { MovieService } from 'src/app/services/movie.service';


@Component({
  selector: 'app-detalles-pelicula',
  templateUrl: './detalles-pelicula.component.html',
  styleUrls: ['./detalles-pelicula.component.scss']
})
export class DetallesPeliculaComponent implements OnInit {
  pelicula: any;

  constructor(
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.getDetallePelicula();
  }

  getDetallePelicula(): void{
    this.movieService.getPelicula().subscribe(
      data => {
        this.pelicula = data;
      },
      error => {
        console.log('Error al obtener la pelicula', error);
      }
    );
  }
}
