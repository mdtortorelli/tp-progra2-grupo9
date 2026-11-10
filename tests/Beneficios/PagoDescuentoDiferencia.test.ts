import { DiaSemana } from "../../src/Utils/DiaSemana";
import { Cliente } from "../../src/Restaurante/Cliente";
import { Pedido } from "../../src/Pedidos/Pedido";
import MetodoPago from "../../src/MediosDePago/MetodoPago";
import { Efectivo } from "../../src/MediosDePago/Efectivo";
import { Credito } from "../../src/MediosDePago/Credito";
import { Debito } from "../../src/MediosDePago/Debito";
import { BilleteraVirtual } from "../../src/MediosDePago/BilleteraVirtual";
import { SUBTOTAL, DESCUENTO_DIA, CERO } from "../../src/Utils/Constantes";

import { describe, expect, beforeEach, afterEach, test, it } from '@jest/globals';

class PedidoDePrueba extends Pedido {}

const SABADO = DiaSemana.SABADO;
const MARTES = DiaSemana.MARTES;

function pagar(metodo: MetodoPago, descuento?: number): number | null {
    const pedido = new PedidoDePrueba({} as Cliente, [], metodo);
    
    if(descuento == undefined) {
        descuento = CERO;
    }

    metodo.realizarPago(pedido, SUBTOTAL, descuento);
    return pedido.getTotal();
}

describe("Efectivo", () => {
    it("10% en sábado (15% x descuento del día): gana el del día", () => {
        expect(pagar(new Efectivo(10), 15)).toBe(850);
    });

    it("10% en martes (sin descuento del día): gana efectivo", () => {
        expect(pagar(new Efectivo(10), 10)).toBe(900);
    });

    it("20% en sábado (15% x descuento del día): gana efectivo", () => {
        expect(pagar(new Efectivo(20),15)).toBe(800);
    });

    it("10% sin pasar día: aplica solo efectivo", () => {
        expect(pagar(new Efectivo(10),0)).toBe(900);
    });
});

describe("Débito", () => {
    it("en sábado aplica el descuento del día", () => {
        expect(pagar(new Debito(10), 15)).toBe(850);
    });

    it("en martes no tiene descuento", () => {
        expect(pagar(new Debito(0), 0)).toBe(1000);
    });
});

describe("Billetera virtual", () => {
    it("aplica el descuento del día", () => {
        expect(pagar(new BilleteraVirtual(10), 15)).toBe(850);
    });

    it("no tiene descuento del dia", () => {
        expect(pagar(new BilleteraVirtual(10), 0)).toBe(900);
    });
});

describe("Crédito", () => {
    it("1 cuota en sábado aplica el descuento del día", () => {
        expect(pagar(new Credito(10,1), 15)).toBe(850);
    });

    it("3 cuotas no tiene descuento diario", () => {
        expect(pagar(new Credito(10, 3), 0)).toBe(900);
    });

    it("1 cuota no tiene descuento diario", () => {
        expect(pagar(new Credito(10, 1), 0)).toBe(900);
    });
});