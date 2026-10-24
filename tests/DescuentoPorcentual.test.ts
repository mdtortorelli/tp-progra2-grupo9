import { describe, expect, beforeEach, it, afterEach, test } from '@jest/globals';
import { Combo } from '../src/Combo';
import { TipoDescuento } from '../src/TipoDescuento';
import {DescuentoPorcentual} from '../src/DescuentoPorcentual'
import { comboPorcentajeMock, productoMock} from './mocks';

describe(DescuentoPorcentual, () => {
  
  beforeEach(() => {
      
  })
  
  afterEach(() => {
  });

  let instance: DescuentoPorcentual
  instance = new DescuentoPorcentual(20);

  test("Debe ser una instancia de la clase DescuentoPorcentual", () => {
          expect(instance).toBeInstanceOf(DescuentoPorcentual);
      });

     
  test("Aplicar descuento a un combo", () => {
          let desc = instance.aplicarDescuento(comboPorcentajeMock);

          expect(desc).toEqual(9600);
    
  });  
   test("Aplicar descuento a un combo mayor al valor", () => {
          
        expect(() => {comboPorcentajeMock.quitarProductoCombo(productoMock)}).toThrow(`El precio no puede ser menor o igual a cero`);
          
        });  
});
