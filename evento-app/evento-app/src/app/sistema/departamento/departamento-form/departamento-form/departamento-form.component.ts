import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { Departamento } from '../../Departamento';
import { DepartamentoService } from '../../../../services/departamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-departamento-form',
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
  templateUrl: './departamento-form.component.html',
  styleUrl: './departamento-form.component.scss',
  providers: [DepartamentoService, LoginService]
})
export class DepartamentoFormComponent {

  formulario!: FormGroup;
  id?: number;
  departamento?: Departamento;
  departamentos: Departamento[] = []


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private departamentoService: DepartamentoService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.buscarOpcoesDeDepartamento();

    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];

      if (this.id) {
        this.departamentoService.procurarPorId(this.id).subscribe(
          response => {
            this.departamento = response;
            this.formulario.get('id')?.setValue(this.departamento?.id);
            this.formulario.patchValue(this.departamento); // Inicializa os valores do formulário
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
    this.departamentoService.list(Number(id)).subscribe((response: any) => {
      this.departamentos = response;
    });
  }


  onSubmit() {
    if (this.id) {
      const formValues = this.formulario.value;
      const departamento: Departamento = new Departamento(
        formValues.id,
        formValues.nome,
      );
      (departamento);
      this.departamentoService.atualizar(departamento)
        .subscribe(response => {
          this.openSnackBar("Vendedor Editado com sucesso!!", "fechar");
          this.router.navigate(['sistema/departamento']);
        });
    } else {
      const formValues = this.formulario.value;
      const departamento: Departamento = new Departamento(
        formValues.id,
        formValues.nome,
      );
      (departamento);


      const id = this.loginService.getUserId();
      if(id){
        this.departamentoService.save(id, departamento).subscribe(resposta => {
          let lista: Departamento[] = [...this.departamentos, resposta];
          this.departamentos = lista;
          this.openSnackBar("Vendedor Criado com sucesso!!", "fechar");
          this.router.navigate(['sistema/departamento']);
        });
      }
      
    }
  }

  voltarListagem() {
    this.router.navigate(['sistema/departamento']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
