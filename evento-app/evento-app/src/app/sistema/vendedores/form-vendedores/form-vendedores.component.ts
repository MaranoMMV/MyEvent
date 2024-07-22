import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

import { Observable } from 'rxjs';
import { VendedoresService } from '../../../services/vendedores.service';
import { Vendedor } from '../Vendedor';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { DepartamentoService } from '../../../services/departamento.service';
import { Departamento } from '../../departamento/Departamento';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-form-vendedores',
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
    MatStepperModule],
  templateUrl: './form-vendedores.component.html',
  styleUrl: './form-vendedores.component.scss',
  providers: [VendedoresService, DepartamentoService, LoginService]
})
export class FormVendedoresComponent {

  formulario!: FormGroup;
  id?: number;
  vendedor?: Vendedor;
  vendedores: Vendedor[] = [];
  departamentos: Departamento[] = []


  constructor(
    private fb: FormBuilder,
    private vendedoresService: VendedoresService,
    private departamentoService: DepartamentoService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.buscarOpcoesDeDepartamento();

    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];

      if (this.id) {
        this.vendedoresService.procurarPorId(this.id).subscribe(
          response => {
            this.vendedor = response;
            this.formulario.get('id')?.setValue(this.vendedor?.id);
            this.formulario.patchValue(this.vendedor); // Inicializa os valores do formulário
          }
        );
      }
    });
  }

  montarFormulario() {
    this.formulario = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      role: ['', Validators.required],
      departamentoId: ['', Validators.required], 
      departamento: ['', Validators.required], 
      usuario: ['',  Validators.required],
      password: ['', Validators.required],
      status: [''],
    });
  }

  buscarOpcoesDeDepartamento() {
    const id = this.loginService.getUserId();
    if(id){
      this.departamentoService.list(id).subscribe((response: any) => {
        this.departamentos = response;
      });
    }

  }


  onSubmit() {
    if (this.id) {
      const formValues = this.formulario.value;
      const vendedor: Vendedor = new Vendedor(
        formValues.id,
        formValues.nome,
        formValues.role,
        formValues.departamento,
        formValues.usuario,
        formValues.password,
        formValues.status,
      );
      (vendedor);
      this.vendedoresService.atualizar(vendedor)
        .subscribe(response => {
          this.openSnackBar("Vendedor Editado com sucesso!!", "fechar");
          this.router.navigate(['sistema/vendedores']);
        });
    } else {
      const formValues = this.formulario.value;
      const vendedor: Vendedor = new Vendedor(
        formValues.id,
        formValues.nome,
        formValues.role,
        formValues.departamentoId,
        formValues.usuario,
        formValues.password,
        formValues.status,
      );
      (vendedor);
      const id = this.loginService.getUserId();
      if(id){
        this.vendedoresService.save(id, vendedor).subscribe(resposta => {
          let lista: Vendedor[] = [...this.vendedores, resposta];
          this.vendedores = lista;
          this.openSnackBar("Vendedor Criado com sucesso!!", "fechar");
          this.router.navigate(['sistema/vendedores']);
        });
      }

    }
  }

  voltarListagem() {
    this.router.navigate(['sistema/vendedores']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
