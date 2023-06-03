import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../modules/home/movie.model';
import { Pelicula } from '../modules/detalles-pelicula/pelicula.model';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/api';
  fragmento: string;
  
  constructor(private http: HttpClient, private location: Location) { 
    this.fragmento = this.getLastUrlFragmento();
  }

  private getLastUrlFragmento(): string {
    const url = this.location.path();
    const urlSegments = url.split('/');
    return urlSegments[urlSegments.length - 1];
  }

  getMovie(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/home`);
  }

  getPelicula(): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/pelicula/${this.fragmento}`);
  }
}
