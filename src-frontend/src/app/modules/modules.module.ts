import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './login/login.component';
import { PrivateTasksComponent } from './private-tasks/private-tasks.component';
import { DetallesPeliculaComponent } from './detalles-pelicula/detalles-pelicula.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    PrivateTasksComponent,
    DetallesPeliculaComponent
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
