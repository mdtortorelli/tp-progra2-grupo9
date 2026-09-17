export class Retiro {
    private horarioRetiro: Date;

    public constructor(horario:Date) {
        this.horarioRetiro = horario;
    }

     public getHorarioRetiro():Date {
            return this.horarioRetiro;
        }
    
    public setHorarioRetiro(horario:Date):void {
        this.horarioRetiro = horario;
    }
}