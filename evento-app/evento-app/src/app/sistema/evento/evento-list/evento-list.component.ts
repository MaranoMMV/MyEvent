import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Evento } from '../Evento';
import { EventoService } from '../../../services/evento.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, RouterModule, RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CustomInterceptor } from '../../../custom.interceptor';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-evento-list',
  standalone: true,
  imports: [MatTabsModule ,HttpClientModule, RouterModule, RouterOutlet ,MatButtonModule, MatIconModule, MatListModule, MatTableModule],
  templateUrl: './evento-list.component.html',
  styleUrl: './evento-list.component.scss',
  providers: [LoginService, EventoService, { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },LoginService]
})
export class EventoListComponent {

  id?: number;
  formulario!: FormGroup;
  procurarId!: FormGroup;


  eventos: Evento[] = [];
  evento?: Evento;

  EventoLocalDataSouorce!: MatTableDataSource<Evento>;

  constructor(private loginService: LoginService, private eventoService: EventoService , private activatedRoute: ActivatedRoute,private fb: FormBuilder){}
  eventoDataSouorce!: MatTableDataSource<Evento>;

  ngOnInit(): void {
    this.listarContatos();
    this.montarFormulario();

    
      
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];

      if (this.id) {
        this.eventoService.procurarPorId(this.id).subscribe(
          response => {
            this.evento = response;
            this.formulario.patchValue(this.evento); // Inicializa os valores do formulário
          }
        );
      }
    });
  }
  buscarOpcoesDeEventos() {
    this.eventoService.list().subscribe((response: any) => {
      this.eventos = response;
    });
  }
  
  montarFormulario() {



    this.formulario = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
    });
  }



  displayedColumns: string[] = ['id', 'nome', 'data', 'editar'];

  listarContatos(){
    this.eventoService.list().subscribe(
      (response: any) => {
        (response)
        this.eventoDataSouorce = new MatTableDataSource<any>(response);
      },
    );
  }

 
}
