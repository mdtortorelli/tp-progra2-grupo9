import { describe, test, expect, beforeEach, afterEach} from '@jest/globals';
import { Combo } from "../src/Combo"
import { arrayProductosMock, productoMock, DescuentoFijoMock, productoMock1 } from "./mocks";
//tipoDescuentoFijoMock
describe(Combo, () => {
    
    beforeEach( () => {
    })

    afterEach(() => {
    }); 

    let instance: Combo;
    instance = new Combo([productoMock],DescuentoFijoMock);

    test("Debe ser una instancia de la clase Combo", () => {
        expect(instance).toBeInstanceOf(Combo);
    });

    test("El array de Productos del combo tiene que ser el mismo que el mock", () => {
        
        const productosCombo = instance.getProductosCombo();

        expect(productosCombo).toEqual([productoMock]);
    });

    test("El tipo de descuento tiene que ser el tipo descuento del mock", () => {
        
        const tipoDescuento = instance.getTipoDescuento();

        expect(tipoDescuento).toBe(DescuentoFijoMock);
    });

     test("Se agrega un Producto al array de Productos del combo tiene que ser el mismo que el mock", () => {
        
         
        instance.agregarProductoCombo(productoMock1);

        expect(instance.getProductosCombo()).toEqual([productoMock,productoMock1]);
    });
    
    test("obtener el precio del combo", () => {
        
        const precio = instance.obtenerPrecio();
        expect(precio).toEqual(16900);
    });  

    test("obtener el precio sin descuento del combo", () => {
        
        const precio = instance.obtenerPrecioSinDescuento();
        expect(precio).toEqual(17000);
    });  
});