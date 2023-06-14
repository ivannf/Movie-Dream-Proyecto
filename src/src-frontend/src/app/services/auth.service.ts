import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../modules/login/usuario.model';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private URL = 'http://localhost:3000/api';
  private urlActual: string;

  constructor(private http: HttpClient, private location: Location, private router: Router) { 
    this.urlActual = this.location.path();
  }

    register(user: {name: string, surname: string, email: string, password: string}){
      return this.http.post<any>(this.URL + '/register', user);
    }

    login(user: {email: string; password: string}){
      return this.http.post<any>(this.URL + '/login', user);
    }

    loggedIn(){
      return !!localStorage.getItem('token');
    }

    getToken() {
      return localStorage.getItem('token');
    }

    logout(){
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }

    getUser(): any {
      const token = this.getToken();
  
      if (!token) {
        return null;
      }
  
      const decodedToken: any = jwt_decode(token);
  
      return decodedToken || null;
    }
}
