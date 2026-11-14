import { describe, expect, beforeEach, afterEach, it, jest } from '@jest/globals';
import { Retiro }  from "../../src/Pedidos/Retiro";
import { Cliente } from "../../src/Restaurante/Cliente";
import { EstadoPedido } from "../../src/Pedidos/EstadoPedido";
import MetodoPago from "../../src/MediosDePago/MetodoPago";
import { ItemPedido } from '../../src/Productos/ItemPedido';
import { itemPedidoMock } from '../Utils/mocks';

const crearCliente = (): Cliente => ({ nombre: "Cliente Test" } as unknown as Cliente);
const crearMetodoPago = (): MetodoPago => ({ tipo: "efectivo" } as unknown as MetodoPago);
const crearItem = (): ItemPedido => itemPedidoMock;

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

      retiro.deshacerUltimaModificacion();

      expect(retiro.getItems()).toEqual([]);
      expect(logSpy).toHaveBeenCalledWith(
        "Borrando la ultima accion del retiro de las 20:30"
      );
    });

    it("sin historial no modifica el pedido", () => {
      retiro.deshacerUltimaModificacion();

      expect(retiro.getItems()).toEqual([]);
      expect(logSpy).toHaveBeenCalledWith("No hay modificaciones para deshacer.");
    });
  });

  describe("obtenerEstadoPedido", () => {
    it("devuelve el estado si se consulta su propio pedido", () => {
      expect(retiro.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
    });
    
  });

  describe("consultarEstadosDeItems", () => {
    it("informa el horario y ejecuta la consulta de items", () => {
      retiro.agregarItem(crearItem());
      retiro.agregarItem(crearItem());

     
      retiro.obtenerEstadosItems();

   expect(logSpy).toHaveBeenCalledWith("Revisando estado para el retiro de las 20:30");
    });
  });

  describe("confirmarPedido", () => {
    it("confirma el pedido e informa por consola", () => {
      retiro.agregarItem(crearItem());

      retiro.confirmar();

      expect(retiro.getEstado()).toBe(EstadoPedido.CONFIRMADO);
      expect(logSpy).toHaveBeenCalledWith("Pedido confirmado para retirar a las 20:30");
    });

    it("lanza error si el pedido no tiene items", () => {
      expect(() => retiro.confirmar()).toThrow(
        "No se puede confirmar un pedido sin items."
      );
    });
  });
});
