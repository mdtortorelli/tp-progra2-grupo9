import { DiaSemana } from "./DiaSemana";
import { Pedido } from "./Pedido";
import { Tarjeta } from "./Tarjeta";

export class Credito extends Tarjeta {
    private cuotas: number

    public constructor(diaSemana: DiaSemana[], cuotas: number) {
        super(diaSemana)
        this.cuotas = cuotas;

    }

    public getCuotas():number {
        return this.cuotas;
    }

    public setCuotas(cuotas:number):void {
        this.cuotas = cuotas;
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public obtenerDescuentoSemana(): number {
        throw new Error("Not implemented")  
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
    public realizarPago(pedido: Pedido): void {
        throw new Error("Not implemented")
    }
}