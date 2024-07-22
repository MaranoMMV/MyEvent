import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoginService } from '../../../../services/login.service';
import { ClienteService } from '../../../../services/cliente.service';
import { Cliente } from '../../Cliente';
import { VendedoresService } from '../../../../services/vendedores.service';
import { EventoService } from '../../../../services/evento.service';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDialogComponent } from '../../cliente-dialog/cliente-dialog.component';
import { Evento } from '../../../evento/Evento';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CustomInterceptor } from '../../../../custom.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-cliente-por-evento',
  standalone: true,
  imports: [MatIconModule, MatSelectModule, RouterModule, MatTableModule, MatButtonModule,  MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective],
  templateUrl: './cliente-por-evento.component.html',
  styleUrl: './cliente-por-evento.component.scss',
  providers: [LoginService, ClienteService, { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }, provideNgxMask() ]
})
export class ClientePorEventoComponent implements OnInit {
  clienteSelecionado!: Cliente;
  formularioPorEvento!: FormGroup;
  clientesPorEventoDataSouorce!: MatTableDataSource<Cliente>;
  clientesEventoInteresseHojeDataSource!: MatTableDataSource<Cliente>;
  clientesEventoInteresseOntemDataSource!: MatTableDataSource<Cliente>;

  eventos: Evento[] = [];
  displayedColumns: string[] = ['id', 'nome', 'razao', 'vendedor', 'cnpj', 'editar', 'view'];



  constructor( private vendedorService: VendedoresService,private eventoService: EventoService, private clienteService: ClienteService, private loginService: LoginService, private dialog: MatDialog, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.montarFormularioPorEvento()
    this.buscarOpcoesDeEventos(); 
  }

  
  buscarOpcoesDeEventos() {
    this.eventoService.list().subscribe((response: any) => {
      this.eventos = response;
    });
  }

  montarFormularioPorEvento() {
    this.formularioPorEvento = this.fb.group({
      eventoId: [''],
    });
  }

  preparaDeleteShow(event: Event, cliente: Cliente) {
    event.preventDefault(); // Evita a execução do evento padrão do <a>
    this.dialog.open(ClienteDialogComponent, {
      width: '600px',
      maxHeight: '80vh',
      data: cliente
    });
    this.clienteSelecionado = cliente;
  }

  onSubmitEvento() {
    const id = this.loginService.getUserId();
    if (this.formularioPorEvento.valid) { // Validar se o formulário é válido antes de prosseguir
      const formValues = this.formularioPorEvento.value;
      this.eventoService.listEventosClientes(formValues.eventoId, Number(id)).subscribe((resposta: any[]) => {
        (resposta);
        this.clientesPorEventoDataSouorce = new MatTableDataSource<any>(resposta); // Remova os colchetes aqui
      });
    } else {
      ("Formulário inválido");
    }
  }

}
