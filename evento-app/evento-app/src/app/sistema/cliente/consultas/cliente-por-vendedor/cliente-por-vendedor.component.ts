import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { LoginService } from '../../../../services/login.service';
import { ClienteService } from '../../../../services/cliente.service';
import { EventoService } from '../../../../services/evento.service';
import { VendedoresService } from '../../../../services/vendedores.service';
import { Cliente } from '../../Cliente';
import { ClienteDialogComponent } from '../../cliente-dialog/cliente-dialog.component';
import { Vendedor } from '../../../vendedores/Vendedor';

@Component({
  selector: 'app-cliente-por-vendedor',
  standalone: true,
  imports: [MatIconModule, MatSelectModule, RouterModule, MatTableModule, MatButtonModule,  MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './cliente-por-vendedor.component.html',
  styleUrl: './cliente-por-vendedor.component.scss'
})
export class ClientePorVendedorComponent implements OnInit {
  vendedores: Vendedor[] = [];
  clienteSelecionado!: Cliente;
  displayedColumns: string[] = ['id', 'nome', 'razao', 'vendedor', 'cnpj', 'editar', 'view'];
  clientesPorVendedorDataSouorce!: MatTableDataSource<Cliente>;
  formularioPorVendedor!: FormGroup;
  

  
  constructor( private vendedorService: VendedoresService,private eventoService: EventoService, private clienteService: ClienteService, private loginService: LoginService, private dialog: MatDialog, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.montarFormularioPorVendedor();
    this.buscarOpcoesDeVendedor();
  }
  buscarOpcoesDeVendedor(){
    this.vendedorService.listagem().subscribe((response: any) => {
      this.vendedores = response;
    });
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

  montarFormularioPorVendedor() {
    this.formularioPorVendedor = this.fb.group({
      idVendedor: [''],
    });
  }

  onSubmitClientePorVendedorInteresse(){
    const idLogin = this.loginService.getUserId();
    if (this.formularioPorVendedor.valid) { // Validar se o formulário é válido antes de prosseguir
      const formValues = this.formularioPorVendedor.value;
      this.clienteService.procurarClientePorVendedor(formValues.idVendedor, Number(idLogin)).subscribe((resposta: any[]) => {
        (resposta);
        this.clientesPorVendedorDataSouorce = new MatTableDataSource<any>(resposta); // Remova os colchetes aqui
      });
    } else {
      ("Formulário inválido");
    }
  }
  

}
