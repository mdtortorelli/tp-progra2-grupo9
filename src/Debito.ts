import { Tarjeta } from "./Tarjeta";

/**
 * Representa una tarjeta de débito como método de pago, permitiendo aplicar 
 * los descuentos correspondientes según el día de la semana configurado.
 * Extiende la funcionalidad base de {@link Tarjeta}.
 * 
 * @class Debito
 * @extends {Tarjeta}
 */
export class Debito extends Tarjeta {
    /*
     * Calcula y obtiene el porcentaje de descuento semanal aplicable para el pago con débito.
     * 
     * @param {DiaSemana} [diaActual] - Día actual opcional para evaluar si corresponde el beneficio.
     * @returns {number} El porcentaje de descuento final a aplicar.
     */
    /*
    public obtenerDescuentoSemana(diaActual?: DiaSemana): number {
        // throw new Error("Not implemented")  
        return super.obtenerDescuentoSemana(diaActual);
    }
    */

    /*
     * Realiza el procesamiento del pago aplicando el descuento correspondiente 
     * según el día y actualiza el total final en el pedido.
     * 
     * @param {Pedido} pedido - El objeto del pedido al cual se le actualizará el total.
     * @param {number} subtotal - El monto subtotal antes de aplicar descuentos.
     * @param {DiaSemana} [diaActual] - Día actual opcional para calcular los beneficios.
     * @returns {void}
     */
    /*
    public realizarPago(pedido: Pedido, subtotal: number, diaActual?: DiaSemana): void {
        // throw new Error("Not implemented")
        const porcentajeDescuento = this.obtenerDescuentoSemana(diaActual);
        const montoDescuento = (subtotal * porcentajeDescuento) / CIEN;
        const totalFinal = subtotal - montoDescuento;
        pedido.setTotal(totalFinal);
    }
    */
}