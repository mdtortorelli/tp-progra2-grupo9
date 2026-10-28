import { describe, test, expect, beforeEach, afterEach, it, jest} from '@jest/globals';
import { Pedido } from '../src/Pedido';
import { EstadoPedido } from "../src/EstadoPedido";
import { Cliente } from "../src/Cliente";
import { Item } from "../src/Item";
import MetodoPago from "../src/MetodoPago";
import { ItemPedido } from '../src/ItemPedido';
import { itemPedidoMock, itemPedidoMock1, itemPedidoMock2 } from './mocks';
import { EstadoProducto } from '../src/EstadoProducto';

// Subclase concreta solo para poder testear la clase abstracta
class PedidoTest extends Pedido {}

describe("Pedido", () => {
    let cliente: Cliente;
    let metodoPago: MetodoPago;
    let item1: ItemPedido;
    let item2: ItemPedido;
    let item3: ItemPedido;
    let pedido: PedidoTest;

    beforeEach(() => {
        cliente = { nombre: "Juan" } as unknown as Cliente;
        metodoPago = { tipo: "efectivo" } as unknown as MetodoPago;
        // Objetos distintos: quitarItem compara con ===
        item1 = itemPedidoMock;
        item2 = itemPedidoMock1;
        item3 = itemPedidoMock2;

        pedido = new PedidoTest(cliente, [item1], metodoPago);
    });

    describe("constructor", () => {
        it("inicia EN_CONSTRUCCION con los datos recibidos", () => {
            expect(pedido.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
            expect(pedido.getCliente()).toBe(cliente);
            expect(pedido.getMetodoDePago()).toBe(metodoPago);
            expect(pedido.getItems()).toEqual([item1]);
        });

        it("inicia con total null", () => {
            expect(pedido.getTotal()).toBeNull();
        });
    });

    describe("total", () => {
        it("setTotal actualiza el total", () => {
            pedido.setTotal(1500);
            expect(pedido.getTotal()).toBe(1500);
        });
    });

    describe("agregarItem", () => {
        it("agrega el ítem al pedido", () => {
            pedido.agregarItem(item2);
            expect(pedido.getItems()).toEqual([item1, item2]);
        });

        it("lanza error si el pedido ya está confirmado", () => {
            pedido.confirmar();
            expect(() => pedido.agregarItem(item2)).toThrow(
                "No se pueden agregar ítems. El pedido ya esta confirmado."
            );
            expect(pedido.getItems()).toEqual([item1]);
        });
    });

    describe("quitarItem", () => {
        it("quita el ítem indicado", () => {
            pedido.agregarItem(item2);
            pedido.quitarItem(item1);
            expect(pedido.getItems()).toEqual([item2]);
        });

        it("quita solo la primera aparición si el ítem está repetido", () => {
            pedido.agregarItem(item1);
            pedido.quitarItem(item1);
            expect(pedido.getItems()).toEqual([item1]);
        });

        it("no modifica nada si el ítem no está en el pedido", () => {
            pedido.quitarItem(item3);
            expect(pedido.getItems()).toEqual([item1]);
        });

        it("lanza error si el pedido ya está confirmado", () => {
            pedido.confirmar();
            expect(() => pedido.quitarItem(item1)).toThrow(
                "No se puede eliminar el item. El pedido ya esta confirmado"
            );
            expect(pedido.getItems()).toEqual([item1]);
        });
    });

    describe("deshacerUltimaModificacion", () => {
        it("revierte un agregarItem", () => {
            pedido.agregarItem(item2);
            pedido.deshacerUltimaModificacion();
            expect(pedido.getItems()).toEqual([item1]);
        });

        it("revierte un quitarItem", () => {
            pedido.quitarItem(item1);
            pedido.deshacerUltimaModificacion();
            expect(pedido.getItems()).toEqual([item1]);
        });

        it("revierte varias modificaciones en orden inverso", () => {
            pedido.agregarItem(item2);
            pedido.agregarItem(item3);

            pedido.deshacerUltimaModificacion();
            expect(pedido.getItems()).toEqual([item1, item2]);

            pedido.deshacerUltimaModificacion();
            expect(pedido.getItems()).toEqual([item1]);
        });

        it("sin historial no cambia nada y avisa por consola", () => {
            const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

            pedido.deshacerUltimaModificacion();

            expect(pedido.getItems()).toEqual([item1]);
            expect(logSpy).toHaveBeenCalledWith("No hay modificaciones para deshacer.");
            logSpy.mockRestore();
        });

        it("lanza error si el pedido ya está confirmado", () => {
            pedido.confirmar();
            expect(() => pedido.deshacerUltimaModificacion()).toThrow(
                "Error , El pedido ya fue confirmado."
            );
        });
    });

    describe("confirmar", () => {
        it("cambia el estado a CONFIRMADO", () => {
            pedido.confirmar();
            expect(pedido.getEstado()).toBe(EstadoPedido.CONFIRMADO);
        });

        it("lanza error si no hay ítems", () => {
            const vacio = new PedidoTest(cliente, [], metodoPago);
            expect(() => vacio.confirmar()).toThrow(
                "No se puede confirmar un pedido sin items."
            );
            expect(vacio.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
        });

        it("lanza error si ya fue confirmado", () => {
            pedido.confirmar();
            expect(() => pedido.confirmar()).toThrow("El pedido ya fue confirmado.");
        });
    });

    describe("obtenerEstadosItems", () => {
        it("imprime una línea por cada ítem, numeradas desde 1", () => {
            const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
            pedido.agregarItem(item2);

            pedido.obtenerEstadosItems();

            expect(logSpy).toHaveBeenCalledTimes(2);
            expect(logSpy).toHaveBeenNthCalledWith(1, `Ítem 1: ${EstadoProducto.EN_PREPARACION}`);
            expect(logSpy).toHaveBeenNthCalledWith(2, `Ítem 2: ${EstadoProducto.EN_PREPARACION}`);
            logSpy.mockRestore();
        });
    });

    describe("getters y setters", () => {
        it("setCliente cambia el cliente", () => {
            const otro = { nombre: "Ana" } as unknown as Cliente;
            pedido.setCliente(otro);
            expect(pedido.getCliente()).toBe(otro);
        });

        it("setMetodoDePago cambia el método de pago", () => {
            const otro = { tipo: "tarjeta" } as unknown as MetodoPago;
            pedido.setMetodoDePago(otro);
            expect(pedido.getMetodoDePago()).toBe(otro);
        });

        it("setEstado cambia el estado", () => {
            pedido.setEstado(EstadoPedido.CONFIRMADO);
            expect(pedido.getEstado()).toBe(EstadoPedido.CONFIRMADO);
        });
    });
});