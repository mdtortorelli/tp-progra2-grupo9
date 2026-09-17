import { Tarjeta } from "./Tarjeta";

export class Credito extends Tarjeta {
    private cuotas: number

    public constructor(cuotas: number) {
        super()
        this.cuotas = cuotas;

    }

    public getCuotas():number {
        return this.cuotas;
    }

    public setCuotas(cuotas:number):void {
        this.cuotas = cuotas;
    }
}