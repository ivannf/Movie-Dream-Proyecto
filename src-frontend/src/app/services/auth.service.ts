import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {  }

   register(user: {name: string, surname: string, email: string, password: string}){
    return this.http.post<any>(this.URL + '/register', user);
   }

    login(user: {email: string; password: string; }){
      return this.http.post<any>(this.URL + '/login', user);
    }
}
