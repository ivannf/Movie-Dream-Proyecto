import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { HomeComponent } from './modules/home/home.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { LoginComponent } from './modules/login/login.component';
import { DetallesPeliculaComponent } from './modules/detalles-pelicula/detalles-pelicula.component';
import { ReservaPeliculaComponent } from './modules/reserva-pelicula/reserva-pelicula.component';
import { PerfilComponent } from './modules/perfil/perfil.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './modules/admin/admin.component';
import { ReservaUsuarioComponent } from './modules/reserva-usuario/reserva-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: SkeletonComponent,
    pathMatch: 'prefix',
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'register', component: RegistrationComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      { path: 'pelicula/:id', component: DetallesPeliculaComponent, canActivate: [AuthGuard]},
      { path: 'reservaPelicula/:id', component: ReservaPeliculaComponent, canActivate: [AuthGuard]},
      { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
      { path: 'reservaUser', component: ReservaUsuarioComponent, canActivate: [AuthGuard]}
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
