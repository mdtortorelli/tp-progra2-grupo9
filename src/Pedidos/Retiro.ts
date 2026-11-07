import { Pedido } from "./Pedido";
import { Cliente } from "../Restaurante/Cliente";
import MetodoPago from "../MediosDePago/MetodoPago";
import { AtencionPedido } from "./AtencionPedido";
import { EstadoPedido } from "./EstadoPedido";

/**
 * Representa un pedido bajo la modalidad de retiro en el local, implementando 
 * la interfaz {@link AtencionPedido} para gestionar las operaciones de atención 
 * y extendiendo la funcionalidad base de {@link Pedido}.
 * 
 * @class Retiro
 * @extends {Pedido}
 * @implements {AtencionPedido}
 */
export class Retiro extends Pedido implements AtencionPedido {
    /** Horario programado en el que se realizará el retiro del pedido. */
    private horarioRetiro: Date;

    /**
     * Crea una instancia de un pedido con modalidad de retiro.
     * 
     * @constructor
     * @param {Cliente} cliente - El cliente que realiza el pedido.
     * @param {MetodoPago} metodoDePago - El método de pago seleccionado para la transacción.
     * @param {Date} horarioRetiro - El horario estipulado para retirar el pedido.
     */
    public constructor(cliente: Cliente, metodoDePago: MetodoPago, horarioRetiro: Date) {
        super(cliente, [], metodoDePago);
        this.horarioRetiro = horarioRetiro;
    }

    /**
     * Obtiene el horario programado para el retiro del pedido.
     * 
     * @returns {Date} La fecha y hora de retiro.
     */
    public getHorarioRetiro(): Date {
        return this.horarioRetiro;
    }

    /**
     * Establece o modifica el horario programado para el retiro del pedido.
     * 
     * @param {Date} horarioRetiro - El nuevo horario de retiro a asignar.
     * @returns {void}
     */
    public setHorarioRetiro(horarioRetiro: Date): void {
        this.horarioRetiro = horarioRetiro;
    }

    /**
     * Elimina el último ítem o acción registrada deshaciendo la última modificación, 
     * imprimiendo por consola un mensaje informativo que incluye la hora del retiro.
     * 
     * @returns {void}
     */
    public eliminarItem(): void {
        const hora = this.horarioRetiro.getHours();
        const minutos = this.horarioRetiro.getMinutes();
        console.log(`Borrando la ultima accion del retiro de las ${hora}:${minutos}`);
        this.deshacerUltimaModificacion();
    }

    /**
     * Obtiene el estado actual de un pedido dado, validando que corresponda 
     * a esta misma instancia de retiro.
     * 
     * @override
     * @param {Pedido} pedido - El pedido a consultar.
     * @returns {EstadoPedido} El estado actual del pedido.
     * @throws {Error} Lanza un error si el pedido consultado no coincide con esta instancia.
     */
    public obtenerEstadoPedido(pedido: Pedido): EstadoPedido {
        if (pedido !== this) {
            throw new Error("Este mozo solo puede consultar su propio pedido.");
        }
        return this.getEstado();
    }

    /**
     * Consulta e imprime los estados de los ítems de un pedido específico, 
     * mostrando un mensaje descriptivo en consola basado en la hora de retiro.
     * 
     * @override
     * @param {Pedido} pedido - El pedido cuyos ítems se van a consultar.
     * @returns {void}
     */
    public consultarEstadosDeItems(pedido: Pedido): void {
        const hora = this.horarioRetiro.getHours();
        const minutos = this.horarioRetiro.getMinutes();
        console.log(`Revisando estado para el retiro de las ${hora}:${minutos}`);
        pedido.obtenerEstadosItems();
    }

    /**
     * Confirma un pedido determinado y registra un mensaje informativo en consola 
     * especificando el horario en el que se retirará.
     * 
     * @override
     * @param {Pedido} pedido - El pedido que se desea confirmar.
     * @returns {void}
     */
    public confirmarPedido(pedido: Pedido): void {
        pedido.confirmar();
        const hora = this.horarioRetiro.getHours();
        const minutos = this.horarioRetiro.getMinutes();
        console.log(`Pedido confirmado para retirar a las ${hora}:${minutos}`);
    }
}