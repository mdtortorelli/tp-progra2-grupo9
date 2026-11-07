import { Combo } from "../Productos/Combo";

/**
 * Clase abstracta que representa una estrategia de descuento aplicable a un combo, 
 * proporcionando la estructura base, almacenamiento de valores y operaciones de comparación.
 * 
 * @abstract
 * @class TipoDescuento
 */
export abstract class TipoDescuento {
    /** Valor numérico que representa el descuento (puede ser monto fijo o porcentaje). */
    private descuento: number;

    /**
     * Crea una instancia base para un tipo de descuento.
     * 
     * @constructor
     * @param {number} descuento - El valor inicial del descuento.
     */
    public constructor(descuento: number) {
        this.descuento = descuento;
    }

    /**
     * Obtiene el valor actual del descuento.
     * 
     * @returns {number} El valor numérico del descuento.
     */
    public getDescuento(): number {
        return this.descuento;
    }

    /**
     * Establece o modifica el valor del descuento. 
     * Método protegido accesible únicamente por las clases hijas.
     * 
     * @protected
     * @param {number} descuento - El nuevo valor de descuento a asignar.
     * @returns {void}
     */
    protected setDescuento(descuento: number): void {
        this.descuento = descuento;
    }

    /**
     * Compara dos valores de descuento y determina cuál es el más beneficioso (mayor).
     * 
     * @static
     * @param {number} descuento1 - Primer valor de descuento a comparar.
     * @param {number} descuento2 - Segundo valor de descuento a comparar.
     * @returns {number} El valor máximo entre ambos descuentos.
     */
    public static obtenerMasBeneficioso(descuento1: number, descuento2: number): number {
        return Math.max(descuento1, descuento2);
    } 

    /**
     * Método abstracto que debe ser implementado por las clases hijas 
     * para calcular y aplicar el descuento correspondiente sobre un combo.
     * 
     * @abstract
     * @param {Combo} combo - El objeto combo al cual se le aplicará el descuento.
     * @returns {number} El precio final resultante tras la aplicación del descuento.
     */
    public abstract aplicarDescuento(combo: Combo): number;
}