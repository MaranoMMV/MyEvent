import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento, EventoDTO } from '../sistema/evento/Evento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  url: string = 'http://localhost:8080/api/eventos'

  constructor(private http: HttpClient) { }

  save(id: number,evento: Evento): Observable<EventoDTO> {
    return this.http.post<EventoDTO>(`${this.url}/${id}`, evento);
  }

  list(): Observable<EventoDTO[]> {
    return this.http.get<EventoDTO[]>(`${this.url}`); 
  }

  ultimoEvento(): Observable<Evento>{
    return this.http.get<Evento>(`${this.url}/ulltimoEvento`)
  }

  procurarPorId(id: number): Observable<Evento>{
    return this.http.get<any>(`${this.url}/${id}`)
  }

  atualizar(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${ this.url }/${evento.id}`, evento);
  }

  deletar(evento: Evento) : Observable<Evento> {
    return this.http.delete<any>(`${this.url}/${evento.id}`);
  }
  listEventosClientes(id:number, idVendedor: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.url}/clientes-em-eventos/${id}`, { params: { idVendedor } }); 
  } 
  listEventosClientesInteresse(id:number, idVendedor: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.url}/clientes-em-eventos-interesse/${id}`, { params: { idVendedor } }); 
  }
}
