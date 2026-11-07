import { CERO, UNA_CUOTA } from "../Utils/Constantes";
import { DiaSemana } from "../Utils/DiaSemana";
import { Tarjeta } from "./Tarjeta";

/**
 * Representa una tarjeta de crédito como método de pago, permitiendo gestionar 
 * la cantidad de cuotas y aplicando restricciones de descuento según las mismas.
 * Extiende la funcionalidad base de {@link Tarjeta}.
 * 
 * @class Credito
 * @extends {Tarjeta}
 */
export class Credito extends Tarjeta {
    /** Cantidad de cuotas seleccionadas para el pago. */
    private cuotas: number;

    /**
     * Crea una instancia de un método de pago con tarjeta de crédito.
     * 
     * @constructor
     * @param {DiaSemana[]} diaSemana - Lista de días de la semana en los que aplica el descuento base.
     * @param {number} cuotas - Cantidad de cuotas para diferir el pago.
     * @param {number} porcentajeDescuentoSemana - Porcentaje de descuento aplicable durante los días especificados.
     */
    public constructor(diaSemana: DiaSemana[], cuotas: number, porcentajeDescuentoSemana: number) {
        super(diaSemana, porcentajeDescuentoSemana);
        this.cuotas = cuotas;
    }

    /**
     * Obtiene la cantidad de cuotas configuradas.
     * 
     * @returns {number} El número actual de cuotas.
     */
    public getCuotas(): number {
        return this.cuotas;
    }

    /**
     * Establece o modifica la cantidad de cuotas para el pago.
     * 
     * @param {number} cuotas - Nueva cantidad de cuotas a asignar.
     * @returns {void}
     */
    public setCuotas(cuotas: number): void {
        this.cuotas = cuotas;
    }

    /**
     * Calcula y obtiene el porcentaje de descuento semanal aplicable. 
     * Si la cantidad de cuotas es mayor a una ({@link UNA_CUOTA}), se anula el descuento (retorna {@link CERO}); 
     * de lo contrario, evalúa el descuento heredado de la clase base.
     * 
     * @param {DiaSemana} [diaActual] - Día actual opcional para evaluar si corresponde el beneficio.
     * @returns {number} El porcentaje de descuento final a aplicar.
     */
    public obtenerDescuentoSemana(diaActual?: DiaSemana): number {        
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