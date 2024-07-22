import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendedor } from '../sistema/vendedores/Vendedor';

@Injectable({
  providedIn: 'root'
})
export class VendedoresService {

  url: string = 'http://localhost:8080/api/vendedores'

  constructor(private http: HttpClient) { }

  save(idVendedor: number, vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post<Vendedor>(`${this.url}/salvar/${idVendedor}`, vendedor);
  }

  list(id: number): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(`${this.url}/listagem/${id}`); 
  }

  procurarPorId(id: number): Observable<Vendedor>{
    return this.http.get<any>(`${this.url}/${id}`)
  }

  atualizar(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.put<Vendedor>(`${ this.url }/${vendedor.id}`, vendedor);
  }

  deletar(vendedor: Vendedor) : Observable<Vendedor> {
    return this.http.delete<any>(`${this.url}/${vendedor.id}`);
  }

  listagem(): Observable<Vendedor[]> {
    const tokenString = localStorage.getItem('auth_token')
    // const token = JSON.parse(tokenString)
    const headers = {
      'Authorization' : 'Bearer ' + tokenString
    }

    return this.http.get<Vendedor[]>(`${this.url}`, {headers}); 
  }

  listagemVendedorInativo(id:number): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(`${this.url}/inativos/${id}`); 
  }

  listagemVendedorAtivo(id:number): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(`${this.url}/ativos/${id}`); 
  }

  procurarClientePorNome(id: number, nome: string): Observable<Vendedor[]>{

    return this.http.get<Vendedor[]>(`${this.url}/buscar-nome/${id}`, { params: { nome } })
  }

}
