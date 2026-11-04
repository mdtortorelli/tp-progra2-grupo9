import { CERO, CIEN } from "./Constantes";
import { DiaSemana } from "./DiaSemana";
import { Pedido } from "./Pedido";
import { TipoDescuento } from "./TipoDescuento";

/**
 * Clase abstracta que representa la estructura y comportamiento base 
 * para los diferentes métodos de pago del sistema, gestionando descuentos semanales y propios.
 * 
 * @abstract
 * @class MetodoPago
 */
export default abstract class MetodoPago {
    /** Porcentaje de descuento aplicable durante los días de descuento específicos. */
    private porcentajeDescuentoSemana: number;

    /** Descuento propio asociado directamente al método de pago (por defecto {@link CERO}). */
    private descuentoPropio: number = CERO;

    /**
     * Crea una instancia de un método de pago.
     * 
     * @constructor
     * @param {DiaSemana[]} diaDescuento - Arreglo de días de la semana en los que aplica el descuento semanal.
     * @param {number} porcentajeDescuentoSemana - El porcentaje de descuento aplicable en dichos días.
     */
    public constructor(
        private diaDescuento: DiaSemana[],
        porcentajeDescuentoSemana: number
    ) {
        this.porcentajeDescuentoSemana = porcentajeDescuentoSemana;
    }

    /**
     * Obtiene los días de la semana configurados para aplicar descuentos.
     * 
     * @returns {DiaSemana[]} Un arreglo con los días de descuento.
     */
    public getDiaDescuento(): DiaSemana[] {
        return this.diaDescuento;
    }

    /**
     * Establece o modifica los días de la semana configurados para los descuentos.
     * 
     * @param {DiaSemana[]} descuento - El nuevo arreglo de días de descuento a asignar.
     * @returns {void}
     */
    public setDiaDescuento(descuento: DiaSemana[]): void {
        this.diaDescuento = descuento;
    }

    /**
     * Obtiene el porcentaje de descuento asignado para los días de descuento semanal.
     * 
     * @returns {number} El porcentaje de descuento semanal.
     */
    public getPorcentajeDescuentoSemana(): number {
        return this.porcentajeDescuentoSemana;
    }

    /**
     * Establece o modifica el porcentaje de descuento semanal.
     * 
     * @param {number} porcentajeDescuentoSemana - El nuevo porcentaje a asignar.
     * @returns {void}
     */
    public setPorcentajeDescuentoSemana(porcentajeDescuentoSemana: number): void {
        this.porcentajeDescuentoSemana = porcentajeDescuentoSemana;
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
     * Calcula el porcentaje de descuento semanal evaluando si el día actual 
     * se encuentra dentro de los días configurados con beneficio.
     * 
     * @param {DiaSemana} [diaActual] - Día actual opcional a verificar.
     * @returns {number} El porcentaje de descuento si aplica, o {@link CERO} en caso contrario.
     */
    public obtenerDescuentoSemana(diaActual?: DiaSemana): number {
        if (diaActual !== undefined && this.diaDescuento.includes(diaActual)) {
            return this.porcentajeDescuentoSemana;
        }
        return CERO;
    }

    /**
     * Obtiene el porcentaje de descuento más beneficioso comparando el descuento propio 
     * frente al descuento semanal correspondiente al día actual.
     * 
     * @param {DiaSemana} [diaActual] - Día actual opcional para el cálculo.
     * @returns {number} El porcentaje de descuento óptimo a aplicar.
     */
    public obtenerPorcentajeDescuento(diaActual?: DiaSemana): number {
        return TipoDescuento.obtenerMasBeneficioso(this.getDescuentoPropio(), this.obtenerDescuentoSemana(diaActual));
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
    public realizarPago(pedido: Pedido, subtotal: number, diaActual?: DiaSemana): void {
        const porcentaje = this.obtenerPorcentajeDescuento(diaActual);
        const descuento = (subtotal * porcentaje) / CIEN;
        const total = subtotal - descuento;
        pedido.setTotal(total);
    }
}