import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SistemaMenuComponent } from './sistema/template/menu/sistema-menu.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DefaultLoginLayoutComponent } from './login/components/default-login-layout/default-login-layout.component';
import { LoginComponent } from './login/pages/login/login.component';
import { PrimaryInputComponent } from './login/components/primary-input/primary-input.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
// import { customInterceptor } from './custom.interceptor';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SistemaMenuComponent,
    HttpClientModule,
    PrimaryInputComponent,
    ToastrModule, // Certifique-se de inicializar o ToastrModule corretamente
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    ToastrService,
    // { provide: HTTP_INTERCEPTORS, useValue: customInterceptor, multi: true }
  ]
})
export class AppComponent {
  title = 'evento-app';
}
