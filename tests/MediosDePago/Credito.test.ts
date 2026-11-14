// Credito.test.ts
import { Credito } from '../../src/MediosDePago/Credito';
import { DiaSemana } from '../../src/Utils/DiaSemana';
import { Pedido } from '../../src/Pedidos/Pedido';

function crearPedidoMock(): Pedido {
  return {
    setDescuentoAplicado: jest.fn(),
    setTotal: jest.fn(),
    getTotal: jest.fn()
    
  } as unknown as Pedido;
}

describe('Credito', () => {
  let credito: Credito;
    
        beforeEach(() => {
          credito = new Credito(20,1);
        });
  

  it('aplica descuento semanal solo si paga en 1 cuota y el día coincide', () => {
    const pedidoMock = crearPedidoMock();
   credito.realizarPago(pedidoMock, 1000, 0);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(800);
  });

  it('no aplica descuento en 1 cuota si el día no coincide', () => {
    const pedidoMock = crearPedidoMock();
    
    credito.realizarPago(pedidoMock, 1000, 0);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(800);
  });

  it('nunca aplica descuento si paga en más de 1 cuota, sin importar el día', () => {
    const pedidoMock = crearPedidoMock();
    
    credito.realizarPago(pedidoMock, 1000, 0);

    expect(pedidoMock.setTotal).toHaveBeenCalledWith(800);
  });

  it('funciona igual con cualquier día de la semana definido en el enum', () => {
    const dias = [
      DiaSemana.LUNES, DiaSemana.MARTES, DiaSemana.MIERCOLES,
      DiaSemana.JUEVES, DiaSemana.VIERNES, DiaSemana.SABADO, DiaSemana.DOMINGO
    ];

    dias.forEach((dia) => {
      const pedidoMock = crearPedidoMock();
      credito.setDescuentoPropio(10);

      credito.realizarPago(pedidoMock, 1000, 0);

      expect(pedidoMock.setTotal).toHaveBeenCalledWith(900);
    });
  });

  it('get cuotas de crédito', () => {
    credito.setCuotas(3);

    expect(credito.getCuotas()).toBe(3);
  });

    it('set cuotas de credito', () => {
    
    credito.setCuotas(6);
    expect(credito.getCuotas()).toBe(6);
  });

  it('get descuento propio de credito', () => {
    
    credito.getDescuentoPropio();
    expect(credito.getDescuentoPropio()).toBe(20);
  });
});

