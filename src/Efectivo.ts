import { DiaSemana } from "./DiaSemana";
import { Pedido } from "./Pedido";
import { TipoDescuento } from "./TipoDescuento";
import MetodoPago from "./MetodoPago";

const CIEN: number = 100;

export class Efectivo extends MetodoPago {
    private descuento: number

    public constructor(
        descuento: number,
        diaSemana: DiaSemana[],
        porcentajeDescuentoSemana: number
    ) {
        super(diaSemana, porcentajeDescuentoSemana);
        this.descuento = descuento;
    }

    public getDescuento():number {
        return this.descuento;
    }

    public setDescuento(descuento:number):void {
        this.descuento = descuento;
    }

    public calcularDescuento():number {
        //TODO: validar si deberia ser el mismo que el getter o tiene otra logica
        return this.descuento;
    }

    public obtenerDescuentoSemana(diaActual?: DiaSemana): number {
        return super.obtenerDescuentoSemana(diaActual); 
    }

    public realizarPago(pedido: Pedido, subtotal: number, diaActual?: DiaSemana): void {
        const descEfectivo = this.calcularDescuento();
        const descuentoSemana = this.obtenerDescuentoSemana(diaActual);
        const mejorPorcentaje = TipoDescuento.obtenerMasBeneficioso(descEfectivo, descuentoSemana);

        const montoDescuento = (subtotal * mejorPorcentaje) /CIEN;
        const totalFinal=subtotal - montoDescuento;
        pedido.setTotal(totalFinal);
    }
}