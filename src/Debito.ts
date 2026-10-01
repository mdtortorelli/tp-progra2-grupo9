import { Pedido } from "./Pedido";
import { Tarjeta } from "./Tarjeta";
import { DiaSemana } from "./DiaSemana";

const CIEN: number = 100;

export class Debito extends Tarjeta {
        public obtenerDescuentoSemana(diaActual?: DiaSemana): number {
            // throw new Error("Not implemented")  
            return super.obtenerDescuentoSemana(diaActual)
        }
    
         
        public realizarPago(pedido: Pedido, subtotal: number, diaActual?: DiaSemana): void {
            // throw new Error("Not implemented")
            const porcentajeDescuento = this.obtenerDescuentoSemana(diaActual);
            const montoDescuento = (subtotal * porcentajeDescuento) / CIEN;
            const totalFinal=subtotal - montoDescuento;
            pedido.setTotal(totalFinal);
        }
}