import { describe, expect, beforeEach, afterEach, test } from '@jest/globals';
import {DescuentoPorcentual} from '../../src/Beneficios/DescuentoPorcentual'
import { comboPorcentajeMock, productoMock} from '../Utils/mocks';

describe(DescuentoPorcentual, () => {
   let instance: DescuentoPorcentual;
  
  beforeEach(() => {
      instance = new DescuentoPorcentual(20);

  })
  
  afterEach(() => {
  });

 
  test("Debe ser una instancia de la clase DescuentoPorcentual", () => {
          expect(instance).toBeInstanceOf(DescuentoPorcentual);
      });

        test("No se puede crear un descuento menor a cero", () => {
                
        expect(() => {instance = new DescuentoPorcentual(-10);}).toThrow(`El porcentaje no puede ser negativo`);
                
        });  
     
  test("Aplicar descuento a un combo", () => {
          let desc = instance.aplicarDescuento(comboPorcentajeMock);

          expect(desc).toEqual(9600);
    
  });  
   test("Aplicar descuento a un combo mayor al valor", () => {
          
        expect(() => {comboPorcentajeMock.quitarProductoCombo(productoMock)}).toThrow(`El precio no puede ser menor o igual a cero`);
          
        });  

    it('get porcentaje descuento', () => {
    
    expect(instance.getPorcentaje()).toBe(20);
  });
  
  it('set porcentaje descuento', () => {
    instance.setPorcentaje(25);
    expect(instance.getPorcentaje()).toBe(25);
  });
});
