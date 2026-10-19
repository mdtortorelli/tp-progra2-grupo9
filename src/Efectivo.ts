import { DiaSemana } from "./DiaSemana";
// import { Pedido } from "./Pedido";
// import { TipoDescuento } from "./TipoDescuento";
import MetodoPago from "./MetodoPago";

// const CIEN: number = 100;

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