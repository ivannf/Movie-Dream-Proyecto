import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { HomeComponent } from './modules/home/home.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { LoginComponent } from './modules/login/login.component';
import { TasksComponent } from './modules/tasks/tasks.component';
import { PrivateTasksComponent } from './modules/private-tasks/private-tasks.component';
import { DetallesPeliculaComponent } from './modules/detalles-pelicula/detalles-pelicula.component';
import { ReservaPeliculaComponent } from './modules/reserva-pelicula/reserva-pelicula.component';

const routes: Routes = [
  {
    path: '',
    component: SkeletonComponent,
    pathMatch: 'prefix',
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'register', component: RegistrationComponent },
      { path: 'home', component: HomeComponent  },
      { path: 'tasks', component: TasksComponent },
      { path: 'private-tasks', component: PrivateTasksComponent},
      { path: 'pelicula/:id', component: DetallesPeliculaComponent},
      { path: 'reservaPelicula', component: ReservaPeliculaComponent}
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
