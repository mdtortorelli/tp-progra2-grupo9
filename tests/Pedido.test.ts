import { Pedido } from "../src/Pedido";
import { Cliente } from "../src/Cliente";
import { EstadoPedido } from "../src/EstadoPedido";
import { Item } from "../src/Item";
import MetodoPago from "../src/MetodoPago";
import { describe, test, expect, beforeEach, afterEach, it, jest } from '@jest/globals';


class PedidoTest extends Pedido {}


const crearCliente = (): Cliente => ({ nombre: "Cliente Test" } as unknown as Cliente);
const crearMetodoPago = (): MetodoPago => ({ tipo: "efectivo" } as unknown as MetodoPago);
const crearItem = (nombre = "item"): Item => ({ nombre } as unknown as Item);

describe("Pedido", () => {
  let cliente: Cliente;
  let metodoPago: MetodoPago;
  let pedido: PedidoTest;

  beforeEach(() => {
    cliente = crearCliente();
    metodoPago = crearMetodoPago();
    pedido = new PedidoTest(cliente, [], metodoPago);
  });

  describe("constructor", () => {
    it("inicia en estado EN_CONSTRUCCION", () => {
      expect(pedido.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
    });

    it("guarda cliente, método de pago e ítems recibidos", () => {
      const items = [crearItem("a")];
      const p = new PedidoTest(cliente, items, metodoPago);

      expect(p.getCliente()).toBe(cliente);
      expect(p.getMetodoDePago()).toBe(metodoPago);
      expect(p.getItems()).toEqual(items);
    });

    it("inicia con total null", () => {
      expect(pedido.getTotal()).toBeNull();
    });
  });

  describe("getters y setters", () => {
    it("setTotal / getTotal", () => {
      pedido.setTotal(1500);
      expect(pedido.getTotal()).toBe(1500);
    });

    it("setCliente cambia el cliente", () => {
      const otro = crearCliente();
      pedido.setCliente(otro);
      expect(pedido.getCliente()).toBe(otro);
    });

    it("setMetodoDePago cambia el método de pago", () => {
      const otro = crearMetodoPago();
      pedido.setMetodoDePago(otro);
      expect(pedido.getMetodoDePago()).toBe(otro);
    });

    it("setEstado cambia el estado", () => {
      pedido.setEstado(EstadoPedido.CONFIRMADO);
      expect(pedido.getEstado()).toBe(EstadoPedido.CONFIRMADO);
    });
  });

  describe("agregarItem", () => {
    it("agrega un ítem al pedido", () => {
      const item = crearItem();
      pedido.agregarItem(item);

      expect(pedido.getItems()).toHaveLength(1);
      expect(pedido.getItems()[0]).toBe(item);
    });

    it("agrega varios ítems en orden", () => {
      const a = crearItem("a");
      const b = crearItem("b");
      pedido.agregarItem(a);
      pedido.agregarItem(b);

      expect(pedido.getItems()).toEqual([a, b]);
    });

    it("lanza error si el pedido ya está confirmado", () => {
      pedido.agregarItem(crearItem());
      pedido.confirmar();

      expect(() => pedido.agregarItem(crearItem())).toThrow(
        "No se pueden agregar ítems. El pedido ya esta confirmado."
      );
    });
  });

  describe("quitarItem", () => {
    it("quita el ítem indicado", () => {
      const a = crearItem("a");
      const b = crearItem("b");
      pedido.agregarItem(a);
      pedido.agregarItem(b);

      pedido.quitarItem(a);

      expect(pedido.getItems()).toEqual([b]);
    });

    it("si el ítem está repetido, quita solo la primera aparición", () => {
      const a = crearItem("a");
      pedido.agregarItem(a);
      pedido.agregarItem(a);

      pedido.quitarItem(a);

      expect(pedido.getItems()).toHaveLength(1);
    });

    it("no modifica los ítems si el ítem no existe en el pedido", () => {
      const a = crearItem("a");
      pedido.agregarItem(a);

      pedido.quitarItem(crearItem("inexistente"));

      expect(pedido.getItems()).toEqual([a]);
    });

    it("lanza error si el pedido ya está confirmado", () => {
      const a = crearItem();
      pedido.agregarItem(a);
      pedido.confirmar();

      expect(() => pedido.quitarItem(a)).toThrow(
        "No se puede eliminar el item. El pedido ya esta confirmado"
      );
    });
  });

  describe("deshacerUltimaModificacion", () => {
    it("deshace un agregarItem", () => {
      const a = crearItem("a");
      pedido.agregarItem(a);

      pedido.deshacerUltimaModificacion();

      expect(pedido.getItems()).toEqual([]);
    });

    it("deshace un quitarItem", () => {
      const a = crearItem("a");
      const b = crearItem("b");
      pedido.agregarItem(a);
      pedido.agregarItem(b);
      pedido.quitarItem(a);

      pedido.deshacerUltimaModificacion();

      expect(pedido.getItems()).toEqual([a, b]);
    });

    it("deshace varias modificaciones sucesivas (orden LIFO)", () => {
      const a = crearItem("a");
      const b = crearItem("b");
      const c = crearItem("c");
      pedido.agregarItem(a);
      pedido.agregarItem(b);
      pedido.agregarItem(c);

      pedido.deshacerUltimaModificacion();
      expect(pedido.getItems()).toEqual([a, b]);

      pedido.deshacerUltimaModificacion();
      expect(pedido.getItems()).toEqual([a]);

      pedido.deshacerUltimaModificacion();
      expect(pedido.getItems()).toEqual([]);
    });

    it("sin historial informa por consola y no modifica el pedido", () => {
      const spy = jest.spyOn(console, "log").mockImplementation(() => {});

      pedido.deshacerUltimaModificacion();

      expect(spy).toHaveBeenCalledWith("No hay modificaciones para deshacer.");
      expect(pedido.getItems()).toEqual([]);
      spy.mockRestore();
    });

    it("lanza error si el pedido ya está confirmado", () => {
      pedido.agregarItem(crearItem());
      pedido.confirmar();

      expect(() => pedido.deshacerUltimaModificacion()).toThrow(
        "Error , El pedido ya fue confirmado."
      );
    });
  });

  describe("obtenerEstadosItems", () => {
    it("imprime una línea por cada ítem, numeradas desde 1", () => {
      const spy = jest.spyOn(console, "log").mockImplementation(() => {});
      pedido.agregarItem(crearItem("a"));
      pedido.agregarItem(crearItem("b"));

      pedido.obtenerEstadosItems();

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, "Ítem 1: Estado actual");
      expect(spy).toHaveBeenNthCalledWith(2, "Ítem 2: Estado actual");
      spy.mockRestore();
    });

    it("no imprime nada si no hay ítems", () => {
      const spy = jest.spyOn(console, "log").mockImplementation(() => {});

      pedido.obtenerEstadosItems();

      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe("confirmar", () => {
    it("pasa el estado a CONFIRMADO si tiene ítems", () => {
      pedido.agregarItem(crearItem());

      pedido.confirmar();

      expect(pedido.getEstado()).toBe(EstadoPedido.CONFIRMADO);
    });

    it("lanza error si no tiene ítems", () => {
      expect(() => pedido.confirmar()).toThrow(
        "No se puede confirmar un pedido sin ítems."
      );
      expect(pedido.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
    });

    it("lanza error si ya fue confirmado", () => {
      pedido.agregarItem(crearItem());
      pedido.confirmar();

      expect(() => pedido.confirmar()).toThrow("El pedido ya fue confirmado.");
    });
  });
});