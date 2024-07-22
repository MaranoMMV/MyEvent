import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Horario } from '../sistema/evento/Horario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  url: string = 'http://localhost:8080/api/horarios'

  constructor(private http: HttpClient) { }

  saveLocal(id: number, horario: Horario): Observable<Horario> {
    return this.http.post<Horario>(`${this.url}/${id}`, horario);
  }


  list(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.url}`); 
  }

  procurarPorId(id: number): Observable<Horario>{
    return this.http.get<Horario>(`${this.url}/${id}`)
  }

  atualizar(horario: Horario): Observable<Horario> {
    return this.http.put<Horario>(`${ this.url }/${horario.id}`, horario);
  }

  listLocaisPorLocal(id:number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.url}/listagem-horarios/${id}`); 
  }
}
