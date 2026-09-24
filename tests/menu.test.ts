import { describe, test, expect, beforeEach, afterEach} from '@jest/globals';
import {Menu} from '../src/Menu';
import { Producto } from '../src/Producto';

describe(Menu, () => {
    
    beforeEach( () => {
    })

    afterEach(() => {
    }); 

    let instance: Menu;

   /* instance = new Menu();

    test("Debe ser una instancia de la clase Combo", () => {
        expect(instance).toBeInstanceOf(Menu);
    });
    */

    /*
    test("El array de Productos del combo tiene que ser el mismo que el mock", () => {
        
        const productosCombo = instance.getProductosCombo();

        expect(productosCombo).toBe(arrayProductosMock);
    });

    test("El tipo de descuento tiene que ser el tipo descuento del mock", () => {
        
        const tipoDescuento = instance.getTipoDescuento();

        expect(tipoDescuento).toBe(TipoDescuentoMock);
    });

     test("Se agrega un Producto al array de Productos del combo tiene que ser el mismo que el mock", () => {
        
        let productosCombo = instance.getProductosCombo();

        const agregado = productosCombo.push(productoMock);

        expect(agregado).toBe(instance.agregarProductoCombo(productoMock));
    });
    
    test("obtener el precio del combo", () => {
        
        const precio = instance.obtenerPrecio();

        expect(precio).toBe(undefined);
    });  

    test("obtener el precio sin descuento del combo", () => {
        
        const precio = instance.obtenerPrecioSinDescuento();

        expect(precio).toBe(0);
    });
    */  
});