import { CategoriaProd } from "../src/CategoriaProd";
import { EstadoProducto } from "../src/EstadoProducto";
import { Producto } from "../src/Producto"

describe("Producto", () => {

  let instance: Producto;

  beforeEach( () => {
    instance = new Producto("Milanesa", 7000, new CategoriaProd());
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
    const categoriaGetter = instance.getCategoria();

    expect(categoriaGetter).toBeInstanceOf(CategoriaProd);
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
})
