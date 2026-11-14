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
    * @param {number} descuentoPropio - El descuento propio aplicable al medio de pago.
    */
   public constructor(descuentoPropio: number) {
      super(descuentoPropio);
   }
}