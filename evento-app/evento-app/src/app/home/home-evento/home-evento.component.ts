import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../sistema/evento/Evento';
import { LocalService } from '../../services/local.service';
import { HorarioService } from '../../services/horario.service';
import { Local } from '../../sistema/evento/Local';
import { provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-home-evento',
  standalone: true,
  imports: [],
  templateUrl: './home-evento.component.html',
  styleUrl: './home-evento.component.scss',
  providers: [EventoService, LocalService, HorarioService]
})
export class HomeEventoComponent implements OnInit{

  evento!: Evento;
  locais!: Local[];

  constructor(private horarioService: HorarioService, private localService: LocalService, private horarioSerivce: HorarioService, private eventoService: EventoService){}

  ngOnInit(): void {
    this.buscarUltimoEvento();

    
  }


  buscarUltimoEvento(){
    this.eventoService.ultimoEvento().subscribe((response: any) => {
      this.evento = response;
      this.buscarLocaisEvento();
    })
  }

  buscarLocaisEvento(){
    this.localService.listLocaisPorEvento(this.evento.id).subscribe((response: any) => {
      this.locais = response;

    })
  }  

}
