import { Component } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router, RouterModule, RouterOutlet } from '@angular/router';

import { Observable } from 'rxjs';
import { VendedoresService } from '../../../services/vendedores.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { DepartamentoService } from '../../../services/departamento.service';
import { Departamento } from '../../departamento/Departamento';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cliente } from '../Cliente';
import { ClienteService } from '../../../services/cliente.service';
import { ClienteDialogComponent } from '../cliente-dialog/cliente-dialog.component';
import { LoginService } from '../../../services/login.service';
import { CustomInterceptor } from '../../../custom.interceptor';
import { NgxMaskDirective, IConfig, provideNgxMask } from 'ngx-mask';
import { Evento } from '../../evento/Evento';
import { EventoService } from '../../../services/evento.service';
import { Vendedor } from '../../vendedores/Vendedor';
import { response } from 'express';
import { ClienteSemVinculoComponent } from '../consultas/cliente-sem-vinculo/cliente-sem-vinculo.component';
import { ClienteCnpjComponent } from '../consultas/cliente-cnpj/cliente-cnpj.component';
import { ClienteIdComponent } from '../consultas/cliente-id/cliente-id.component';
import { ClientePorEventoComponent } from '../consultas/cliente-por-evento/cliente-por-evento.component';
import { ClientePorEventoIntereseComponent } from '../consultas/cliente-por-evento-interese/cliente-por-evento-interese.component';
import { ClientePorVendedorComponent } from '../consultas/cliente-por-vendedor/cliente-por-vendedor.component';
import { ClienteGeralComponent } from '../consultas/cliente-geral/cliente-geral.component';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [MatTabsModule
    , HttpClientModule,
    RouterModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
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
    NgxMaskDirective,
    ClienteSemVinculoComponent,
    ClienteCnpjComponent,
    ClienteIdComponent,
    ClientePorEventoComponent,
    ClientePorEventoIntereseComponent,
    ClientePorVendedorComponent,
    ClienteGeralComponent
  ],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss',
  providers: [EventoService, ClienteService, LoginService, { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }, provideNgxMask()]
})
export class ClienteListComponent {

  id?: number;

  formularioPorId!: FormGroup;
  formularioPorEvento!: FormGroup;
  formularioPorEventoInteresse!: FormGroup;
  formularioPorVendedor!: FormGroup;
  procurarId!: FormGroup;

  clienteSelecionado!: Cliente;

  clientes: Cliente[] = [];
  clientePorCnpj: Cliente[] = [];
  cliente?: Cliente;

  evento!: Evento;
  eventos: Evento[] = [];
  vendedores: Vendedor[] = [];


  clienteDataSouorce!: MatTableDataSource<Cliente>;
 
  clientePorIdDataSouorce!: MatTableDataSource<Cliente>;
  clientesPorEventoDataSouorce!: MatTableDataSource<Cliente>;
  clientesPorVendedorDataSouorce!: MatTableDataSource<Cliente>;
  clientesPorEventoInteresseDataSouorce!: MatTableDataSource<Cliente>;
  clientesEventoInteresseHojeDataSource!: MatTableDataSource<Cliente>;
  clientesEventoInteresseOntemDataSource!: MatTableDataSource<Cliente>;

  constructor( private vendedorService: VendedoresService,private eventoService: EventoService, private clienteService: ClienteService, private loginService: LoginService, private dialog: MatDialog, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarContatos();
    // this.listarClientesSemVinculoVendedor();

    this.montarFormularioPorId();
    this.montarFormularioPorEvento() 
    this.buscarOpcoesDeEventos();
    this.montarFormularioPorEventoInteresse();
    this.buscarOpcoesDeVendedor();
    this.montarFormularioPorVendedor();
    this.listarClientesInteressadosEventoHojeEOntem();


    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];

      // if (this.id) {
      //   this.clienteService.procurarPorId(this.id).subscribe(
      //     response => {
      //       this.cliente = response;
      //       if (this.formularioPorCNPJ.patchValue(this.cliente) == null) {

