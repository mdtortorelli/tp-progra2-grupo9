import { BilleteraVirtual } from '../../src/MediosDePago/BilleteraVirtual';
import { DiaSemana } from '../../src/Utils/DiaSemana';
import { Pedido } from '../../src/Pedidos/Pedido';

function crearPedidoMock(): Pedido {
  return {
    setTotal: jest.fn(),
    getTotal: jest.fn(),
  } as unknown as Pedido;
}

describe('BilleteraVirtual', () => {
  it('aplica descuento semanal si el día coincide', () => {
    const pedidoMock = crearPedidoMock();
    const billetera = new BilleteraVirtual([DiaSemana.VIERNES], 25);

    billetera.realizarPago(pedidoMock, 1000, DiaSemana.VIERNES);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(750); // 
  });

  it('no aplica descuento si el día no coincide', () => {
    const pedidoMock = crearPedidoMock();
    const billetera = new BilleteraVirtual([DiaSemana.VIERNES], 25);

    billetera.realizarPago(pedidoMock, 1000, DiaSemana.LUNES);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(1000);
  });

  it('no aplica descuento si no se pasa el día actual', () => {
    const pedidoMock = crearPedidoMock();
    const billetera = new BilleteraVirtual([DiaSemana.VIERNES], 25);

    billetera.realizarPago(pedidoMock, 1000);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(1000);
  });

});