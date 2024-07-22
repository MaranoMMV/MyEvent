import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../../services/login.service';
import { ClienteService } from '../../../../services/cliente.service';
import { Cliente } from '../../Cliente';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDialogComponent } from '../../cliente-dialog/cliente-dialog.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CustomInterceptor } from '../../../../custom.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-cliente-id',
  standalone: true,
  imports: [MatIconModule, RouterModule, MatTableModule, MatButtonModule,  MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective],
  templateUrl: './cliente-id.component.html',
  styleUrl: './cliente-id.component.scss',
  providers: [LoginService, ClienteService,  { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }, provideNgxMask()]
})
export class ClienteIdComponent implements OnInit {
  clienteSelecionado!: Cliente;
  formularioPorId!: FormGroup;
 
  clientePorIdDataSouorce!: MatTableDataSource<Cliente>;
  displayedColumns: string[] = ['id', 'nome', 'razao', 'vendedor', 'cnpj', 'editar', 'view'];
  constructor(private loginService: LoginService, private clienteService: ClienteService, private dialog: MatDialog, private fb: FormBuilder){
  }
  ngOnInit(): void {
this.montarFormularioPorId();
  }

  montarFormularioPorId() {
    this.formularioPorId = this.fb.group({
      id: [''],
    });
  }

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

  preparaDeleteShow(event: Event, cliente: Cliente) {
    event.preventDefault(); // Evita a execução do evento padrão do <a>
    this.dialog.open(ClienteDialogComponent, {
      width: '600px',
      maxHeight: '80vh',
      data: cliente
    });
    this.clienteSelecionado = cliente;
  }

}
