import { Efectivo } from '../src/Efectivo';
import { DiaSemana } from '../src/DiaSemana';
import { Pedido } from '../src/Pedido';

function crearPedidoMock(): Pedido {
  return {
    setTotal: jest.fn(),
    getTotal: jest.fn(),
  } as unknown as Pedido;
}

describe('Efectivo', () => {
  it('aplica el descuento de efectivo si es mejor que el semanal', () => {
    const pedidoMock = crearPedidoMock();
    const efectivo = new Efectivo(20, [DiaSemana.LUNES], 10); // efectivo 20% > semanal 10%

    efectivo.realizarPago(pedidoMock, 1000, DiaSemana.LUNES);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(800); // 1000 - 20%
  });

  it('aplica el descuento semanal si es mejor que el de efectivo', () => {
    const pedidoMock = crearPedidoMock();
    const efectivo = new Efectivo(5, [DiaSemana.LUNES], 30);

    efectivo.realizarPago(pedidoMock, 1000, DiaSemana.LUNES);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(700);
  });

  it('aplica solo el descuento de efectivo si no coincide el día semanal', () => {
    const pedidoMock = crearPedidoMock();
    const efectivo = new Efectivo(15, [DiaSemana.LUNES], 30); // Si no hay un dia con descuento, solo se tomara el descuento de efectivo

    efectivo.realizarPago(pedidoMock, 1000, DiaSemana.MARTES);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(850); 
  });

  it('sin descuento si ninguno aplica', () => {
    const pedidoMock = crearPedidoMock();
    const efectivo = new Efectivo(0, [DiaSemana.LUNES], 10);

    efectivo.realizarPago(pedidoMock, 1000, DiaSemana.MARTES);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(1000);
  });

  it('empate entre efectivo y semanal aplica ese mismo porcentaje', () => {
    const pedidoMock = crearPedidoMock();
    const efectivo = new Efectivo(10, [DiaSemana.LUNES], 10);

    efectivo.realizarPago(pedidoMock, 1000, DiaSemana.LUNES);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(900);
  });
});