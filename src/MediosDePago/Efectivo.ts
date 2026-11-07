import { DiaSemana } from "../Utils/DiaSemana";
import MetodoPago from "./MetodoPago";

/**
 * Representa el pago en efectivo como método de pago, permitiendo gestionar 
 * un descuento propio y los beneficios aplicables según los días de la semana.
 * Extiende la funcionalidad base de {@link MetodoPago}.
 * 
 * @class Efectivo
 * @extends {MetodoPago}
 */
export class Efectivo extends MetodoPago {
    
    /**
     * Crea una instancia de un método de pago en efectivo.
     * 
     * @constructor
     * @param {number} descuento - El valor o porcentaje de descuento propio asignado al pago en efectivo.
     * @param {DiaSemana[]} diaSemana - Lista de días de la semana en los que aplica el descuento semanal.
     * @param {number} porcentajeDescuentoSemana - Porcentaje de descuento aplicable durante los días especificados.
     */
    public constructor(
        descuento: number,
        diaSemana: DiaSemana[],
        porcentajeDescuentoSemana: number
    ) {
        super(diaSemana, porcentajeDescuentoSemana);
        this.setDescuentoPropio(descuento);
    }

    /**
     * Obtiene el valor actual del descuento propio configurado para el efectivo.
     * 
     * @returns {number} El valor del descuento.
     */
    public getDescuento(): number {
        return this.getDescuentoPropio();
    }

    /**
     * Establece o modifica el valor del descuento propio para el efectivo.
     * 
     * @param {number} descuento - El nuevo valor de descuento a asignar.
     * @returns {void}
     */
    public setDescuento(descuento: number): void {
        this.setDescuentoPropio(descuento);
    }
}