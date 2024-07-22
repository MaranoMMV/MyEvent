import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente, ClienteDTO } from '../Cliente';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { VendedoresService } from '../../../services/vendedores.service';
import { Vendedor } from '../../vendedores/Vendedor';
import { CustomInterceptor } from '../../../custom.interceptor';

@Component({
  selector: 'app-cliente-dialog',
  standalone: true,
  imports: [MatTabsModule,MatIconModule,MatSnackBarModule,MatCardModule, RouterModule, HttpClientModule, MatButtonModule, MatTabsModule ,HttpClientModule, RouterModule, RouterOutlet ,MatButtonModule, MatIconModule, MatListModule, MatTableModule],
  templateUrl: './cliente-dialog.component.html',
  styleUrl: './cliente-dialog.component.scss',
  providers: [ClienteService,{ provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }]
})
export class ClienteDialogComponent implements OnInit {
  dialog: any;

  id!:number;

  vendedor!: Vendedor
  displayedColumns: string[] = ['id', 'nome'];

  EventosPorClienteDataSouorce!: MatTableDataSource<Cliente>;
  EventosInteressadoPorClienteDataSouorce!: MatTableDataSource<Cliente>

  constructor(
    public dialogRef: MatDialogRef<ClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public cliente: ClienteDTO,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.listarEventoPorCliente();
    this.listarEventoInteressePorCliente();
    this.id = this.cliente.id
  }

  listarEventoPorCliente(){
    this.clienteService.buscarTodosEventosPorCliente(this.cliente.id).subscribe(
      (response: any) => {
        this.EventosPorClienteDataSouorce = new MatTableDataSource<any>(response);
      },
    );
  }

  listarEventoInteressePorCliente(){
    this.clienteService.buscarTodosEventosInteressePorCliente(this.cliente.id).subscribe(
      (response: any) => {

        this.EventosInteressadoPorClienteDataSouorce = new MatTableDataSource<any>(response);
      },
    );
  }


  fechar(){
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onSubmit() {

      this.clienteService.adicionarClienteAoEvento(this.id).subscribe(resposta => {
        this.openSnackBar("Cliente adicionado ao evento com sucesso!!", "fechar");
        this.ngOnInit()
        
      });
    }
  }
