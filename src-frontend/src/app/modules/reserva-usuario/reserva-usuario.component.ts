import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { reservas } from './reservas.model';
@Component({
  selector: 'app-reserva-usuario',
  templateUrl: './reserva-usuario.component.html',
  styleUrls: ['./reserva-usuario.component.scss'],
})
export class ReservaUsuarioComponent {

  user: any;
  reservas: reservas[] = [];

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerUser();
  }

  obtenerUser(){
    const decodedToken = this.authService.getUser();
    this.userService.getUser(decodedToken._id).subscribe(
      data => {
        console.log('Usuario encontrado');
        console.log(data);
        this.user = data;
        this.obtenerReservas(this.user);
      },
      error => {
        console.log('Usuario no encontrado', error);
      }
    );
  }

  obtenerReservas(userId: string){    
    this.userService.getReservas(userId).subscribe(
      data => {
        console.log('Usuario encontrado');
        console.log(data);
        this.reservas = data;
      },
      error => {
        console.log('Usuario no encontrado', error);
      }
    );
  }
}
