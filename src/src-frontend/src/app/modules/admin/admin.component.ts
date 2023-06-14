import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Users } from './users.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  users: Users[] = [];

  constructor(private userService: UserService, private route: Router) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        console.log(this.users);
        
      },
      error => {
        console.log('Error al obtener usuarios', error);
      }
    );
  }

  adminUser(userId: string) {
    this.userService.adminUser(userId).subscribe(
      data => {
        console.log('Rol de administrador asignado correctamente');
        this.getUsers();
      },
      error => {
        console.log('Error al asignar el rol de administrador', error);
      }
    );
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      data => {
        console.log('Usuario eliminado correctamente');
        this.getUsers();
      },
      error => {
        console.log('Error al eliminar el usuario', error);
      }
    );
  }
}
