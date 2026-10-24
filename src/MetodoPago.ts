import { CERO, CIEN } from "./Constantes";
import { DiaSemana } from "./DiaSemana";
import { Pedido } from "./Pedido";
import { TipoDescuento } from "./TipoDescuento";



export default abstract class MetodoPago {
    //private diaDescuento:DiaSemana[];
    private porcentajeDescuentoSemana: number;
    private descuentoPropio: number = CERO;

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
    public getDescuentoPropio():number {
        return this.descuentoPropio;
    }
    public setDescuentoPropio(descuentoPropio:number):void {
        this.descuentoPropio = descuentoPropio;
    }

    public obtenerDescuentoSemana(diaActual?: DiaSemana):number {
        if (diaActual !== undefined && this.diaDescuento.includes(diaActual)) {
            return this.porcentajeDescuentoSemana;
        }
        return CERO;
    }

    public obtenerPorcentajeDescuento(diaActual?: DiaSemana):number {
        return TipoDescuento.obtenerMasBeneficioso(this.getDescuentoPropio(), this.obtenerDescuentoSemana(diaActual));
    }

    public realizarPago(pedido:Pedido, subtotal: number, diaActual?: DiaSemana):void {
        const porcentaje = this.obtenerPorcentajeDescuento(diaActual);
        const descuento = (subtotal * porcentaje)/CIEN;
        const total = subtotal - descuento;
        pedido.setTotal(total);
    }

}