import { describe, expect, beforeEach, it } from '@jest/globals';
import { Envio } from "../src/Envio";
import { Cliente } from "../src/Cliente";
import { EstadoPedido } from "../src/EstadoPedido";
import { Item } from "../src/Item";
import MetodoPago from "../src/MetodoPago";
import { ItemPedido } from '../src/ItemPedido';

const crearCliente = (): Cliente => ({ nombre: "Cliente Test" } as unknown as Cliente);
const crearMetodoPago = (): MetodoPago => ({ tipo: "efectivo" } as unknown as MetodoPago);
const crearItem = (): ItemPedido => ({ nombre: "item" } as unknown as ItemPedido);

describe("Envio", () => {
  let cliente: Cliente;
  let metodoPago: MetodoPago;
  let envio: Envio;

  beforeEach(() => {
    cliente = crearCliente();
    metodoPago = crearMetodoPago();
    envio = new Envio(cliente, metodoPago, "Calle Falsa 123", 500);
  });

  describe("constructor", () => {
    it("guarda direccion y costo", () => {
      expect(envio.getDireccion()).toBe("Calle Falsa 123");
      expect(envio.getCosto()).toBe(500);
    });

    it("hereda de Pedido: cliente, metodo de pago, estado inicial y sin items", () => {
      expect(envio.getCliente()).toBe(cliente);
      expect(envio.getMetodoDePago()).toBe(metodoPago);
      expect(envio.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
      expect(envio.getItems()).toEqual([]);
    });

    it("acepta costo 0", () => {
      expect(() => new Envio(cliente, metodoPago, "Calle 1", 0)).not.toThrow();
    });

    it("lanza error con direccion vacia", () => {
      expect(() => new Envio(cliente, metodoPago, "", 100)).toThrow(
        "Error ingrese la direccion de vuelta"
      );
    });

    it("lanza error con direccion de solo espacios", () => {
      expect(() => new Envio(cliente, metodoPago, "   ", 100)).toThrow(
        "Error ingrese la direccion de vuelta"
      );
    });

    it("lanza error con costo negativo", () => {
      expect(() => new Envio(cliente, metodoPago, "Calle 1", -1)).toThrow(
        "el costo nunca puede ser negativo."
      );
    });
  });

  describe("setDireccion", () => {
    it("cambia la direccion", () => {
      envio.setDireccion("Otra Calle 456");
      expect(envio.getDireccion()).toBe("Otra Calle 456");
    });

    it("lanza error con direccion invalida y conserva la anterior", () => {
      expect(() => envio.setDireccion("  ")).toThrow("Error ingrese la direccion de vuelta");
      expect(envio.getDireccion()).toBe("Calle Falsa 123");
    });
  });

  describe("setCosto", () => {
    it("cambia el costo", () => {
      envio.setCosto(900);
      expect(envio.getCosto()).toBe(900);
    });

    it("acepta 0", () => {
      envio.setCosto(0);
      expect(envio.getCosto()).toBe(0);
    });

    it("lanza error con costo negativo y conserva el anterior", () => {
      expect(() => envio.setCosto(-10)).toThrow("el costo nunca puede ser negativo.");
      expect(envio.getCosto()).toBe(500);
    });
  });

  describe("comportamiento heredado de Pedido", () => {
    it("permite agregar items y confirmar", () => {
      envio.agregarItem(crearItem());
      envio.confirmar();
      expect(envio.getEstado()).toBe(EstadoPedido.CONFIRMADO);
    });
  });
});
