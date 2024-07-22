import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule, RouterOutlet } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cliente } from './../../Cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { LoginService } from '../../../../services/login.service';
import { ClienteListComponent } from '../../cliente-list/cliente-list.component';
import { MatIconModule } from '@angular/material/icon';
import { ClienteDialogComponent } from '../../cliente-dialog/cliente-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from '../../../../custom.interceptor';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';



@Component({
  selector: 'app-cliente-sem-vinculo',
  standalone: true,
  imports: [MatIconModule, RouterModule, MatTableModule, MatButtonModule, NgxMaskDirective],
  templateUrl: './cliente-sem-vinculo.component.html',
  styleUrl: './cliente-sem-vinculo.component.scss',
  providers: [ClienteService,  { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }, provideNgxMask()]

})
export class ClienteSemVinculoComponent implements OnInit{
  clienteSelecionado!: Cliente;
  clienteSemVinculoDataSorce!: MatTableDataSource<Cliente>;
  
  displayedColumns: string[] = ['id', 'nome', 'razao', 'vendedor', 'cnpj', 'editar', 'view'];

  constructor(private activatedRoute: ActivatedRoute,private dialog: MatDialog,private loginService: LoginService, private clienteService: ClienteService
  ) {
  }

   ngOnInit(): void {
    this.listarClientesSemVinculoVendedor();
  }

  
  listarClientesSemVinculoVendedor() {
    const id = this.loginService.getUserId();
    if (id !== null) {
      this.clienteService.buscarClientesSemVinculoVendedor(Number(id)).subscribe(
        (response: any) => {
          this.clienteSemVinculoDataSorce = new MatTableDataSource<any>(response);
        },
      );
    } else {
      // Handle case where id is null
      console.error("ID do usuário não está disponível.");
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
