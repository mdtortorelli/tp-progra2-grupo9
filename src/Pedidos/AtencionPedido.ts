import { Pedido } from "./Pedido";
import { EstadoPedido } from "./EstadoPedido";

/**
 * Interfaz que define las operaciones disponibles para la gestión y atención de pedidos.
 * Permite realizar acciones sobre los ítems, consultar estados y confirmar el flujo del pedido.
 * 
 * @interface AtencionPedido
 */
export interface AtencionPedido {
    
    /**
     * Elimina un ítem seleccionado de la atención del pedido.
     * 
     * @returns {void}
     */
    eliminarItem(): void;

    /**
     * Obtiene el estado actual correspondiente a un pedido específico.
     * 
     * @param {Pedido} pedido - El objeto del pedido del cual se consultará el estado.
     * @returns {EstadoPedido} El estado actual en el que se encuentra el pedido.
     */
    obtenerEstadoPedido(pedido: Pedido): EstadoPedido;

    /**
     * Consulta y procesa los estados individuales de los ítems que componen el pedido.
     * 
     * @param {Pedido} pedido - El objeto del pedido cuyos ítems van a ser consultados.
     * @returns {void}
     */
    consultarEstadosDeItems(pedido: Pedido): void;

    /**
     * Confirma de manera formal un pedido para avanzar en el proceso de atención.
     * 
     * @param {Pedido} pedido - El objeto del pedido que se desea confirmar.
     * @returns {void}
     */
    confirmarPedido(pedido: Pedido): void;
}