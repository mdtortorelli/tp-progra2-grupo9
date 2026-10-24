import { DiaSemana } from "./DiaSemana";
import MetodoPago from "./MetodoPago";

export class Efectivo extends MetodoPago {
public constructor(
        descuento: number,
        diaSemana: DiaSemana[],
        porcentajeDescuentoSemana: number
    ) {
        super(diaSemana, porcentajeDescuentoSemana);
        this.setDescuentoPropio(descuento);
    }

    public getDescuento():number {
        return this.getDescuentoPropio();
    }

    public setDescuento(descuento: number):void {
        this.setDescuentoPropio(descuento);
    }

}