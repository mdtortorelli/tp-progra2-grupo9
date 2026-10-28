import { Barra } from '../src/Barra';
import { CategoriaProd } from '../src/CategoriaProd';
import { CocinaDulce } from '../src/CocinaDulce';
import { CocinaFria } from '../src/CocinaFria';
import { EstadoProducto } from '../src/EstadoProducto';
import { Parrilla } from '../src/Parrilla';
import { Producto } from '../src/Producto';

describe('Estacion', () => {
  let parrilla: Parrilla;
  let asado: Producto;
  let vacio: Producto;
  let flan: Producto;

  beforeEach(() => {
    parrilla = new Parrilla();
    asado = new Producto('Asado', 9000, CategoriaProd.CARNE);
    vacio = new Producto('Vacio', 8500, CategoriaProd.CARNE);
    flan = new Producto('Flan', 3000, CategoriaProd.POSTRE);
  });

  it('cada subclase tiene su nombre y su categoría', () => {
    expect(parrilla.getNombre()).toBe('Parrilla');
    expect(parrilla.getCategoria()).toBe(CategoriaProd.CARNE);
    expect(new Barra().getCategoria()).toBe(CategoriaProd.BEBIDA);
    expect(new CocinaDulce().getCategoria()).toBe(CategoriaProd.POSTRE);
    expect(new CocinaFria().getCategoria()).toBe(CategoriaProd.ENSALADA);
  });

  it('se pueden cambiar nombre y categoria', () => {
    parrilla.setNombre('Parrilla 2');
    parrilla.setCategoria(CategoriaProd.POSTRE);

    expect(parrilla.getNombre()).toBe('Parrilla 2');
    expect(parrilla.puedePreparar(flan)).toBe(true);
  });

  it('puede preparar solo productos de su categoria', () => {
    expect(parrilla.puedePreparar(asado)).toBe(true);
    expect(parrilla.puedePreparar(flan)).toBe(false);
  });

  it('recibir rechaza un producto de otra categoria', () => {
    expect(() => parrilla.recibir(flan)).toThrow('no puede preparar Flan');
    expect(parrilla.obtenerPendientes()).toEqual([]);
  });

  it('los productos recibidos quedan pendientes en orden de llegada', () => {
    parrilla.recibir(asado);
    parrilla.recibir(vacio);

    expect(parrilla.obtenerPendientes()).toEqual([asado, vacio]);
    expect(asado.getEstado()).toBe(EstadoProducto.PENDIENTE);
  });

  it('comenzarSiguiente toma el primero que llegó y lo pasa a en preparacion', () => {
    parrilla.recibir(asado);
    parrilla.recibir(vacio);

    const comenzado = parrilla.comenzarSiguiente();

    expect(comenzado).toBe(asado);
    expect(asado.getEstado()).toBe(EstadoProducto.EN_PREPARACION);
    expect(parrilla.obtenerPendientes()).toEqual([vacio]);
    expect(parrilla.obtenerEnPreparacion()).toEqual([asado]);
  });

  it('comenzarSiguiente sin pendientes devuelve undefined', () => {
    expect(parrilla.comenzarSiguiente()).toBeUndefined();
  });

  it('marcarListo pasa a listo un producto en preparacion', () => {
    parrilla.recibir(asado);
    parrilla.comenzarSiguiente();

    parrilla.marcarListo(asado);

    expect(asado.getEstado()).toBe(EstadoProducto.LISTO);
    expect(parrilla.obtenerEnPreparacion()).toEqual([]);
  });

  it('marcarListo falla si el producto todavia esta pendiente', () => {
    parrilla.recibir(asado);

    expect(() => parrilla.marcarListo(asado)).toThrow('no se encuentra en preparacion');
    expect(asado.getEstado()).toBe(EstadoProducto.PENDIENTE);
  });

  it('marcarListo falla si el producto se esta preparando en otra estacion', () => {
    const otraParrilla = new Parrilla();
    otraParrilla.recibir(asado);
    otraParrilla.comenzarSiguiente();

    expect(() => parrilla.marcarListo(asado)).toThrow('no se encuentra en preparacion');
  });

  it('cada estacion procesa lo suyo de forma independiente', () => {
    const cocinaDulce = new CocinaDulce();
    parrilla.recibir(asado);
    cocinaDulce.recibir(flan);

    cocinaDulce.comenzarSiguiente();

    expect(flan.getEstado()).toBe(EstadoProducto.EN_PREPARACION);
    expect(asado.getEstado()).toBe(EstadoProducto.PENDIENTE);
  });
});
