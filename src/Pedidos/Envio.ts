import { Pedido } from "./Pedido";
import { Cliente } from "../Restaurante/Cliente";
import MetodoPago from "../MediosDePago/MetodoPago";

/**
 * Representa un pedido de tipo envío a domicilio, el cual incluye información 
 * sobre la dirección de entrega y el costo asociado.
 * Extiende la funcionalidad base de {@link Pedido}.
 * 
 * @class Envio
 * @extends {Pedido}
 */
export class Envio extends Pedido {
    /** Dirección postal o física de destino del envío. */
    private direccion: string;

    /** Costo monetario asociado al envío. */
    private costo: number;

    /** Longitud mínima permitida para una dirección válida. */
    private static readonly longitudMinima = 0;

    /** Costo mínimo permitido para el envío (evita valores negativos). */
    private static readonly costoMinimo = 0;

    /**
     * Crea una instancia de un pedido con modalidad de envío.
     * Valida que la dirección no esté vacía y que el costo no sea negativo.
     * 
     * @constructor
     * @param {Cliente} cliente - El cliente que realiza el pedido.
     * @param {MetodoPago} metodoDePago - El método de pago seleccionado para la transacción.
     * @param {string} direccion - La dirección de destino del envío.
     * @param {number} costo - El valor económico del envío.
     * @throws {Error} Lanza un error si la dirección es inválida o el costo es negativo.
     */
    public constructor(cliente: Cliente, metodoDePago: MetodoPago, direccion: string, costo: number) {
        super(cliente, [], metodoDePago);
        Envio.validarDireccion(direccion);
        Envio.validarCosto(costo);
        this.direccion = direccion;
        this.costo = costo;
    }

    /**
     * Valida que la dirección ingresada no sea nula, indefinida o esté vacía.
     * 
     * @private
     * @static
     * @param {string} direccion - La dirección a validar.
     * @throws {Error} Lanza un error si la dirección no cumple con la longitud mínima.
     */
    private static validarDireccion(direccion: string): void {
        if (!direccion || direccion.trim().length === Envio.longitudMinima) {
            throw new Error("Error ingrese la direccion de vuelta");
        }
    }

    /**
     * Valida que el costo del envío no sea un valor negativo.
     * 
     * @private
     * @static
     * @param {number} costo - El costo a validar.
     * @throws {Error} Lanza un error si el costo es menor al mínimo permitido.
     */
    private static validarCosto(costo: number): void {
        if (costo < Envio.costoMinimo) {
            throw new Error("el costo nunca puede ser negativo.");
        }
    }

    /**
     * Obtiene la dirección actual de destino del envío.
     * 
     * @returns {string} La dirección de entrega.
     */
    public getDireccion(): string {
        return this.direccion;
    }

    /**
     * Establece o modifica la dirección de destino, aplicando previamente la validación correspondiente.
     * 
     * @param {string} direccion - La nueva dirección a asignar.
     * @returns {void}
     * @throws {Error} Lanza un error si la nueva dirección es inválida.
     */
    public setDireccion(direccion: string): void {
        Envio.validarDireccion(direccion);
        this.direccion = direccion;
    }

    /**
     * Obtiene el costo actual del envío.
     * 
     * @returns {number} El valor del costo.
     */
    public getCosto(): number {
        return this.costo;
    }

    /**
     * Establece o modifica el costo del envío, aplicando previamente la validación correspondiente.
     * 
     * @param {number} costo - El nuevo costo a asignar.
     * @returns {void}
     * @throws {Error} Lanza un error si el costo es negativo.
     */
    public setCosto(costo: number): void {
        Envio.validarCosto(costo);
        this.costo = costo;
    }
}