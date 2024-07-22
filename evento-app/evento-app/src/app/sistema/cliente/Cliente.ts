import { Vendedor } from "../vendedores/Vendedor";

export class Cliente{
    id: number;
    nome: string;
    email: string;
    razao: string;
    telefone: string;
    idVendedor: number;
    nomeVendedor: string;
    cnpj: string;
    dataCadastro: string;
    aceitaReceberEmails: boolean;

    constructor(
        id: number,
        nome: string,
        email: string,
        razao: string,
        telefone: string,
        idVendedor: number,
        nomeVendedor: string,
        cnpj: string,
        dataCadastro: string,
        aceitaReceberEmails: boolean,){
        this.id = id;
            this.nome = nome;
            this.email = email;
            this.razao = razao;
            this.telefone = telefone;
            this.idVendedor = idVendedor;
            this.nomeVendedor = nomeVendedor;
            this.cnpj = cnpj;
            this.dataCadastro = dataCadastro;
            this.aceitaReceberEmails = aceitaReceberEmails
        }
}

export class ClienteDTO{
    id: number;
    nome: string;
    razao: string;
    telefone: string;
    vendedor: Vendedor;
    cnpj: string;
    dataCadastro: string;
    eventoId: any[];
    aceitaReceberEmails: boolean;

    constructor(    id: number,
        nome: string,
        razao: string,
        telefone: string,
        vendedor: Vendedor,
        cnpj: string,
        dataCadastro: string,
        eventoId: any[],
        aceitaReceberEmails: boolean,){
            this.id = id;
            this.nome = nome;
            this.razao = razao;
            this.telefone = telefone;
            this.vendedor = vendedor;
            this.cnpj = cnpj;
            this.dataCadastro = dataCadastro;
            this.eventoId = eventoId;
            this.aceitaReceberEmails = aceitaReceberEmails
        }
}