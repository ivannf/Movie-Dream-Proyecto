import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from './pelicula.model';
import { MovieService } from 'src/app/services/movie.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-detalles-pelicula',
  templateUrl: './detalles-pelicula.component.html',
  styleUrls: ['./detalles-pelicula.component.scss']
})
export class DetallesPeliculaComponent implements OnInit {
  pelicula: any;
  correo: string;

  constructor(
    private router: Router,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private dataService: DataService
  ) { 
    this.correo = this.dataService.getCorreo();
    console.log(this.correo);
  }

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

  reservar(): void {
    const url = this.route.snapshot.url;
    const lastSegment = url[url.length - 1].path;
    this.router.navigate([`/reservaPelicula/${lastSegment}`]);
  }
}
