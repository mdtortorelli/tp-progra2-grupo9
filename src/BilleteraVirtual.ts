import { DiaSemana } from "./DiaSemana";
import { Pedido } from "./Pedido";
import MetodoPago from "./MetodoPago";

const CIEN: number = 100;
export class BilleteraVirtual extends MetodoPago {
    public constructor(diaSemana: DiaSemana[], porcentajeDescuentoSemana: number) {
        super(diaSemana, porcentajeDescuentoSemana);
    }

    public obtenerDescuentoSemana(diaActual?: DiaSemana): number {
        return super.obtenerDescuentoSemana(diaActual); 
    }

    public realizarPago(pedido: Pedido, subtotal: number, diaActual?: DiaSemana): void {
        const porcentajeDescuento = this.obtenerDescuentoSemana(diaActual);
        const montoDescuento = (subtotal * porcentajeDescuento) /CIEN;
        const totalFinal=subtotal - montoDescuento;
        pedido.setTotal(totalFinal);
    }
}
