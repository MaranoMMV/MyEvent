import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Params, RouterModule, RouterOutlet } from '@angular/router';
import { Departamento } from './Departamento';
import { DepartamentoService } from '../../services/departamento.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CustomInterceptor } from '../../custom.interceptor';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-departamento',
  standalone: true,
  imports: [MatTabsModule ,HttpClientModule, RouterModule, RouterOutlet ,MatButtonModule, MatIconModule, MatListModule, MatTableModule],
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.scss',
  providers: [DepartamentoService, { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }, LoginService]
})
export class DepartamentoComponent implements OnInit{

  id?: number;
  formulario!: FormGroup;
  procurarId!: FormGroup;

  departamentos: Departamento[] = [];
  departamento?: Departamento;

  constructor( private loginService: LoginService,private vendedorService: DepartamentoService , private activatedRoute: ActivatedRoute,private fb: FormBuilder){}
  departamentoDataSource!: MatTableDataSource<Departamento>;

  ngOnInit(): void {
    this.listarContatos();
    this.montarFormulario();
    
      
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];

      if (this.id) {
        this.vendedorService.procurarPorId(this.id).subscribe(
          response => {
            this.departamento = response;
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
    });
  }



  displayedColumns: string[] = ['id', 'nome', 'editar'];

  listarContatos(){
    const id = this.loginService.getUserId();
    if(id){
      this.vendedorService.list(id).subscribe(
        (response: any) => {
          (response)
          this.departamentoDataSource = new MatTableDataSource<any>(response);
        },
      );
    }

  }
}

