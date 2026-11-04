import { Pedido } from "./Pedido";
import { Cliente } from "./Cliente";
import MetodoPago from "./MetodoPago";
import { AtencionPedido } from "./AtencionPedido";
import { Mesa } from "./Mesa";
import { EstadoPedido } from "./EstadoPedido";

/**
 * Representa un pedido realizado para ser consumido en el salón del establecimiento, 
 * implementando la interfaz {@link AtencionPedido} para gestionar las operaciones de atención 
 * y extendiendo la funcionalidad base de {@link Pedido}.
 * 
 * @class Salon
 * @extends {Pedido}
 * @implements {AtencionPedido}
 */
export class Salon extends Pedido implements AtencionPedido {
    /** Mesa física asociada al pedido en el salón. */
    private mesa: Mesa;

    /**
     * Crea una instancia de un pedido para consumo en el salón.
     * 
     * @constructor
     * @param {Cliente} cliente - El cliente que realiza el pedido.
     * @param {MetodoPago} metodoDePago - El método de pago seleccionado para la transacción.
     * @param {Mesa} mesa - La mesa asignada al pedido.
     */
    public constructor(cliente: Cliente, metodoDePago: MetodoPago, mesa: Mesa) {
        super(cliente, [], metodoDePago);
        this.mesa = mesa;
    }

    /**
     * Obtiene la mesa asociada al pedido del salón.
     * 
     * @returns {Mesa} El objeto mesa correspondiente.
     */
    public getMesa(): Mesa {
        return this.mesa;
    }

    /**
     * Establece o modifica la mesa asignada al pedido del salón.
     * 
     * @param {Mesa} mesa - La nueva mesa a asignar.
     * @returns {void}
     */
    public setMesa(mesa: Mesa): void {
        this.mesa = mesa;
    }

    /**
     * Elimina el último ítem o acción registrada deshaciendo la última modificación realizada.
     * 
     * @override
     * @returns {void}
     */
    public eliminarItem(): void {
        this.deshacerUltimaModificacion();
    }

    /**
     * Obtiene el estado actual en el que se encuentra el pedido del salón.
     * 
     * @override
     * @returns {EstadoPedido} El estado actual del pedido.
     */
    public obtenerEstadoPedido(): EstadoPedido {
        return this.getEstado();
    }

    /**
     * Consulta e imprime en consola los estados actuales de preparación de cada uno de los ítems del pedido.
     * 
     * @override
     * @returns {void}
     */
    public consultarEstadosDeItems(): void {
        this.obtenerEstadosItems();
    }

    /**
     * Confirma formalmente el pedido del salón, cambiando su estado a confirmado.
     * 
     * @override
     * @returns {void}
     */
    public confirmarPedido(): void {
        this.confirmar();
    }
}