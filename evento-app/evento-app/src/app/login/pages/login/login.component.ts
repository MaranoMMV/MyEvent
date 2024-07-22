import {Component} from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/default-login-layout/default-login-layout.component';
import {FormControl, FormControlStatus, FormGroup, FormRecord, ReactiveFormsModule, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {Router} from '@angular/router';
import { LoginService } from '../../../services/login.service';
import {NgIf} from "@angular/common";
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

interface LoginForm {
    usuario: FormControl,
    password: FormControl
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ToastrModule,
        DefaultLoginLayoutComponent,
        ReactiveFormsModule,
        PrimaryInputComponent,
        NgIf,
        HttpClientModule
    ],
    providers: [
        LoginService, ToastrService,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;
  showErroMenssage: boolean = false;

  constructor(
      private router: Router,
      private loginService: LoginService,
      private toastService: ToastrService
  ) {
      this.loginForm = new FormGroup({
        usuario: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required, Validators.minLength(3)])
      })
  }

  submit() {
      if (this.validate()) {
          this.loginService.login(this.loginForm.value.usuario, this.loginForm.value.password).subscribe( (res:any) => {

                localStorage.setItem('auth_token', res.token)
                  this.toastService.success("Login feito com sucesso!");
                  this.router.navigate(['/sistema']); // Redireciona para a tela de sistema após login bem-sucedido
              },
          )
      }
  }

  validate() {
      if (this.loginForm.valid) {
          this.showErroMenssage = false;
          return true;
      } else {
          this.showErroMenssage = true;
          return false;
      }
  }

  navigate() {
      this.router.navigate(["signup"]);
  }
}
