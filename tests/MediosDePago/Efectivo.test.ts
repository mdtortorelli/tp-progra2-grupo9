import { Efectivo } from '../../src/MediosDePago/Efectivo';
import { DiaSemana } from '../../src/Utils/DiaSemana';
import { Pedido } from '../../src/Pedidos/Pedido';

function crearPedidoMock(): Pedido {
  return {
    setTotal: jest.fn(),
    getTotal: jest.fn(),
    setDescuentoAplicado: jest.fn(),
  } as unknown as Pedido;
}

describe('Efectivo', () => {
  it('aplica el descuento de efectivo si es mejor que el semanal', () => {
    const pedidoMock = crearPedidoMock();
    const efectivo = new Efectivo(20); // efectivo 20% > semanal 10%

    efectivo.realizarPago(pedidoMock, 1000, 0);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(800); // 1000 - 20%
  });

  it('aplica el descuento semanal si es mejor que el de efectivo', () => {
    const pedidoMock = crearPedidoMock();
    const efectivo = new Efectivo(5);

    efectivo.realizarPago(pedidoMock, 1000, 30);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(700);
  });

  it('aplica solo el descuento de efectivo si no coincide el día semanal', () => {
    const pedidoMock = crearPedidoMock();
    const efectivo = new Efectivo(15); // Si no hay un dia con descuento, solo se tomara el descuento de efectivo

    efectivo.realizarPago(pedidoMock, 1000, 0);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(850); 
  });

  it('sin descuento si ninguno aplica', () => {
    const pedidoMock = crearPedidoMock();
    const efectivo = new Efectivo(0);

    efectivo.realizarPago(pedidoMock, 1000, 0);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(1000);
  });

  it('empate entre efectivo y semanal aplica ese mismo porcentaje', () => {
    const pedidoMock = crearPedidoMock();
    const efectivo = new Efectivo(10);

    efectivo.realizarPago(pedidoMock, 1000,0);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(900);
  });
});