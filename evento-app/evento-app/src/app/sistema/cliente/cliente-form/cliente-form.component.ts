import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Cliente } from '../Cliente';
import { ClienteService } from '../../../services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EventoService } from '../../../services/evento.service';
import { Evento } from '../../evento/Evento';
import { Vendedor } from '../../vendedores/Vendedor';
import { VendedoresService } from '../../../services/vendedores.service';
import { CustomInterceptor } from '../../../custom.interceptor';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-cliente-form',
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
    NgxMaskDirective,
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss',
  providers: [ClienteService, EventoService, VendedoresService, { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }, provideNgxMask()]
})
export class ClienteFormComponent {

  formulario!: FormGroup;
  id?: number;
  cliente?: Cliente;
  clientes: Cliente[] = [];

  eventos: Evento[] = [];
  vendedores: Vendedor[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private eventoService: EventoService,
    private vendedorService: VendedoresService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.buscarOpcoesDeEventos();
    this.buscarOpcoesDeVendedor();

    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];

      if (this.id) {
        this.clienteService.procurarPorId(this.id).subscribe(
          response => {
            this.cliente = response;
            this.formulario.get('id')?.setValue(this.cliente?.id);
            this.formulario.patchValue(this.cliente); // Inicializa os valores do formulário
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

  buscarOpcoesDeVendedor(){
    this.vendedorService.listagem().subscribe((response: any) => {
      this.vendedores = response;
    });
  }

  montarFormulario() {
    this.formulario = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      razao: ['', Validators.required],
      telefone: ['', Validators.required], 
      idVendedor: ['', Validators.required], 
      cnpj: ['',  Validators.required],
      eventoId: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.id) {
      const formValues = this.formulario.value;
      const cliente: Cliente = new Cliente(
        formValues.id,
        formValues.nome,
        formValues.email,
        formValues.razao,
        formValues.telefone,
        formValues.idVendedor,
        formValues.nomeVendedor,

        formValues.cnpj,
        formValues.dataCadastro,
        formValues.aceitaReceberEmaisl,
      );
      console.log(cliente)
      this.clienteService.atualizar(cliente)
        .subscribe(response => {
          this.openSnackBar("cliente Editado com sucesso!!", "fechar");
          this.router.navigate(['sistema/cliente']);
        });
    } else {
      const formValues = this.formulario.value;
      const cliente: Cliente = new Cliente(
        formValues.id,
        formValues.nome,
        formValues.email,
        formValues.razao,
        formValues.telefone,
        formValues.idVendedor,
        formValues.nomeVendedor,

        formValues.cnpj,
        formValues.dataCadastro,
        formValues.aceitaReceberEmaisl,
      );

      this.clienteService.save(cliente).subscribe(resposta => {
        let lista: Cliente[] = [...this.clientes, resposta];
        this.clientes = lista;
        this.openSnackBar("cliente Criado com sucesso!!", "fechar");
        this.router.navigate(['sistema/cliente']);
      });
    }
  }

  voltarListagem() {
    this.router.navigate(['sistema/cliente']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
