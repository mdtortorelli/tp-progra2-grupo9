// Credito.test.ts
import { Credito } from '../src/Credito';
import { DiaSemana } from '../src/DiaSemana';
import { Pedido } from '../src/Pedido';

function crearPedidoMock(): Pedido {
  return {
    setTotal: jest.fn(),
    getTotal: jest.fn(),
  } as unknown as Pedido;
}

describe('Credito', () => {
  it('aplica descuento semanal solo si paga en 1 cuota y el día coincide', () => {
    const pedidoMock = crearPedidoMock();
    const credito = new Credito([DiaSemana.SABADO], 1, 20);

    credito.realizarPago(pedidoMock, 1000, DiaSemana.SABADO);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(800);
  });

  it('no aplica descuento en 1 cuota si el día no coincide', () => {
    const pedidoMock = crearPedidoMock();
    const credito = new Credito([DiaSemana.SABADO], 1, 20);

    credito.realizarPago(pedidoMock, 1000, DiaSemana.MIERCOLES);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(1000);
  });

  it('nunca aplica descuento si paga en más de 1 cuota, sin importar el día', () => {
    const pedidoMock = crearPedidoMock();
    const credito = new Credito([DiaSemana.SABADO], 12, 20);

    credito.realizarPago(pedidoMock, 1000, DiaSemana.SABADO);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(1000);
  });

  it('funciona igual con cualquier día de la semana definido en el enum', () => {
    const dias = [
      DiaSemana.LUNES, DiaSemana.MARTES, DiaSemana.MIERCOLES,
      DiaSemana.JUEVES, DiaSemana.VIERNES, DiaSemana.SABADO, DiaSemana.DOMINGO
    ];

    dias.forEach((dia) => {
      const pedidoMock = crearPedidoMock();
      const credito = new Credito([dia], 1, 10);

      credito.realizarPago(pedidoMock, 1000, dia);

      expect(pedidoMock.setTotal).toHaveBeenCalledWith(900);
    });
  });
});