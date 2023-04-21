import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Usuario } from './usuarioRegistrado.model';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required, Validators.pattern('^[A-ZÑÁÉÍÓÚ][a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$')

]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(12)
  ]);
  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(12)
  ]);

  matcher = new MyErrorStateMatcher();

  matchPassword(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }
  
  registrationForm = new FormGroup(
    {
      email: this.emailFormControl,
      name: this.nameFormControl,
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl
    },
    [Validators.required, this.matchPassword, Validators.minLength(6), Validators.maxLength(12)]
  );

    // Datos de ejemplo para el usuario
    model = new Usuario("Mamerto Galán Zabala","mamer@gmail.com","1234567","1234567");

    // Control de Formulario enviado por defecto a falso
    submitted = false;
  
    // Una vez que el formulario se envía entonces se establece a enviado.
    onSubmit() { this.submitted = true; }
  
    // Método para inicializar un nuevo usuario:
    newUsuario () {
      this.model = new Usuario("Mamerto Galán Zabala","mamer@gmail.com","1234567","1234567");
    };
}



