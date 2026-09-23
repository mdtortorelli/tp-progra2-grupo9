import { describe, test, expect, beforeEach, afterEach} from '@jest/globals';
import { Combo } from "../src/Combo"
import { arrayProductosMock, productoMock, tipoDescuentoFijoMock, TipoDescuentoMock } from "./mocks";

describe(Combo, () => {
    
    beforeEach( () => {
    })

    afterEach(() => {
    }); 

    let instance: Combo;
    instance = new Combo(arrayProductosMock,TipoDescuentoMock);

    test("Debe ser una instancia de la clase Combo", () => {
        expect(instance).toBeInstanceOf(Combo);
    });

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
});