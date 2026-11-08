import { Barra } from '../../src/Cocina/Barra';
import { CategoriaProd } from '../../src/Productos/CategoriaProd';
import { CocinaDulce } from '../../src/Cocina/CocinaDulce';
import { CocinaFria } from '../../src/Cocina/CocinaFria';
import { EstadoProducto } from '../../src/Productos/EstadoProducto';
import { ItemPedido } from '../../src/Productos/ItemPedido';
import { Parrilla } from '../../src/Cocina/Parrilla';
import { Producto } from '../../src/Productos/Producto';

describe('Estacion', () => {
  let parrilla: Parrilla;
  let asado: Producto;
  let itemAsado: ItemPedido;
  let itemVacio: ItemPedido;
  let itemFlan: ItemPedido;

  beforeEach(() => {
    parrilla = new Parrilla();
    asado = new Producto('Asado', 9000, CategoriaProd.CARNE);
    itemAsado = new ItemPedido(asado, 1);
    itemVacio = new ItemPedido(new Producto('Vacio', 8500, CategoriaProd.CARNE), 1);
    itemFlan = new ItemPedido(new Producto('Flan', 3000, CategoriaProd.POSTRE), 1);
  });

  it('cada subclase tiene su nombre y su categoria', () => {
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
    expect(parrilla.puedePreparar(itemFlan)).toBe(true);
  });

  it('puede preparar solo items de su categoria', () => {
    expect(parrilla.puedePreparar(itemAsado)).toBe(true);
    expect(parrilla.puedePreparar(itemFlan)).toBe(false);
  });

  it('si es la ultima de la cadena y no puede preparar el item, lanza error', () => {
    expect(parrilla.getSiguiente()).toBeUndefined();
    expect(() => parrilla.recibir(itemFlan)).toThrow('No hay estacion que pueda preparar el item');
    expect(parrilla.obtenerPendientes()).toEqual([]);
  });

  it('si no puede preparar el item, se lo pasa a la siguiente estacion', () => {
    const cocinaDulce = new CocinaDulce();
    parrilla.setSiguiente(cocinaDulce);

    parrilla.recibir(itemFlan);

    expect(parrilla.getSiguiente()).toBe(cocinaDulce);
    expect(parrilla.obtenerPendientes()).toEqual([]);
    expect(cocinaDulce.obtenerPendientes()).toEqual([itemFlan]);
  });

  it('el item recorre toda la cadena hasta la estacion que puede prepararlo', () => {
    const barra = new Barra();
    const cocinaFria = new CocinaFria();
    const cocinaDulce = new CocinaDulce();
    parrilla.setSiguiente(barra);
    barra.setSiguiente(cocinaFria);
    cocinaFria.setSiguiente(cocinaDulce);

    parrilla.recibir(itemFlan);

    expect(barra.obtenerPendientes()).toEqual([]);
    expect(cocinaFria.obtenerPendientes()).toEqual([]);
    expect(cocinaDulce.obtenerPendientes()).toEqual([itemFlan]);
  });

  it('si ninguna estacion de la cadena puede prepararlo, la ultima lanza error', () => {
    parrilla.setSiguiente(new Barra());
    const itemEnsalada = new ItemPedido(new Producto('Ensalada', 4000, CategoriaProd.ENSALADA), 1);

    expect(() => parrilla.recibir(itemEnsalada)).toThrow('No hay estacion que pueda preparar el item');
  });

  it('los items recibidos quedan pendientes en orden de llegada', () => {
    parrilla.recibir(itemAsado);
    parrilla.recibir(itemVacio);

    expect(parrilla.obtenerPendientes()).toEqual([itemAsado, itemVacio]);
    expect(itemAsado.getEstado()).toBe(EstadoProducto.PENDIENTE);
  });

  it('comenzarSiguiente toma el primero que llego y lo pasa a en preparacion', () => {
    parrilla.recibir(itemAsado);
    parrilla.recibir(itemVacio);

    const comenzado = parrilla.comenzarSiguiente();

    expect(comenzado).toBe(itemAsado);
    expect(itemAsado.getEstado()).toBe(EstadoProducto.EN_PREPARACION);
    expect(parrilla.obtenerPendientes()).toEqual([itemVacio]);
    expect(parrilla.obtenerEnPreparacion()).toEqual([itemAsado]);
  });

  it('comenzarSiguiente sin pendientes devuelve undefined', () => {
    expect(parrilla.comenzarSiguiente()).toBeUndefined();
  });

  it('marcarListo pasa a listo un item en preparacion', () => {
    parrilla.recibir(itemAsado);
    parrilla.comenzarSiguiente();

    parrilla.marcarListo(itemAsado);

    expect(itemAsado.getEstado()).toBe(EstadoProducto.LISTO);
    expect(parrilla.obtenerEnPreparacion()).toEqual([]);
  });

  it('marcar un item como listo no saca a los demas que siguen en preparacion', () => {
    parrilla.recibir(itemAsado);
    parrilla.recibir(itemVacio);
    parrilla.comenzarSiguiente();
    parrilla.comenzarSiguiente();

    parrilla.marcarListo(itemAsado);

    expect(parrilla.obtenerEnPreparacion()).toEqual([itemVacio]);
    expect(itemVacio.getEstado()).toBe(EstadoProducto.EN_PREPARACION);
  });

  it('el estado cambia en el item del pedido, no en el producto del menu', () => {
    parrilla.recibir(itemAsado);
    parrilla.comenzarSiguiente();
    parrilla.marcarListo(itemAsado);

    expect(itemAsado.getEstado()).toBe(EstadoProducto.LISTO);
    expect(asado.getEstado()).toBe(EstadoProducto.PENDIENTE);
  });

  it('dos items del mismo producto tienen estados independientes', () => {
    const otroItemAsado = new ItemPedido(asado, 1);
    parrilla.recibir(itemAsado);
    parrilla.recibir(otroItemAsado);

    parrilla.comenzarSiguiente();

    expect(itemAsado.getEstado()).toBe(EstadoProducto.EN_PREPARACION);
    expect(otroItemAsado.getEstado()).toBe(EstadoProducto.PENDIENTE);
  });

  it('marcarListo falla si el item todavia esta pendiente', () => {
    parrilla.recibir(itemAsado);

    expect(() => parrilla.marcarListo(itemAsado)).toThrow('no se encuentra en preparacion');
    expect(itemAsado.getEstado()).toBe(EstadoProducto.PENDIENTE);
  });

  it('marcarListo falla si el item se esta preparando en otra estacion', () => {
    const otraParrilla = new Parrilla();
    otraParrilla.recibir(itemAsado);
    otraParrilla.comenzarSiguiente();

    expect(() => parrilla.marcarListo(itemAsado)).toThrow('no se encuentra en preparacion');
  });

  it('cada estacion procesa lo suyo de forma independiente', () => {
    const cocinaDulce = new CocinaDulce();
    parrilla.recibir(itemAsado);
    cocinaDulce.recibir(itemFlan);

    cocinaDulce.comenzarSiguiente();

    expect(itemFlan.getEstado()).toBe(EstadoProducto.EN_PREPARACION);
    expect(itemAsado.getEstado()).toBe(EstadoProducto.PENDIENTE);
  });
});
