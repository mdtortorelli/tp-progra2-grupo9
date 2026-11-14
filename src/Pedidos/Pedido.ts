import { Cliente } from "../Restaurante/Cliente";
import { CERO, N_UNO } from "../Utils/Constantes";
import { EstadoPedido } from "./EstadoPedido"; 
import { EstadoProducto } from "../Productos/EstadoProducto";
import { ItemPedido } from "../Productos/ItemPedido";
import MetodoPago  from "../MediosDePago/MetodoPago";
 
/**
 * Clase abstracta que representa la estructura y comportamiento base para los pedidos 
 * dentro del sistema, gestionando clientes, ítems, historial de modificaciones, 
 * estados del pedido y métodos de pago.
 * 
 * @abstract
 * @class Pedido
 */
export abstract class Pedido {
    /** Cliente que realiza el pedido. */
    private cliente: Cliente;

    /** Colección de ítems que componen el pedido. */
    private pedidosItems: ItemPedido[];

    /** Estado actual en el que se encuentra el ciclo de vida del pedido. */
    private estado: EstadoPedido;

    /** Método de pago seleccionado para la transacción. */
    private metodoDePago: MetodoPago;

    /** Historial de modificaciones de los ítems para permitir deshacer cambios. */
    private historialItems: ItemPedido[][];

    /** Monto total calculado del pedido (puede ser nulo inicialmente). */
    private total: number | null = null;

    /** Descuento aplicado al pedido. */
    private descuentoAplicado: number = CERO;

    /**
     * Crea una instancia de un pedido, inicializando su estado en construcción ({@link EstadoPedido.EN_CONSTRUCCION}) 
     * y preparando las estructuras para el historial de modificaciones.
     * 
     * @constructor
     * @param {Cliente} cliente - El cliente asociado al pedido.
     * @param {ItemPedido[]} pedidosItems - Lista inicial de ítems que conforman el pedido.
     * @param {MetodoPago} metodoDePago - El método de pago configurado.
     */
    public constructor(cliente: Cliente, pedidosItems: ItemPedido[], metodoDePago: MetodoPago) {
        this.cliente = cliente;
        this.pedidosItems = pedidosItems;
        this.metodoDePago = metodoDePago;
        this.estado = EstadoPedido.EN_CONSTRUCCION;
        this.historialItems = [];
    }

    /**
     * Obtiene el monto total actual del pedido.
     * 
     * @returns {number | null} El valor total monetario, o `null` si aún no se ha calculado.
     */
    public getTotal(): number | null {
        return this.total;
    }

    /**
     * Establece o modifica el monto total del pedido.
     * 
     * @param {number} total - El nuevo valor total a asignar.
     * @returns {void}
     */
    public setTotal(total: number): void {
        this.total = total;
    }
 
     /**
     * Obtiene el descuento del pedido.
     * 
     * @returns {number } El descuento aplicado al pedido.
     */
    public getDescuentoAplicado(): number {
        return this.descuentoAplicado;
    }

    /**
     * Establece o modifica el descuento del pedido.
     * 
     * @param {number} descuentoAplicado - El valor del descuento a aplicar.
     * @returns {void}
     */
    public setDescuentoAplicado(descuento: number): void {
        this.descuentoAplicado = descuento;
    }

    /**
     * Guarda una copia del estado actual de los ítems en el historial 
     * antes de realizar cualquier modificación.
     * 
     * @private
     * @returns {void}
     */
    private guardarHistorial(): void {
        this.historialItems.push([...this.pedidosItems]);
    }
 
