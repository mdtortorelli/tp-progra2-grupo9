/**
 * Representa una mesa física dentro del restaurante, permitiendo gestionar 
 * su identificación numérica para la atención de pedidos.
 * 
 * @class Mesa
 */
export class Mesa {
    /** Número identificatorio único de la mesa. */
    private numero: number;

    /**
     * Crea una instancia de una mesa.
     * 
     * @constructor
     * @param {number} numero - El número identificatorio asignado a la mesa.
     */
    public constructor(numero: number) {
        this.numero = numero;
    }

    /**
     * Obtiene el número identificatorio actual de la mesa.
     * 
     * @returns {number} El número de la mesa.
     */
    public getNumero(): number {
        return this.numero;
    }

    /**
     * Establece o modifica el número identificatorio de la mesa.
     * 
     * @param {number} numero - El nuevo número a asignar.
     * @returns {void}
     */
    public setNumero(numero: number): void {
        this.numero = numero;
    }
}