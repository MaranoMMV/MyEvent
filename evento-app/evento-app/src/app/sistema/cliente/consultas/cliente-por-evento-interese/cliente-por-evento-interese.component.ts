import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Cliente } from '../../Cliente';
import { Evento } from '../../../evento/Evento';
import { CustomInterceptor } from '../../../../custom.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from '../../../../services/login.service';
import { ClienteService } from '../../../../services/cliente.service';
import { EventoService } from '../../../../services/evento.service';
import { ClienteDialogComponent } from '../../cliente-dialog/cliente-dialog.component';
import { VendedoresService } from '../../../../services/vendedores.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-cliente-por-evento-interese',
  standalone: true,
  imports: [MatIconModule, MatSelectModule, RouterModule, MatTableModule, MatButtonModule,  MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatTabsModule,],
  templateUrl: './cliente-por-evento-interese.component.html',
  styleUrl: './cliente-por-evento-interese.component.scss',
  providers: [EventoService, ClienteService , LoginService, { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }, provideNgxMask()]
})
export class ClientePorEventoIntereseComponent implements OnInit{
  clienteSelecionado!: Cliente;

  eventos: Evento[] = [];
  displayedColumns: string[] = ['id', 'nome', 'razao', 'vendedor', 'cnpj', 'editar', 'view'];

  formularioPorEventoInteresse!: FormGroup;
  clientesEventoInteresseHojeDataSource!: MatTableDataSource<Cliente>;
  clientesEventoInteresseOntemDataSource!: MatTableDataSource<Cliente>;
  clientesPorEventoInteresseDataSouorce!: MatTableDataSource<Cliente>;
  constructor( private vendedorService: VendedoresService,private eventoService: EventoService, private clienteService: ClienteService, private loginService: LoginService, private dialog: MatDialog, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.listarClientesInteressadosEventoHojeEOntem();
    this.montarFormularioPorEventoInteresse();
    this.buscarOpcoesDeEventos();
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

  buscarOpcoesDeEventos() {
    this.eventoService.list().subscribe((response: any) => {
      this.eventos = response;
    });
  }
  listarClientesInteressadosEventoHojeEOntem(){
    const idVendedor = this.loginService.getUserId();
    this.clienteService.consultaClientesCadastradosHoje(Number(idVendedor)).subscribe( (response: any) => {
      this.clientesEventoInteresseHojeDataSource = response;
    }
    )
    this.clienteService.consultaClientesCadastradosOntem(Number(idVendedor)).subscribe( (response: any) => {

      
      this.clientesEventoInteresseOntemDataSource = response;
    })
  }
  montarFormularioPorEventoInteresse() {
    this.formularioPorEventoInteresse = this.fb.group({
      eventoId: [''],
    });
  }

  onSubmitEventoInteresse() {
    const id = this.loginService.getUserId();
    if (this.formularioPorEventoInteresse.valid) { // Validar se o formulário é válido antes de prosseguir
      const formValues = this.formularioPorEventoInteresse.value;
      this.eventoService.listEventosClientesInteresse(formValues.eventoId, Number(id)).subscribe((resposta: any[]) => {
        (resposta);
        this.clientesPorEventoInteresseDataSouorce = new MatTableDataSource<any>(resposta); // Remova os colchetes aqui
      });
    } else {
      ("Formulário inválido");
    }
  }

}
