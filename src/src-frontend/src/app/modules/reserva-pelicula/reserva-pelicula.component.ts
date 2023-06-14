import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Reserva } from './reserva.model';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reserva-pelicula',
  templateUrl: './reserva-pelicula.component.html',
  styleUrls: ['./reserva-pelicula.component.scss']
})
export class ReservaPeliculaComponent{

  constructor(private http: HttpClient, private userService: UserService, private location: Location, private authService: AuthService, private route: Router){
    this.obtenerUser();
   }

  idUsuario: string = '';
  fecha: string = '';
  hora: string = '';
  asiento: string = '';
  sala: string = '';

  private getLastUrlFragmento(): string {
    const url = this.location.path();
    const urlSegments = url.split('/');
    return urlSegments[urlSegments.length - 1];
  }

  obtenerUser(){
    const decodedToken = this.authService.getUser();
    this.userService.getUser(decodedToken._id).subscribe(
      data => {
        console.log('Usuario encontrado');
        console.log(data);
        console.log(decodedToken._id);
        
        this.idUsuario = decodedToken._id;
      },
      error => {
        console.log('Usuario no encontrado', error);
      }
    );
  }

  obtenerFechaSeleccionada(event: Event) {
    const selectedOption = event.target as HTMLOptionElement;
    this.fecha = selectedOption.value;
  }

  obtenerHoraSeleccionada(event: Event) {
    const selectedOption = event.target as HTMLOptionElement;
    this.hora = selectedOption.value;
  }

  obtenerAsientoSeleccionado(event: Event) {
    const selectedOption = event.target as HTMLOptionElement;
    this.asiento = selectedOption.value;
  }

  obtenerSalaSeleccionada(event: Event) {
    const selectedOption = event.target as HTMLOptionElement;
    this.sala = selectedOption.value;
  }

  crearReserva() {
    const idUsuario = this.idUsuario;
    const idPelicula = this.getLastUrlFragmento();
    const fecha = this.fecha;
    const hora = this.hora;
    const asiento = this.asiento;
    const sala = this.sala;

    const reservaData = {
      idUsuario,
      idPelicula,
      fecha,
      hora,
      asiento,
      sala
    };


    this.userService.insertReserva(reservaData).subscribe(
      (response) => {
        console.log(response);
        this.route.navigate(['/home'])
      },
      (error) => {
        console.error(error);
        // Manejar errores de creación de reserva
      }
    );
  }

  
}
