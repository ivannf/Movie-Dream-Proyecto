import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Usuario } from './usuario.model';
import { AuthService } from '../../services/auth.service';
import { Data, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

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


export class LoginComponent{
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);

  matcher = new MyErrorStateMatcher();

  user = {
    email: '',
    password: '',
  }

  constructor(
    private authService: AuthService, private router: Router, private dataService: DataService){ }

  login(){
    this.authService.login(this.user).subscribe(res => {
      localStorage.setItem('token', res.token);
      const decodedToken = this.authService.getUser();

        if (decodedToken && decodedToken.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      this.dataService.setCorreo(this.user.email);
    }, err => console.log(err)
    )
  }
}
