import { CERO, CIEN } from "../Utils/Constantes";
import { Pedido } from "../Pedidos/Pedido";
import { TipoDescuento } from "../Beneficios/TipoDescuento";

/**
 * Clase abstracta que representa la estructura y comportamiento base 
 * para los diferentes métodos de pago del sistema, gestionando descuentos semanales y propios.
 * 
 * @abstract
 * @class MetodoPago
 */
export default abstract class MetodoPago {
    
    /** Descuento propio asociado directamente al método de pago (por defecto {@link CERO}). */
    private descuentoPropio: number = CERO;

    /**
    * @param {number} descuentoPropio - Descuento propio del metodo de pago.
    */
    public constructor(descuentoPropio?: number)
    {
        this.descuentoPropio = descuentoPropio ?? CERO;
    }

    /**
     * Obtiene el valor del descuento propio del método de pago.
     * 
     * @returns {number} El descuento propio.
     */
    public getDescuentoPropio(): number {
        return this.descuentoPropio;
    }

    /**
     * Establece o modifica el descuento propio del método de pago.
     * 
     * @param {number} descuentoPropio - El nuevo valor de descuento propio a asignar.
     * @returns {void}
     */
    public setDescuentoPropio(descuentoPropio: number): void {
        this.descuentoPropio = descuentoPropio;
    }

    
    /**
     * Obtiene el porcentaje de descuento más beneficioso comparando el descuento propio 
     * frente al descuento semanal correspondiente al día actual.
     * 
     * @param {number} [descuentoSemanal] - Día actual opcional para el cálculo.
     * @returns {number} El porcentaje de descuento óptimo a aplicar.
     */
    public obtenerPorcentajeDescuento(descuentoSemanal: number): number {
        return TipoDescuento.obtenerMasBeneficioso(this.getDescuentoPropio(), descuentoSemanal);
    }

    /**
     * Procesa el pago de un pedido aplicando el descuento más beneficioso sobre el subtotal, 
     * calculando el monto final y actualizando el pedido.
     * 
     * @param {Pedido} pedido - El objeto del pedido al cual se le actualizará el total.
     * @param {number} subtotal - El monto monetario subtotal antes de aplicar el descuento.
     * @param {DiaSemana} [diaActual] - Día actual opcional para evaluar los beneficios de descuento.
     * @returns {void}
     */
    public realizarPago(pedido: Pedido, subtotal: number, descuentoSemanal: number): void {
        const porcentaje = this.obtenerPorcentajeDescuento(descuentoSemanal);
        const descuento = (subtotal * porcentaje) / CIEN;
        const total = subtotal - descuento;
        pedido.setTotal(total);
        pedido.setDescuentoAplicado(porcentaje);
    }
}