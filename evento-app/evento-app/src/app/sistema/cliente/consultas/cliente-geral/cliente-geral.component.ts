import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../Cliente';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EventoService } from '../../../../services/evento.service';
import { VendedoresService } from '../../../../services/vendedores.service';
import { ClienteService } from '../../../../services/cliente.service';
import { LoginService } from '../../../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClienteDialogComponent } from '../../cliente-dialog/cliente-dialog.component';

@Component({
  selector: 'app-cliente-geral',
  standalone: true,
  imports: [MatIconModule, RouterModule, MatTableModule, MatButtonModule,  MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './cliente-geral.component.html',
  styleUrl: './cliente-geral.component.scss'
})
export class ClienteGeralComponent implements OnInit{

  clienteSelecionado!: Cliente;
  clientes: Cliente[] = [];
  cliente?: Cliente;
  constructor( private vendedorService: VendedoresService,private eventoService: EventoService, private clienteService: ClienteService, private loginService: LoginService, private dialog: MatDialog, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  displayedColumns: string[] = ['id', 'nome', 'razao', 'vendedor', 'cnpj', 'editar', 'view'];

  clienteDataSouorce!: MatTableDataSource<Cliente>;
  ngOnInit(): void {
    this.listarContatos();
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

}
