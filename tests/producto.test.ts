import { describe, test, expect, beforeEach, afterEach, it} from '@jest/globals';
import { CategoriaProd } from "../src/CategoriaProd";
import { EstadoProducto } from "../src/EstadoProducto";
import { Producto } from "../src/Producto"

describe("Producto", () => {

  let instance: Producto;

  beforeEach( () => {
    instance = new Producto("Milanesa", 7000, CategoriaProd.CARNE);
  })

  test("Debe ser una instancia de la clase Producto", () => {
    expect(instance).toBeInstanceOf(Producto);
  });

  test("Getter getNombre verifica que retorne Milanesa", () => {
    const nombreEsperado = "Milanesa";
    const nombreGetter = instance.getNombre();

    expect(nombreGetter).toBe(nombreEsperado);
  });

  test("Getter getPrecio verifica que retorne 7000", () => {
    const precioEsperado = 7000;
    const precioGetter = instance.getPrecio();

    expect(precioEsperado).toBe(precioGetter);
  });

  test("Getter getCategoria verifica que retorne una instancia de CategoriaProd", () => {
    const categoriaEsperada = CategoriaProd.CARNE;
    const categoriaGetter = instance.getCategoria();
    expect(categoriaEsperada).toBe(categoriaGetter);  
  })

  test("Getter getDescripcion verifica que retorne el valor default", () => {
    const descripcionDefault = "";
    const descripcionGetter = instance.getDescripcion();

    expect(descripcionDefault).toBe(descripcionGetter);
  });

  test("Getter getEstado verifica que retorne el valor por default", () => {
    const estadoEsperado = EstadoProducto.PENDIENTE;
    const estadoGetter = instance.getEstado();

    expect(estadoEsperado).toBe(estadoGetter);
  });

   test("El nombre tiene que actualizarse en la instancia", () => {
      const nombreEsperado = "Milanesa";
        
      instance.setNombre(nombreEsperado);

      expect(nombreEsperado).toEqual(instance.getNombre());
  });

  test("El precio tiene que actualizarse en la instancia", () => {
      const precioEsperado = 15000;
        
      instance.setPrecio(precioEsperado);

      expect(precioEsperado).toEqual(instance.getPrecio());
  });

  test("La categoría tiene que actualizarse en la instancia", () => {
      const categoriaEsperada = CategoriaProd.CARNE;
        
      instance.setCategoria(categoriaEsperada);

      expect(categoriaEsperada).toEqual(instance.getCategoria());
  });

  test("El estado tiene que actualizarse en la instancia", () => {
      const estadoEsperado = EstadoProducto.EN_PREPARAION;
        
      instance.setEstado(estadoEsperado);

      expect(estadoEsperado).toEqual(instance.getEstado());
  });

  test("La descripción tiene que actualizarse en la instancia", () => {
      const descEsperada = "Suprema";
        
      instance.setDescripcion(descEsperada);

      expect(descEsperada).toEqual(instance.getDescripcion());
  });
  
  test("Obtener el precio del producto", () => {
       const precioEsperado = 7000;
    const precio = instance.obtenerPrecio();

    expect(precioEsperado).toBe(precio);
  });

  test("Obtener los productos", () => {
       
    const productos = instance.obtenerProductos();

    expect(productos).toEqual([instance]);
  });
  
});
