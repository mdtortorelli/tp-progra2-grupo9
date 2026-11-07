import { Producto } from "./Producto";

/**
 * Interfaz que define el contrato básico para cualquier elemento o componente 
 * capaz de calcular su precio y proporcionar la lista de productos que lo componen.
 * 
 * @interface Item
 */
export interface Item {
    
    /**
     * Calcula y obtiene el precio total correspondiente al ítem.
     * 
     * @returns {number} El valor monetario o precio del ítem.
     */
    obtenerPrecio(): number;

    /**
     * Obtiene la colección de productos asociados al ítem.
     * 
     * @returns {Array<Producto>} Un arreglo que contiene los objetos de tipo {@link Producto}.
     */
    obtenerProductos(): Array<Producto>;
}