import { DiaSemana } from "../src/DiaSemana";
import { Cliente } from "../src/Cliente";
import { Pedido } from "../src/Pedido";
import MetodoPago from "../src/MetodoPago";
import { Efectivo } from "../src/Efectivo";
import { Credito } from "../src/Credito";
import { Debito } from "../src/Debito";
import { BilleteraVirtual } from "../src/BilleteraVirtual";
import { SUBTOTAL, DESCUENTO_DIA } from "../src/Constantes";


class PedidoDePrueba extends Pedido {}

const SABADO = DiaSemana.SABADO;
const MARTES = DiaSemana.MARTES;

function pagar(metodo: MetodoPago, dia?: DiaSemana): number | null {
    const pedido = new PedidoDePrueba({} as Cliente, [], metodo);
    metodo.realizarPago(pedido, SUBTOTAL, dia);
    return pedido.getTotal();
}

describe("Efectivo", () => {
    it("10% en sábado (15% x descuento del día): gana el del día", () => {
        expect(pagar(new Efectivo(10, [SABADO], DESCUENTO_DIA), SABADO)).toBe(850);
    });

    it("10% en martes (sin descuento del día): gana efectivo", () => {
        expect(pagar(new Efectivo(10, [SABADO], DESCUENTO_DIA), MARTES)).toBe(900);
    });

    it("20% en sábado (15% x descuento del día): gana efectivo", () => {
        expect(pagar(new Efectivo(20, [SABADO], DESCUENTO_DIA), SABADO)).toBe(800);
    });

    it("10% sin pasar día: aplica solo efectivo", () => {
        expect(pagar(new Efectivo(10, [SABADO], DESCUENTO_DIA))).toBe(900);
    });
});

describe("Débito", () => {
    it("en sábado aplica el descuento del día", () => {
        expect(pagar(new Debito([SABADO], DESCUENTO_DIA), SABADO)).toBe(850);
    });

    it("en martes no tiene descuento", () => {
        expect(pagar(new Debito([SABADO], DESCUENTO_DIA), MARTES)).toBe(1000);
    });
});

describe("Billetera virtual", () => {
    it("en sábado aplica el descuento del día", () => {
        expect(pagar(new BilleteraVirtual([SABADO], DESCUENTO_DIA), SABADO)).toBe(850);
    });

    it("en martes no tiene descuento", () => {
        expect(pagar(new BilleteraVirtual([SABADO], DESCUENTO_DIA), MARTES)).toBe(1000);
    });
});

describe("Crédito", () => {
    it("1 cuota en sábado aplica el descuento del día", () => {
        expect(pagar(new Credito([SABADO], 1, DESCUENTO_DIA), SABADO)).toBe(850);
    });

    it("3 cuotas en sábado no tiene descuento", () => {
        expect(pagar(new Credito([SABADO], 3, DESCUENTO_DIA), SABADO)).toBe(1000);
    });

    it("1 cuota en martes no tiene descuento", () => {
        expect(pagar(new Credito([SABADO], 1, DESCUENTO_DIA), MARTES)).toBe(1000);
    });
});