      //         this.formularioPorId.patchValue(this.cliente);
      //       } else {

      //         this.formularioPorCNPJ.patchValue(this.cliente);
      //       }
      //       // Inicializa os valores do formulário
      //     }
      //   );
      // }
    });
  }

  buscarOpcoesDeEventos() {
    this.eventoService.list().subscribe((response: any) => {
      this.eventos = response;
    });
  }

  buscarOpcoesDeVendedor(){
    this.vendedorService.listagem().subscribe((response: any) => {
      this.vendedores = response;
    });
  }

  

  // montarFormularioPorCnpj() {
  //   this.formularioPorCNPJ = this.fb.group({
  //     cnpj: [''],
  //   });
  // }

  montarFormularioPorVendedor() {
    this.formularioPorVendedor = this.fb.group({
      idVendedor: [''],
    });
  }


  montarFormularioPorId() {
    this.formularioPorId = this.fb.group({
      id: [''],
    });
  }

  montarFormularioPorEvento() {
    this.formularioPorEvento = this.fb.group({
      eventoId: [''],
    });
  }
  montarFormularioPorEventoInteresse() {
    this.formularioPorEventoInteresse = this.fb.group({
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

  displayedColumns: string[] = ['id', 'nome', 'razao', 'vendedor', 'cnpj', 'editar', 'view'];

  listarContatos() {
    const id = this.loginService.getUserId();
    if (id !== null) {
      this.clienteService.list(Number(id)).subscribe(
        (response: any) => {

          this.clienteDataSouorce = new MatTableDataSource<any>(response);
        },
      );
    } else {
      // Trate o caso em que id é null
      console.error("ID do usuário não está disponível.");
    }
  }

  // listarClientesSemVinculoVendedor() {
  //   const id = this.loginService.getUserId();
  //   if (id !== null) {
  //     this.clienteService.buscarClientesSemVinculoVendedor(Number(id)).subscribe(
  //       (response: any) => {

  //         this.clienteSemVinculoDataSorce = new MatTableDataSource<any>(response);
  //       },
  //     );
  //   } else {
  //     // Trate o caso em que id é null
  //     console.error("ID do usuário não está disponível.");
  //   }

  // }

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

  // onSubmitCNPJ() {
  //   const id = this.loginService.getUserId();
  //   if (this.formularioPorCNPJ.value && id !== null) {

  //     const formValues = this.formularioPorCNPJ.value;
  //     const formattedCnpj = formValues.cnpj;
  //     (formattedCnpj)
  //     this.clienteService.procurarClientePorCNPJ(Number(id), formattedCnpj).subscribe((resposta: Cliente) => {
  //       this.clientePorCnpjDataSouorce = new MatTableDataSource<Cliente>([resposta]);
  //     });
  //   } else {
  //     ("Not Found")
  //   }

  // }

  onSubmitId() {
    if (this.formularioPorId.value) {
      const formValues = this.formularioPorId.value;
      this.clienteService.procurarPorId(formValues.id).subscribe((resposta: Cliente) => {
        this.clientePorIdDataSouorce = new MatTableDataSource<Cliente>([resposta]);
      });
    } else {
      ("Not Found")
    }

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

  onSubmitClientePorVendedorInteresse(){
    const idLogin = this.loginService.getUserId();
    if (this.formularioPorVendedor.valid) { // Validar se o formulário é válido antes de prosseguir
      const formValues = this.formularioPorVendedor.value;
      this.clienteService.procurarClientePorVendedor(formValues.idVendedor, Number(idLogin)).subscribe((resposta: any[]) => {
        (resposta);
        this.clientesPorVendedorDataSouorce = new MatTableDataSource<any>(resposta); // Remova os colchetes aqui
      });
    } else {
      ("Formulário inválido");
    }
  }
  
  //Mascaras de formatação
  
}
