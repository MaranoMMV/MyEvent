import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeMenuComponent } from '../template/home-menu/home-menu.component';
import { EventoService } from '../../services/evento.service';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { HomeFormComponent } from '../home-form/home-form.component';
import { HomeInformativosComponent } from '../home-informativos/home-informativos.component';
import { HomeEventoComponent } from '../home-evento/home-evento.component';
import { HomeFooterComponent } from '../template/home-footer/home-footer.component';
import { HomeCarouselComponent } from '../home-carousel/home-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    MatSelectModule,
    HttpClientModule,
    MatStepperModule,
    HomeFormComponent,
    HomeMenuComponent,
    HomeFormComponent,
    HomeInformativosComponent,
    HomeFooterComponent,
    HomeEventoComponent,
    HomeCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [EventoService]
})
export class HomeComponent {

}
