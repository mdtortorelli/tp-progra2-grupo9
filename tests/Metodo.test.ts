import MetodoPago from '../src/MetodoPago';
import { DiaSemana } from '../src/DiaSemana';

// instanciar y testear la clase base esta extension
class MetodoPagoFake extends MetodoPago {
  public realizarPago(): void {
  }
}

describe('MetodoPago', () => {
  it('getDiaDescuento devuelve los días configurados', () => {
    const metodo = new MetodoPagoFake([DiaSemana.LUNES, DiaSemana.VIERNES], 10);
    expect(metodo.getDiaDescuento()).toEqual([DiaSemana.LUNES, DiaSemana.VIERNES]);
  });

  it('setDiaDescuento actualiza los días de descuento', () => {
    const metodo = new MetodoPagoFake([DiaSemana.LUNES], 10);
    metodo.setDiaDescuento([DiaSemana.MARTES]);
    expect(metodo.getDiaDescuento()).toEqual([DiaSemana.MARTES]);
  });

  it('getPorcentajeDescuentoSemana devuelve el porcentaje configurado', () => {
    const metodo = new MetodoPagoFake([DiaSemana.LUNES], 15);
    expect(metodo.getPorcentajeDescuentoSemana()).toBe(15);
  });

  it('setPorcentajeDescuentoSemana actualiza el porcentaje', () => {
    const metodo = new MetodoPagoFake([DiaSemana.LUNES], 15);
    metodo.setPorcentajeDescuentoSemana(30);
    expect(metodo.getPorcentajeDescuentoSemana()).toBe(30);
  });

  it('obtenerDescuentoSemana devuelve el porcentaje si el día coincide', () => {
    const metodo = new MetodoPagoFake([DiaSemana.MIERCOLES], 20);
    expect(metodo.obtenerDescuentoSemana(DiaSemana.MIERCOLES)).toBe(20);
  });

  it('obtenerDescuentoSemana devuelve 0 si el día no coincide', () => {
    const metodo = new MetodoPagoFake([DiaSemana.MIERCOLES], 20);
    expect(metodo.obtenerDescuentoSemana(DiaSemana.JUEVES)).toBe(0);
  });

  it('obtenerDescuentoSemana devuelve 0 si no se pasa el día', () => {
    const metodo = new MetodoPagoFake([DiaSemana.MIERCOLES], 20);
    expect(metodo.obtenerDescuentoSemana()).toBe(0);
  });

});