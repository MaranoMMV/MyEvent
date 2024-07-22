import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { EventoService } from '../../../services/evento.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home-menu',
  standalone: true,
  imports: [RouterModule,HttpClientModule,RouterOutlet ,MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule],
  templateUrl: './home-menu.component.html',
  styleUrl: './home-menu.component.scss'
})
export class HomeMenuComponent {
  constructor(private eventoService: EventoService , private activatedRoute: ActivatedRoute,private fb: FormBuilder){}

}
