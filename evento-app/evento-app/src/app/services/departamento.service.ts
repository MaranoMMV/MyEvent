import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamento } from '../sistema/departamento/Departamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  url: string = 'http://localhost:8080/api/departamentos'

  constructor(private http: HttpClient) { }

  save(id:number, departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(`${this.url}/${id}`, departamento);
  }

  list(id:number): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.url}/listagem/${id}`); 
  }

  procurarPorId(id: number): Observable<Departamento>{
    return this.http.get<any>(`${this.url}/${id}`)
  }

  atualizar(departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${ this.url }/${departamento.id}`, departamento);
  }

  deletar(departamento: Departamento) : Observable<Departamento> {
    return this.http.delete<any>(`${this.url}/${departamento.id}`);
  }
}
