import { DiaSemana } from "./DiaSemana";
import MetodoPago from "./MetodoPago";

/**
 * Clase abstracta que representa los métodos de pago mediante tarjeta, 
 * sirviendo como base para tipos específicos de tarjetas 
 * y heredando la gestión de descuentos semanales de {@link MetodoPago}.
 * 
 * @abstract
 * @class Tarjeta
 * @extends {MetodoPago}
 */
export abstract class Tarjeta extends MetodoPago {
   
   /**
    * Crea una instancia base para un método de pago con tarjeta.
    * 
    * @constructor
    * @param {DiaSemana[]} diaSemana - Arreglo de días de la semana en los que aplican los descuentos para la tarjeta.
    * @param {number} porcentajeDescuentoSemana - El porcentaje de descuento aplicable durante dichos días.
    */
   public constructor(diaSemana: DiaSemana[], porcentajeDescuentoSemana: number) {
      super(diaSemana, porcentajeDescuentoSemana);
   }
}