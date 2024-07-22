import { Component } from '@angular/core';
import { SistemaMenuComponent } from '../template/menu/sistema-menu.component';
import { DefaultLoginLayoutComponent } from '../../login/components/default-login-layout/default-login-layout.component';
import { LoginComponent } from '../../login/pages/login/login.component';
import { SistemaHomeComponent } from '../home/sistema-home.component';

@Component({
  selector: 'app-sistema',
  standalone: true,
  imports: [SistemaMenuComponent, LoginComponent, SistemaHomeComponent],
  templateUrl: './sistema.component.html',
  styleUrl: './sistema.component.scss'
})
export class SistemaComponent {

}
