import { describe, expect, beforeEach, it, afterEach, test } from '@jest/globals';
import {DescuentoFijo} from '../src/DescuentoFijo'
import { comboFijoMock, productoMock } from './mocks';

describe(DescuentoFijo, () => {
  
  beforeEach(() => {
      
  })
  
  afterEach(() => {
  });

  let instance: DescuentoFijo
  instance = new DescuentoFijo(500);

  test("Debe ser una instancia de la clase DescuentoFijo", () => {
          expect(instance).toBeInstanceOf(DescuentoFijo);
      });

    test("Aplicar descuento a un combo", () => {
              let desc = instance.aplicarDescuento(comboFijoMock);
    
              expect(desc).toEqual(11500);
        
      });   
      
    test("Aplicar descuento a un combo mayor al valor", () => {
          expect(() => {comboFijoMock.quitarProductoCombo(productoMock)}).toThrow(`El monto a descontar no puede superar el precio`);
        
      });     
});
