import { TipoDescuento } from "./TipoDescuento";
import { CERO, CIEN } from "./Constantes";
import { Combo } from "./Combo";

/**
 * Representa una estrategia de descuento porcentual que se aplica sobre 
 * el precio de un combo basándose en un porcentaje estipulado.
 * Extiende la funcionalidad base de {@link TipoDescuento}.
 * 
 * @class DescuentoPorcentual
 * @extends {TipoDescuento}
 */
export class DescuentoPorcentual extends TipoDescuento {
    
    /**
     * Crea una instancia de un descuento porcentual.
     * Valida que el porcentaje ingresado sea mayor a cero ({@link CERO}); 
     * de lo contrario, lanza una excepción indicando que el porcentaje no puede ser negativo.
     * 
     * @constructor
     * @param {number} porcentaje - El valor porcentual del descuento a aplicar.
     * @throws {Error} Lanza un error si el porcentaje es menor o igual a cero.
     */
    public constructor(porcentaje: number) {     
        try {
           
            if (porcentaje <= CERO) 
            {
                throw new Error;
            }
            super(porcentaje);
        } 
        catch (Error) {
            throw new Error('El porcentaje no puede ser negativo');
        }
    }

    /**
     * Obtiene el valor actual del porcentaje de descuento.
     * 
     * @returns {number} El porcentaje configurado.
     */
    public getPorcentaje(): number {
        return this.getDescuento();
    }

    /**
     * Establece o modifica el valor del porcentaje de descuento.
     * Valida que el nuevo valor no sea menor o igual a cero; 
     * de lo contrario, lanza un error.
     * 
     * @param {number} porcentaje - El nuevo valor porcentual a asignar.
     * @returns {void}
     * @throws {Error} Lanza un error si el porcentaje es menor o igual a cero.
     */
    public setPorcentaje(porcentaje: number): void {
        try {
            const cero = 0;
            if (porcentaje <= cero) 
            {
                throw new Error('El porcentaje no puede ser negativo');
            }
            this.setDescuento(porcentaje);
        } 
        catch (Error) {
            throw new Error;
        }        
    }

    /**
     * Convierte el porcentaje interno almacenado a un valor decimal 
     * dividiéndolo por cien ({@link CIEN}) para facilitar los cálculos matemáticos.
     * 
     * @private
     * @returns {number} El valor del porcentaje expresado en formato decimal.
     */
    private convertirPorcentajeADecimal(): number {
        return this.getDescuento() / CIEN;        
    }

    /**
     * Aplica el descuento porcentual sobre el precio sin descuento de un combo, 
     * devolviendo el precio final resultante. 
     * Valida que el precio final no sea menor o igual a cero ({@link CERO}).
     * 
     * @override
     * @param {Combo} combo - El objeto combo al cual se le calculará el precio con descuento.
     * @returns {number} El precio final tras aplicar el descuento porcentual.
     * @throws {Error} Lanza un error si el precio final resultante es menor o igual a cero.
     */
    public aplicarDescuento(combo: Combo): number {
        try {
            const precio = combo.obtenerPrecioSinDescuento();
            const descuento = precio - precio * this.convertirPorcentajeADecimal();
            if (descuento <= CERO)
            {
                throw new Error;
            }
            return descuento; 

        } catch
        {
            throw new Error('El precio no puede ser menor o igual a cero');
        }
    }
}