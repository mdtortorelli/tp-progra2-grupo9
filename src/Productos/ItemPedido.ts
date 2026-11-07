import { EstadoProducto } from "./EstadoProducto";
import { Item } from "./Item";

/**
 * Representa un ítem individual dentro de un pedido, gestionando su cantidad, 
 * el elemento asociado y el estado actual de su preparación.
 * 
 * @class ItemPedido
 */
export class ItemPedido {
    /** El elemento o producto que compone el ítem del pedido. */
    private item: Item;

    /** Cantidad solicitada del ítem. */
    private cantidad: number;

    /** Estado actual de preparación en el que se encuentra el ítem. */
    private estado: EstadoProducto;

    /**
     * Crea una instancia de un ítem para el pedido, inicializando su estado 
     * por defecto en {@link EstadoProducto.PENDIENTE}.
     * 
     * @constructor
     * @param {Item} item - El objeto que implementa la interfaz {@link Item} a incluir.
     * @param {number} cantidad - La cantidad solicitada del ítem.
     */
    public constructor(item: Item, cantidad: number) {
        this.item = item;
        this.cantidad = cantidad;
        this.estado = EstadoProducto.PENDIENTE;
    }

    /**
     * Obtiene el estado actual de preparación del ítem.
     * 
     * @returns {EstadoProducto} El estado en el que se encuentra el ítem.
     */
    public getEstado(): EstadoProducto {
        return this.estado;
    }

    /**
     * Obtiene la cantidad solicitada del ítem.
     * 
     * @returns {number} La cantidad numérica actual.
     */
    public getCantidad(): number {
        return this.cantidad;
    }
     
    /**
     * Establece o modifica la cantidad solicitada del ítem.
     * 
     * @param {number} cantidad - La nueva cantidad a asignar.
     * @returns {void}
     */
    public setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
    }
    
    /**
     * Obtiene el objeto ítem asociado.
     * 
     * @returns {Item} El elemento que compone el ítem del pedido.
     */
    public getItem(): Item {
        return this.item;
    }

    /**
     * Cambia el estado del ítem a en preparación ({@link EstadoProducto.EN_PREPARACION}), 
     * dando inicio al proceso de elaboración.
     * 
     * @returns {void}
     */
    public iniciar(): void {
        this.estado = EstadoProducto.EN_PREPARACION;
    }

    /**
     * Cambia el estado del ítem a listo ({@link EstadoProducto.LISTO}), 
     * indicando que su preparación ha finalizado.
     * 
     * @returns {void}
     */
    public finalizar(): void {
        this.estado = EstadoProducto.LISTO;
    }

    /**
     * Evalúa si el ítem todavía puede ser modificado basándose en su estado actual. 
     * Solo permite modificaciones si se encuentra en estado pendiente ({@link EstadoProducto.PENDIENTE}).
     * 
     * @returns {boolean} Retorna `true` si se puede modificar, o `false` en caso contrario.
     */
    public puedeModificarse(): boolean {
        return this.estado == EstadoProducto.PENDIENTE; 
    }
}