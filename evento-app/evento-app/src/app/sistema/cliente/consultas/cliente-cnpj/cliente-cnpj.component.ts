import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../../services/login.service';
import { ClienteService } from '../../../../services/cliente.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../Cliente';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDialogComponent } from '../../cliente-dialog/cliente-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cliente-cnpj',
  standalone: true,
  imports: [MatIconModule, RouterModule, MatTableModule, MatButtonModule,  MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './cliente-cnpj.component.html',
  styleUrl: './cliente-cnpj.component.scss',
  providers: [LoginService, ClienteService]
})
export class ClienteCnpjComponent implements OnInit{
  clienteSelecionado!: Cliente;
  formularioPorCNPJ!: FormGroup;
  clientePorCnpjDataSouorce!: MatTableDataSource<Cliente>;
  displayedColumns: string[] = ['id', 'nome', 'razao', 'vendedor', 'cnpj', 'editar', 'view'];
  constructor(private loginService: LoginService, private clienteService: ClienteService, private dialog: MatDialog, private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.montarFormularioPorCnpj();
  }

  montarFormularioPorCnpj() {
    this.formularioPorCNPJ = this.fb.group({
      cnpj: [''],
    });
  }

  onSubmitCNPJ() {
    const id = this.loginService.getUserId();
    if (this.formularioPorCNPJ.value && id !== null) {

      const formValues = this.formularioPorCNPJ.value;
      const formattedCnpj = formValues.cnpj;
      (formattedCnpj)
      this.clienteService.procurarClientePorCNPJ(Number(id), formattedCnpj).subscribe((resposta: Cliente) => {
        this.clientePorCnpjDataSouorce = new MatTableDataSource<Cliente>([resposta]);
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
