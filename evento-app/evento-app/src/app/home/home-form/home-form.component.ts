import { HttpClientModule } from '@angular/common/http';
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
import { Cliente } from '../../sistema/cliente/Cliente';
import { Evento } from '../../sistema/evento/Evento';
import { Vendedor } from '../../sistema/vendedores/Vendedor';
import { ClienteService } from '../../services/cliente.service';
import { EventoService } from '../../services/evento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HomeMenuComponent } from '../template/home-menu/home-menu.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-home-form',
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
    HomeMenuComponent],
  templateUrl: './home-form.component.html',
  styleUrl: './home-form.component.scss',
  providers: [EventoService, ClienteService,  provideNgxMask()]
})
export class HomeFormComponent {

  formulario!: FormGroup;
  id?: number;
  cliente?: Cliente;
  clientes: Cliente[] = [];
  evento!: Evento;

  ultimoEvento!: Evento;

  eventos: Evento[] = [];
  vendedores: Vendedor[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private eventoService: EventoService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.buscarUltimoEvento();

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

  buscarUltimoEvento(){
    this.eventoService.ultimoEvento().subscribe((response: any) => {
      this.ultimoEvento = response;
    })
  }

  montarFormulario() {
    this.formulario = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      razao: ['', Validators.required],
      telefone: ['', Validators.required], 
      idVendedor: [null], 
      nomeVendedor: ['', Validators.required], 
      cnpj: ['',  Validators.required],
      eventoId: ['', Validators.required],
      aceitaReceberEmails: ['']
    });
  }

  onSubmit() {
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
        formValues.aceitaReceberEmails,
      );
      this.clienteService.save(cliente).subscribe(resposta => {
        let lista: Cliente[] = [...this.clientes, resposta];
        this.clientes = lista;
        this.openSnackBar("Você foi incluido com sucesso!", "fechar");
        this.router.navigate(['']);
      });
    
  }

  voltarListagem() {
    this.router.navigate(['']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
