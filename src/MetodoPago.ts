import { DiaSemana } from "./DiaSemana";
import { Pedido } from "./Pedido";

const CERO: number = 0;

export default abstract class MetodoPago {
    //private diaDescuento:DiaSemana[];
    private porcentajeDescuentoSemana: number;

    public constructor(
        private diaDescuento: DiaSemana[],
        porcentajeDescuentoSemana: number
    ) {
        this.porcentajeDescuentoSemana = porcentajeDescuentoSemana;
    }

    public getDiaDescuento():DiaSemana[] {
        return this.diaDescuento;
    }

    public setDiaDescuento(descuento:DiaSemana[]):void {
        this.diaDescuento = descuento;
    }

    public getPorcentajeDescuentoSemana():number {
        return this.porcentajeDescuentoSemana;
    }

    public setPorcentajeDescuentoSemana(porcentajeDescuentoSemana:number):void {
        this.porcentajeDescuentoSemana = porcentajeDescuentoSemana;
    }

    public obtenerDescuentoSemana(diaActual?: DiaSemana):number {
        if (diaActual !== undefined && this.diaDescuento.includes(diaActual)) {
            return this.porcentajeDescuentoSemana;
        }
        return CERO;
    }

    public abstract realizarPago(pedido:Pedido, subtotal: number, diaActual?: DiaSemana):void;

}