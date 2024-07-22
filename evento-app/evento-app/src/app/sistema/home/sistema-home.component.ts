import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-sistema-home',
  standalone: true,
  imports: [SistemaHomeComponent, HttpClientModule],
  templateUrl: './sistema-home.component.html',
  styleUrl: './sistema-home.component.scss'
})
export class SistemaHomeComponent {

}
