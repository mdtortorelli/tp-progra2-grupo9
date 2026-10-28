import { describe, test, expect, beforeEach, afterEach} from '@jest/globals';
import { Combo } from "../src/Combo"
import { Producto } from "../src/Producto";
import { TipoDescuento } from "../src/TipoDescuento";
import { productoMock, DescuentoFijoMock, productoMock1 } from "./mocks";
//tipoDescuentoFijoMock


class ComboTest extends Combo {}


const crearProductosCombo = (): Producto[] => [productoMock];//({ nombre: "Cliente Test" } as unknown as Producto[]);
const crearTipoDescuento = (): TipoDescuento => DescuentoFijoMock; //({ descuento: 25 } as unknown as TipoDescuento);

describe("Combo", () => {

    let productosCombo: Producto[];
    let precioCombo: number;
    let tipoDescuento: TipoDescuento;
    let combo: ComboTest;

    beforeEach( () => {
        productosCombo = crearProductosCombo();
        precioCombo = 10000;
        tipoDescuento = crearTipoDescuento();
        combo = new ComboTest(productosCombo, tipoDescuento);
  });

    afterEach(() => {
    }); 

   
    test("Debe ser una instancia de la clase Combo", () => {
        expect(combo).toBeInstanceOf(Combo);
    });

    test("El array de Productos del combo tiene que ser el mismo que el mock", () => {
        
        const productosCombo = combo.getProductosCombo();

        expect(productosCombo).toEqual([productoMock]);
    });

    test("El tipo de descuento tiene que ser el tipo descuento del mock", () => {
        
        const tipoDescuento = combo.getTipoDescuento();

        expect(tipoDescuento).toBe(DescuentoFijoMock);
    });

     test("Se agrega un Producto al array de Productos del combo tiene que ser el mismo que el mock", () => {
        
         
        combo.agregarProductoCombo(productoMock1);

        expect(combo.getProductosCombo()).toEqual([productoMock,productoMock1]);
    });
    
    test("obtener el precio del combo", () => {
        
        const precio = combo.obtenerPrecio();
        expect(precio).toEqual(11900);
    });  

    test("obtener el precio sin descuento del combo", () => {
        
        const precio = combo.obtenerPrecioSinDescuento();
        expect(precio).toEqual(12000);
    });  
});