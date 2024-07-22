import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Vendedor, VendedorDTO } from './Vendedor';
import { VendedoresService } from '../../services/vendedores.service';
import { MatListModule } from '@angular/material/list';

import { ActivatedRoute, Params, Router, RouterModule, RouterOutlet } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMaskDirective } from 'ngx-mask';



@Component({
  selector: 'app-vendedores',
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
    NgxMaskDirective],
  templateUrl: './vendedores.component.html',
  styleUrl: './vendedores.component.scss',
  providers: [VendedoresService, HttpClientModule, LoginService]
})
export class VendedoresComponent implements OnInit {

  id?: number;
  formulario!: FormGroup;
  formularioPorNome!: FormGroup;
  procurarId!: FormGroup;

  vendedorSelecionada!: Vendedor;

  vendedores: VendedorDTO[] = [];
  vendedor?: Vendedor;

  vendedorDataSouorce!: MatTableDataSource<Vendedor>;
  vendedorAtivoDataSouorce!: MatTableDataSource<Vendedor>;
  vendedorInativoDataSouorce!: MatTableDataSource<Vendedor>;
  vendedorPorNomeDataSouorce!: MatTableDataSource<Vendedor>;

  constructor(private vendedorService: VendedoresService, private loginService: LoginService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarContatos();
    this.montarFormulario();
    this.listarContatosAtivos();
    this.listarContatosInativos();
    this.montarFormularioPorNome();


    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];

      if (this.id) {
        this.vendedorService.procurarPorId(this.id).subscribe(
          response => {
            this.vendedor = response;
            if (this.formularioPorNome.patchValue(this.vendedor) == null) {

              this.formulario.patchValue(this.vendedor); // Inicializa os valores do formulário
            } else {
              this.formularioPorNome.patchValue(this.vendedor); // Inicializa os valores do formulário

            }



          }
        );
      }
    });
  }



  montarFormularioPorNome() {
    this.formularioPorNome = this.fb.group({
      nome: [''],
    });
  }
  montarFormulario() {
    this.formulario = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      role: ['', Validators.required],
      departamento: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      status: [''],
    });
  }



  displayedColumns: string[] = ['id', 'nome', 'role', 'departamento', 'usuario', 'status', 'editar'];

  listarContatos() {
    const id = this.loginService.getUserId();
    if (id !== null) {
      this.vendedorService.list(Number(id)).subscribe(
        (response: any) => {
          (response)
          this.vendedorDataSouorce = new MatTableDataSource<any>(response);
        },
      );
    }
  }

  listarContatosAtivos() {
    const id = this.loginService.getUserId();
    if (id !== null) {
      this.vendedorService.listagemVendedorAtivo(Number(id)).subscribe(
        (response: any) => {
          (response)
          this.vendedorAtivoDataSouorce = new MatTableDataSource<any>(response);
        },
      );
    }
  }

  listarContatosInativos() {
    const id = this.loginService.getUserId();
    if (id !== null) {
      this.vendedorService.listagemVendedorInativo(Number(id)).subscribe(
        (response: any) => {
          (response)
          this.vendedorInativoDataSouorce = new MatTableDataSource<any>(response);
        },
      );
    }
  }




  listarClientesSemVinculoVendedor() {
    const id = this.loginService.getUserId();
    if (id !== null) {
      this.vendedorService.list(Number(id)).subscribe(
        (response: any) => {
          (response)
          this.vendedorDataSouorce = new MatTableDataSource<any>(response);
        },
      );
    } else {
      // Trate o caso em que id é null
      console.error("ID do usuário não está disponível.");
    }

  }

  onSubmitNome() {
    const id = this.loginService.getUserId();
    if (this.formularioPorNome.value && id !== null) {
      const formValues = this.formularioPorNome.value;
      const formattedNome = formValues.nome;
      this.vendedorService.procurarClientePorNome(Number(id), formattedNome).subscribe((resposta: Vendedor[]) => {
        this.vendedorPorNomeDataSouorce = new MatTableDataSource<any>(resposta);
      
      }  
    )
  }
}
}
