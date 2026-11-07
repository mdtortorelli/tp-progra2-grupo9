import { DiaSemana } from "../Utils/DiaSemana";
import MetodoPago from "./MetodoPago";

/**
 * Representa un método de pago basado en billetera virtual, el cual permite 
 * aplicar descuentos según determinados días de la semana.
 * Extiende la funcionalidad base de {@link MetodoPago}.
 * 
 * @class BilleteraVirtual
 * @extends {MetodoPago}
 */
export class BilleteraVirtual extends MetodoPago {
    /**
     * Crea una instancia de un método de pago de tipo billetera virtual.
     * 
     * @constructor
     * @param {DiaSemana[]} diaSemana - Lista de días de la semana en los que aplica el descuento.
     * @param {number} porcentajeDescuentoSemana - Porcentaje de descuento aplicable durante los días especificados.
     */
    public constructor(diaSemana: DiaSemana[], porcentajeDescuentoSemana: number) {
        super(diaSemana, porcentajeDescuentoSemana);
    }
}
