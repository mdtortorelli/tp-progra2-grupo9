import { describe, expect, beforeEach, afterEach, it, jest } from '@jest/globals';
import { Retiro }  from "../src/Retiro";
import { Cliente } from "../src/Cliente";
import { EstadoPedido } from "../src/EstadoPedido";
import { Item } from "../src/Item";
import MetodoPago from "../src/MetodoPago";

const crearCliente = (): Cliente => ({ nombre: "Cliente Test" } as unknown as Cliente);
const crearMetodoPago = (): MetodoPago => ({ tipo: "efectivo" } as unknown as MetodoPago);
const crearItem = (): Item => ({ nombre: "item" } as unknown as Item);

describe("Retiro", () => {
  let retiro: Retiro;
  let horario: Date;
  let logSpy: ReturnType<typeof jest.spyOn>;

  beforeEach(() => {
    horario = new Date(2026, 9, 11, 20, 30);
    retiro = new Retiro(crearCliente(), crearMetodoPago(), horario);
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  describe("horario de retiro", () => {
    it("guarda el horario del constructor", () => {
      expect(retiro.getHorarioRetiro()).toBe(horario);
    });

    it("setHorarioRetiro cambia el horario", () => {
      const nuevo = new Date(2026, 9, 11, 21, 0);
      retiro.setHorarioRetiro(nuevo);
      expect(retiro.getHorarioRetiro()).toBe(nuevo);
    });
  });

  describe("eliminarItem", () => {
    it("deshace la ultima modificacion e informa por consola", () => {
      retiro.agregarItem(crearItem());

      retiro.eliminarItem();

      expect(retiro.getItems()).toEqual([]);
      expect(logSpy).toHaveBeenCalledWith(
        "Borrando la ultima accion del retiro de las 20:30"
      );
    });

    it("sin historial no modifica el pedido", () => {
      retiro.eliminarItem();

      expect(retiro.getItems()).toEqual([]);
      expect(logSpy).toHaveBeenCalledWith("No hay modificaciones para deshacer.");
    });
  });

  describe("obtenerEstadoPedido", () => {
    it("devuelve el estado si se consulta su propio pedido", () => {
      expect(retiro.obtenerEstadoPedido(retiro)).toBe(EstadoPedido.EN_CONSTRUCCION);
    });

    it("lanza error si se consulta otro pedido", () => {
      const otro = new Retiro(crearCliente(), crearMetodoPago(), horario);

      expect(() => retiro.obtenerEstadoPedido(otro)).toThrow(
        "Este mozo solo puede consultar su propio pedido."
      );
    });
  });

  describe("consultarEstadosDeItems", () => {
    it("informa el horario y ejecuta la consulta de items", () => {
      retiro.agregarItem(crearItem());
      retiro.agregarItem(crearItem());

     
      retiro.consultarEstadosDeItems(retiro);

   expect(logSpy).toHaveBeenCalledWith("Revisando estado para el retiro de las 20:30");
    });
  });

  describe("confirmarPedido", () => {
    it("confirma el pedido e informa por consola", () => {
      retiro.agregarItem(crearItem());

      retiro.confirmarPedido(retiro);

      expect(retiro.getEstado()).toBe(EstadoPedido.CONFIRMADO);
      expect(logSpy).toHaveBeenCalledWith("Pedido confirmado para retirar a las 20:30");
    });

    it("lanza error si el pedido no tiene items", () => {
      expect(() => retiro.confirmarPedido(retiro)).toThrow(
        "No se puede confirmar un pedido sin items."
      );
    });
  });
});
