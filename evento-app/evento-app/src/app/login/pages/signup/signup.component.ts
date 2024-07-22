import {Component} from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/default-login-layout/default-login-layout.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {Router} from '@angular/router';
import { LoginService } from '../../../services/login.service'; 
import {ToastrService} from 'ngx-toastr';
import {NgIf} from "@angular/common";

interface SignupForm {
    name: FormControl,
    usuario: FormControl,
    password: FormControl,
    passwordConfirm: FormControl
}

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        DefaultLoginLayoutComponent,
        ReactiveFormsModule,
        PrimaryInputComponent,
        NgIf
    ],
    providers: [
        LoginService
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignUpComponent {
    signupForm!: FormGroup<SignupForm>;
    showMenssageErrorPassword: boolean = false;
    showMenssageErrorusuario: boolean = false;


    constructor(
        private router: Router,
        private loginService: LoginService,
        private toastService: ToastrService
    ) {
        this.signupForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            usuario: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
        })
    }

    // submit() {
    //     if (this.validate()) {
    //         this.loginService.signup(this.signupForm.value.name, this.signupForm.value.usuario, this.signupForm.value.password).subscribe({
    //             next: () => this.toastService.success("Login feito com sucesso!"),
    //             error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
    //         })
    //     }
    // }

    validate() {
        if (this.signupForm.valid) {
            this.showMenssageErrorPassword = false;
            this.showMenssageErrorusuario = false;
            return true;
        } else {
            this.showMenssageErrorPassword = this.signupForm.value.password != this.signupForm.value.passwordConfirm;
            this.showMenssageErrorusuario = (this.signupForm.value.usuario != "" && !this.signupForm.value.usuario.includes("@"));
            return false;
        }
    }


    navigate() {
        this.router.navigate(["login"])
    }
}
