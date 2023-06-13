import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  user: any;
  userId: any;

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {
    this.obtenerUser();
  }

  obtenerUser(){
    const decodedToken = this.authService.getUser();
    this.userService.getUser(decodedToken._id).subscribe(
      data => {
        console.log('Usuario encontrado');
        console.log(data);
        this.user = data;
      },
      error => {
        console.log('Usuario no encontrado', error);
      }
    );
  }

  updateUser() {
    const updatedUserData = {
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email,
      password: this.user.password
    };
  
    this.userService.updateUser(this.user._id, updatedUserData).subscribe(
      (data: Usuario) => {
        console.log('Usuario actualizado', data);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('Error al actualizar el usuario', error);
      }
    );
  }

  reservasUsuario(){
    this.router.navigate([`/reservaUser`]);
  }
}

