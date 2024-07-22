import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Local, LocalDTO } from '../sistema/evento/Local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  url: string = 'http://localhost:8080/api/locais'

  constructor(private http: HttpClient) { }

  saveLocal(id: number,local: Local): Observable<Local> {
    return this.http.post<Local>(`${this.url}/${id}`, local);
  }


  list(): Observable<LocalDTO[]> {
    return this.http.get<LocalDTO[]>(`${this.url}`); 
  }

  procurarPorId(id: number): Observable<Local>{
    return this.http.get<any>(`${this.url}/${id}`)
  }

  atualizar(local: Local): Observable<Local> {
    return this.http.put<Local>(`${ this.url }/${local.id}`, local);
  }

  listLocaisPorEvento(id:number): Observable<Local[]> {
    return this.http.get<Local[]>(`${this.url}/locaisPorEvento/${id}`); 
  }
}
