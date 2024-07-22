export class Horario{
    id!: number
    data: string
    horarioInicio: string
    horarioFim: string
    localId: number

    constructor( 
        data: string,
        horarioInicio: string,
        horarioFim: string,
        localId: number){
            this.data = data;
            this.horarioInicio = horarioInicio;
            this.horarioFim = horarioFim;
            this.localId = localId;
    }
}