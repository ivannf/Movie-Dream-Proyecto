import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './login/login.component';
import { DetallesPeliculaComponent } from './detalles-pelicula/detalles-pelicula.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    DetallesPeliculaComponent,
    PerfilComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule
  ],
  exports: [
    
  ]
})
export class ModulesModule {}
