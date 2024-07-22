import { Evento } from "./Evento";

export class Local{
    id!:number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    nomeLocal: string;
    numero: number;
    eventoId: number;

    constructor(    estado: string,
        cidade: string,
        bairro: string,
        rua: string,
        nomeLocal: string,
        numero: number,
        eventoId: number){
            this.estado = estado;
            this.cidade = cidade;
            this.bairro = bairro;
            this.rua = rua;
            this.nomeLocal = nomeLocal;
            this.numero = numero;
            this.eventoId = eventoId
        }
}

export class LocalDTO{
    id!:number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    nomeLocal: string;
    numero: number;
    evento: Evento;

    constructor(    estado: string,
        cidade: string,
        bairro: string,
        rua: string,
        nomeLocal: string,
        numero: number,
        evento: Evento){
            this.estado = estado;
            this.cidade = cidade;
            this.bairro = bairro;
            this.rua = rua;
            this.nomeLocal = nomeLocal;
            this.numero = numero;
            this.evento = evento;
        }
}