import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from '../modules/admin/users.model';
import { Usuario } from '../modules/perfil/usuario.model';
import { reservas } from '../modules/reserva-usuario/reservas.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient, private router: Router) {  }


  private URL = 'http://localhost:3000/api';


  getUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(`${this.URL}/admin`);
  }

  adminUser(userId: string){
    return this.http.post<any>(`${this.URL}/admin/${userId}`, {});
  }

  deleteUser(userId: string){
    return this.http.delete<any>(`${this.URL}/admin/${userId}`, {});
  }

  getUser(userId: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.URL}/perfil/${userId}`);
  }

  updateUser(userId: string, userData: any){
    return this.http.post<any>(`${this.URL}/perfil/${userId}`, userData);
  }

  insertReserva(reservaData: any){
    return this.http.post<any>(`${this.URL}/reservaPelicula`, reservaData);
  }

  getReservas(userId: string): Observable<reservas[]>{
    return this.http.get<reservas[]>(`${this.URL}/reservaUser/${userId}`)
  }
}
