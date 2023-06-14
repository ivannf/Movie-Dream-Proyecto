import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../modules/home/movie.model';
import { Pelicula } from '../modules/detalles-pelicula/pelicula.model';
import { Location } from '@angular/common';
import { Reserva } from '../modules/reserva-pelicula/reserva.model';
import { Usuario } from '../modules/perfil/usuario.model';

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

  getReserva(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(`${this.apiUrl}/reservaPelicula/${this.fragmento}`);
  }

  getUsuario(): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiUrl}/perfil`);
  }
}
