/// <reference types="jest" />

import { Debito } from '../src/Debito';
import { DiaSemana } from '../src/DiaSemana';
import { Pedido } from '../src/Pedido';

function crearPedidoMock(): Pedido {
  return {
    setTotal: jest.fn(),
    getTotal: jest.fn(),
  } as unknown as Pedido;
}

describe('Debito', () => {
  it('aplica descuento cuando el día actual está en la lista de descuento', () => {
    const pedidoMock = crearPedidoMock();
    const debito = new Debito([DiaSemana.MARTES, DiaSemana.JUEVES], 15);

    debito.realizarPago(pedidoMock, 1000, DiaSemana.MARTES);
    debito.realizarPago(pedidoMock, 1000, DiaSemana.JUEVES);
    expect(pedidoMock.setTotal).toHaveBeenCalledWith(850);
  });

  it('no aplica descuento en un día que no está en la lista', () => {
    const pedidoMock = crearPedidoMock();
    const debito = new Debito([DiaSemana.MARTES, DiaSemana.JUEVES], 15);

    debito.realizarPago(pedidoMock, 1000, DiaSemana.LUNES);
    debito.realizarPago(pedidoMock, 1000, DiaSemana.MIERCOLES);
    expect(pedidoMock.setTotal).toHaveBeenCalledWith(1000);
  });

  it('no aplica descuento si no se pasa el día actual', () => {
    const pedidoMock = crearPedidoMock();
    const debito = new Debito([DiaSemana.MARTES], 15);

    debito.realizarPago(pedidoMock, 1000);
    expect(pedidoMock.setTotal).toHaveBeenCalledWith(1000);
  });
});