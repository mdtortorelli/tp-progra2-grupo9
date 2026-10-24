import { CERO, UNA_CUOTA } from "./Constantes";
import { DiaSemana } from "./DiaSemana";
// import { Pedido } from "./Pedido";
import { Tarjeta } from "./Tarjeta";



export class Credito extends Tarjeta {
    private cuotas: number

    public constructor(diaSemana: DiaSemana[], cuotas: number, porcentajeDescuentoSemana: number) {
        super(diaSemana, porcentajeDescuentoSemana);
        this.cuotas = cuotas;

    }

    public getCuotas():number {
        return this.cuotas;
    }

    public setCuotas(cuotas:number):void {
        this.cuotas = cuotas;
    }

     
    public obtenerDescuentoSemana(diaActual?: DiaSemana): number {
        // throw new Error("Not implemented")  
        if (this.cuotas > UNA_CUOTA) {
            return CERO; // Mas de una cuota a pagar = 0% de descuento.
        }
        return super.obtenerDescuentoSemana(diaActual);
    }

     
    /*public realizarPago(pedido: Pedido, subtotal: number, diaActual?: DiaSemana): void {
        // throw new Error("Not implemented")
        const porcentajeDescuento = this.obtenerDescuentoSemana(diaActual);
        const montoDescuento = (subtotal * porcentajeDescuento) / CIEN;
        const totalFinal=subtotal - montoDescuento;
        pedido.setTotal(totalFinal);
    }*/
}