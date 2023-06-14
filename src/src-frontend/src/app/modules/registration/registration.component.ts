import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Usuario } from './usuarioRegistrado.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


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
  nameFormControl = new FormControl('', [Validators.required, Validators.pattern('^[A-ZÑÁÉÍÓÚ][a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$')]);
  surnameFormControl = new FormControl('', [Validators.required, Validators.pattern('^[A-ZÑÁÉÍÓÚ][a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$')]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(12)
  ]);

  matcher = new MyErrorStateMatcher();
  
  registrationForm = new FormGroup(
    {
      name: this.nameFormControl,
      surname: this.surnameFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl
    },
    [Validators.required, Validators.minLength(6), Validators.maxLength(12)]
  );

    // Control de Formulario enviado por defecto a falso
    submitted = false;
  
    // Una vez que el formulario se envía entonces se establece a enviado.
    onSubmit() { this.submitted = true; }
  
    user = {
      name: '',
      surname: '',
      email: '',
      password: ''
    };

    constructor(
      private authService: AuthService, 
      private router: Router
    ) {  }

    ngOnInit(){}

    register() {
      this.authService.register(this.user).subscribe(res => {
        console.log(res)
        this.router.navigate(['/login']);
      }, err => console.log(err)
      )
    }
}



