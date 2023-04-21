import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Usuario } from './usuario.model';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);

  matcher = new MyErrorStateMatcher();

  // Datos de ejemplo para la persona
  model = new Usuario("example@example.com",12313);

  // Control de Formulario enviado por defecto a falso
  submitted = false;

  // Una vez que el formulario se envía entonces se establece a enviado.
  onSubmit() { this.submitted = true; }

  // Método para inicializar una nueva persona:
  newPerson () {
    this.model = new Usuario('',2131);
  };

}