    /**
     * Agrega un nuevo ítem al pedido. Valida que el pedido se encuentre en estado de construcción; 
     * de lo contrario, lanza una excepción.
     * 
     * @param {ItemPedido} item - El ítem a incorporar.
     * @returns {void}
     * @throws {Error} Lanza un error si el pedido ya fue confirmado.
     */
    public agregarItem(item: ItemPedido): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("No se pueden agregar ítems. El pedido ya esta confirmado.");
        }
        this.guardarHistorial();
        this.pedidosItems.push(item);
    }
 
    /**
     * Elimina un ítem específico del pedido. Valida que el pedido se encuentre en estado de construcción.
     * 
     * @param {ItemPedido} item - El ítem que se desea remover.
     * @returns {void}
     * @throws {Error} Lanza un error si el pedido ya fue confirmado.
     */
    public quitarItem(item: ItemPedido): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("No se puede eliminar el item. El pedido ya esta confirmado");
        }
        this.guardarHistorial();

        for (let i = 0; i < this.pedidosItems.length; i++) {
            if (this.pedidosItems[i] === item) {
                this.pedidosItems.splice(i, N_UNO); 
                break;
            }
        }
    }
 
    /**
     * Deshace la última modificación realizada en los ítems del pedido utilizando el historial.
     * Valida que el pedido esté en construcción y que existan cambios previos registrados.
     * 
     * @returns {void}
     * @throws {Error} Lanza un error si el pedido ya fue confirmado.
     */
    public deshacerUltimaModificacion(): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("Error , El pedido ya fue confirmado.");
        }
        if (this.historialItems.length > CERO) {
            const estadoAnterior = this.historialItems.pop();
            if (estadoAnterior) {
                this.pedidosItems = estadoAnterior;
            }
        } else {
            console.log("No hay modificaciones para deshacer.");
        }
    }
 
    /**
     * Muestra por consola el estado actual de preparación de cada uno de los ítems del pedido.
     * 
     * @returns {void}
     */
    public obtenerEstadosItems(): void {
        this.pedidosItems.forEach((item, index) => {
            const estadoStr = EstadoProducto[item.getEstado()];
            console.log(`Ítem ${index + N_UNO}: ${estadoStr}`);
           // console.log(`Ítem ${index + N_UNO}: ${item.getEstado()}`);
        });
    }
 
    /**
     * Confirma formalmente el pedido, cambiando su estado a {@link EstadoPedido.CONFIRMADO}. 
     * Valida que esté en construcción y que contenga al menos un ítem.
     * 
     * @returns {void}
     * @throws {Error} Lanza un error si el pedido ya fue confirmado o si no posee ítems.
     */
    public confirmar(): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("El pedido ya fue confirmado.");
        }
        if (this.pedidosItems.length === CERO) {
            throw new Error("No se puede confirmar un pedido sin items.");
        }
        this.estado = EstadoPedido.CONFIRMADO;
    }
 
    /**
     * Obtiene el cliente asociado al pedido.
     * 
     * @returns {Cliente} El objeto cliente.
     */
    public getCliente(): Cliente {
        return this.cliente;
    }
 
    /**
     * Establece o modifica el cliente asociado al pedido.
     * 
     * @param {Cliente} cliente - El nuevo cliente a asignar.
     * @returns {void}
     */
    public setCliente(cliente: Cliente): void {
        this.cliente = cliente;
    }
 
    /**
     * Obtiene el estado actual del pedido.
     * 
     * @returns {EstadoPedido} El estado en el que se encuentra el pedido.
     */
    public getEstado(): EstadoPedido {
        return this.estado;
    }
 
    /**
     * Establece o modifica el estado del pedido.
     * 
     * @param {EstadoPedido} nuevoEstado - El nuevo estado a asignar.
     * @returns {void}
     */
    public setEstado(nuevoEstado: EstadoPedido): void {
        this.estado = nuevoEstado;
    }
 
    /**
     * Obtiene la lista completa de ítems que componen el pedido.
     * 
     * @returns {ItemPedido[]} Un arreglo con los ítems del pedido.
     */
    public getItems(): ItemPedido[] {
        return this.pedidosItems;
    }
 
    /**
     * Obtiene el método de pago configurado para el pedido.
     * 
     * @returns {MetodoPago} El método de pago asociado.
     */
    public getMetodoDePago(): MetodoPago {
        return this.metodoDePago;
    }
 
    /**
     * Establece o modifica el método de pago del pedido.
     * 
     * @param {MetodoPago} metodoDePago - El nuevo método de pago a asignar.
     * @returns {void}
     */
    public setMetodoDePago(metodoDePago: MetodoPago): void {
        this.metodoDePago = metodoDePago;
    }
}