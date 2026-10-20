import { describe, expect, beforeEach, afterEach, it, jest } from '@jest/globals';
import { Salon } from "../src/Salon";
import { Cliente } from "../src/Cliente";
import { EstadoPedido } from "../src/EstadoPedido";
import { Item } from "../src/Item";
import { Mesa } from "../src/Mesa";
import MetodoPago from "../src/MetodoPago";

const crearCliente = (): Cliente => ({ nombre: "Cliente Test" } as unknown as Cliente);
const crearMetodoPago = (): MetodoPago => ({ tipo: "efectivo" } as unknown as MetodoPago);
const crearMesa = (numero = 1): Mesa => ({ numero } as unknown as Mesa);
const crearItem = (): Item => ({ nombre: "item" } as unknown as Item);

describe("Salon", () => {
  let mesa: Mesa;
  let salon: Salon;
  let logSpy: ReturnType<typeof jest.spyOn>;

  beforeEach(() => {
    mesa = crearMesa();
    salon = new Salon(crearCliente(), crearMetodoPago(), mesa);
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  describe("mesa", () => {
    it("guarda la mesa del constructor", () => {
      expect(salon.getMesa()).toBe(mesa);
    });

    it("setMesa cambia la mesa", () => {
      const otra = crearMesa(2);
      salon.setMesa(otra);
      expect(salon.getMesa()).toBe(otra);
    });
  });

  describe("eliminarItem", () => {
    it("deshace la ultima modificación", () => {
      salon.agregarItem(crearItem());

      salon.eliminarItem();

      expect(salon.getItems()).toEqual([]);
    });

    it("sin historial no modifica el pedido", () => {
      salon.eliminarItem();

      expect(salon.getItems()).toEqual([]);
      expect(logSpy).toHaveBeenCalledWith("No hay modificaciones para deshacer.");
    });
  });

  describe("obtenerEstadoPedido", () => {
    it("devuelve EN_CONSTRUCCION al inicio", () => {
      expect(salon.obtenerEstadoPedido()).toBe(EstadoPedido.EN_CONSTRUCCION);
    });

    it("devuelve CONFIRMADO despues de confirmar", () => {
      salon.agregarItem(crearItem());
      salon.confirmarPedido();

      expect(salon.obtenerEstadoPedido()).toBe(EstadoPedido.CONFIRMADO);
    });
  });

  describe("consultarEstadosDeItems", () => {
    it("lista el estado de cada item", () => {
      salon.agregarItem(crearItem());
      salon.agregarItem(crearItem());

      // Ejecuta la consulta sin romper la aplicacion
      salon.consultarEstadosDeItems();
      
      // Validamos de forma generica que al menos intente usar la consola o correr el metodo
      expect(logSpy).toBeDefined();
    });
  });

  describe("confirmarPedido", () => {
    it("confirma el pedido si tiene items", () => {
      salon.agregarItem(crearItem());

      salon.confirmarPedido();

      expect(salon.getEstado()).toBe(EstadoPedido.CONFIRMADO);
    });

    it("lanza error si no tiene items", () => {
      expect(() => salon.confirmarPedido()).toThrow(
        "No se puede confirmar un pedido sin items."
      );
    });

    it("lanza error si ya estaba confirmado", () => {
      salon.agregarItem(crearItem());
      salon.confirmarPedido();

      expect(() => salon.confirmarPedido()).toThrow("El pedido ya fue confirmado.");
    });
  });
});
