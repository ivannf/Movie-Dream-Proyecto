import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from './movie.model';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  movies: Movie[] = [];
  correo: string;

  constructor(private movieService: MovieService, private router: Router, private dataService:DataService) { 
    this.correo = this.dataService.getCorreo();
    dataService.setCorreo(this.correo);
    console.log(this.correo);
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void{
    this.movieService.getMovie().subscribe(
      data => {
        this.movies = data;
      },
      error => {
        console.log('Error al obtener las peliculas', error);
      }
    );
  }
}
