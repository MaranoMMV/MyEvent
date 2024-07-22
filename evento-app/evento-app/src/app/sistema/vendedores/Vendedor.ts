import { Departamento } from "../departamento/Departamento";

export class Vendedor {
    id: number;
    nome: string;
    role: string;
    departamentoId: number
    usuario: string;
    password: string;
    status: boolean;

    constructor(id: number,
        nome: string,
        role: string,
        departamentoId: number,
        usuario: string,
        password: string,
        status: boolean
)    {
        this.id = id;
        this.nome = nome;
        this.role = role;
        this.departamentoId = departamentoId;
        this.usuario = usuario;
        this.password = password;
        this.status = status;

    }
}

export class VendedorDTO {
    id: number;
    nome: string;
    role: string;
    departamento: Departamento
    usuario: string;
    password: string;
    status: boolean;

    constructor(id: number,
        nome: string,
        role: string,
        departamento: Departamento,
        usuario: string,
        password: string,
        status: boolean
)    {
        this.id = id;
        this.nome = nome;
        this.role = role;
        this.departamento = departamento;
        this.usuario = usuario;
        this.password = password;
        this.status = status;

    }
}