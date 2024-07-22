import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../sistema/cliente/Cliente';
import { Evento } from '../sistema/evento/Evento';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url: string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  save(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}`, cliente);
  }

  list(id: number): Observable<Cliente[]> {

      // const tokenString = localStorage.getItem('auth_token')
      // // const token = JSON.parse(tokenString)
      // const headers = {
      //   'Authorization' : 'Bearer ' + tokenString
      // }

    return this.http.get<Cliente[]>(`${this.url}/${id}/listagem`); 
  }

  procurarPorId(id: number): Observable<Cliente> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  atualizar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/${cliente.id}`, cliente);
  }

  deletar(cliente: Cliente): Observable<Cliente> {
    return this.http.delete<any>(`${this.url}/${cliente.id}`);
  }

  buscarTodosEventosPorCliente(id: number): Observable<Evento[]> {
    const tokenString = localStorage.getItem('auth_token')
    // const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + tokenString
    }
    return this.http.get<Evento[]>(`${this.url}/${id}/eventos` ,  {headers});
  }

  buscarTodosEventosInteressePorCliente(id: number): Observable<Evento[]> {
    const tokenString = localStorage.getItem('auth_token')
    // const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + tokenString
    }
    return this.http.get<Evento[]>(`${this.url}/${id}/eventos-interesse` ,  {headers});
  }

  buscarClientesSemVinculoVendedor(id: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.url}/${id}/sem-vinculo`);
  }

  

  adicionarClienteAoEvento(id: number): Observable<any> {
    const tokenString = localStorage.getItem('auth_token')
    // const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + tokenString
    }

    return this.http.post<any>(`${this.url}/adicionar-evento-ao-cliente`, id,  {headers});
  }

  procurarClientePorCNPJ(id: number, cnpj: string): Observable<any>{
    return this.http.get<any>(`${this.url}/by-cnpj/${id}`, { params: { cnpj } })
  }

  procurarClientePorVendedor(id: number, idVendedor: number): Observable<any>{
    return this.http.get<any>(`${this.url}/${id}/cliente-vendedor`, { params: { idVendedor } })
  }

  consultaClientesCadastradosHoje(idVendedor: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/listagem-cadastrados-hoje`, { params: { idVendedor } })
  }

  consultaClientesCadastradosOntem(idVendedor: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/listagem-cadastrados-ontem`, { params: { idVendedor } } )
  }
  
}