import { Local } from "./Local";

export class Evento{
    id: number;
    nome: string;

    constructor(id: number, nome: string){
        this.id = id;
        this.nome = nome;
    }
}

export class EventoDTO{
    id: number;
    nome: string;
    local: Local;

    constructor(id: number, nome: string, local: Local){
        this.id = id;
        this.nome = nome;
        this.local = local;
    }
}