import { Combo } from "../Productos/Combo";
import { CERO } from "../Utils/Constantes";
import { TipoDescuento } from "./TipoDescuento";

/**
 * Representa una estrategia de descuento fijo que se aplica restando 
 * un valor estipulado al precio total de un combo.
 * Extiende la funcionalidad base de {@link TipoDescuento}.
 * 
 * @class DescuentoFijo
 * @extends {TipoDescuento}
 */
export class DescuentoFijo extends TipoDescuento {
    
    /**
     * Aplica un descuento de monto fijo sobre el precio de un combo.
     * Valida que el resultado no sea menor o igual a cero ({@link CERO}); 
     * en caso de serlo, lanza una excepción indicando que el monto a descontar no puede superar el precio.
     * 
     * @override
     * @param {Combo} combo - El objeto combo al cual se le calculará el precio con descuento.
     * @returns {number} El precio final resultante tras aplicar el descuento fijo.
     * @throws {Error} Lanza un error si el descuento supera o iguala el precio total del combo.
     */
    public aplicarDescuento(combo: Combo): number {
        const descuento = combo.obtenerPrecioSinDescuento() - this.getDescuento(); 
        
        if (descuento <= CERO)
        {
            throw new Error('El monto a descontar no puede superar el precio');
        }
        return descuento;
    }
}