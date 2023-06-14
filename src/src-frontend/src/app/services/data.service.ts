import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private correo: string = '';

  setCorreo(correo:string) {
    this.correo = correo;
  }

  getCorreo():string {
    return this.correo;
  }
}
