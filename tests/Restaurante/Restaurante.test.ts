import { describe, test, expect, beforeEach, afterEach, it} from '@jest/globals';
import { CategoriaMenu } from '../../src/Productos/CategoriaMenu';
import { CategoriaProd } from '../../src/Productos/CategoriaProd';
import { Cliente } from '../../src/Restaurante/Cliente';
import { Barra } from '../../src/Cocina/Barra';
import { CocinaDulce } from '../../src/Cocina/CocinaDulce';
import { Combo } from '../../src/Productos/Combo';
import { DiaSemana } from '../../src/Utils/DiaSemana';
import { Efectivo } from '../../src/MediosDePago/Efectivo';
import { Estacion } from '../../src/Cocina/Estacion';
import { EstadoPedido } from '../../src/Pedidos/EstadoPedido';
import { EstadoProducto } from '../../src/Productos/EstadoProducto';
import { Menu } from '../../src/Productos/Menu';
import { Parrilla } from '../../src/Cocina/Parrilla';
import { Pedido } from '../../src/Pedidos/Pedido';
import { Producto } from '../../src/Productos/Producto';
import { Restaurante } from '../../src/Restaurante/Restaurante';
import { Retiro } from '../../src/Pedidos/Retiro';
import { TipoDescuento } from '../../src/Beneficios/TipoDescuento';
import { ItemPedido } from '../../src/Productos/ItemPedido';

function crearCombo(productos: Producto[], precio: number): Combo {
  const descuento = { aplicarDescuento: () => precio } as unknown as TipoDescuento;
  return new Combo(productos, descuento);
}

function prepararTodo(estacion: Estacion): void {
  let itemCocina = estacion.comenzarSiguiente();
  while (itemCocina !== undefined) {
    estacion.marcarListo(itemCocina);
    itemCocina = estacion.comenzarSiguiente();
  }
}

function productosPendientes(estacion: Estacion): Producto[] {
  const productos: Producto[] = [];
  for (const itemCocina of estacion.obtenerPendientes()) {
    for (const producto of itemCocina.getItem().obtenerProductos()) {
      productos.push(producto);
    }
  }
  return productos;
}

describe('Restaurante', () => {
  const efectivo = new Efectivo(10);
  let restaurante: Restaurante;
  let parrilla: Parrilla;
  let cocinaDulce: CocinaDulce;
  let pedido: Pedido;
  let asado: Producto;
  let flan: Producto;
  let itemPedidioAsado: ItemPedido;
  let itemPedidioFlan: ItemPedido;


  beforeEach(() => {
    parrilla = new Parrilla();
    cocinaDulce = new CocinaDulce();
    parrilla.setSiguiente(cocinaDulce);
    restaurante = new Restaurante(new Menu(new CategoriaMenu([]), []), [], parrilla);
    restaurante.setPorcentajeDescuentoSemana(20);
    restaurante.setDiaDescuento([DiaSemana.LUNES]);
    pedido = new Retiro(new Cliente(), efectivo, new Date());
    asado = new Producto('Asado', 9000, CategoriaProd.CARNE);
    flan = new Producto('Flan', 3000, CategoriaProd.POSTRE);
    itemPedidioAsado = new ItemPedido(asado,1);
    itemPedidioFlan = new ItemPedido(flan,1);
  });

  describe('menu y estaciones', () => {
    it('getters y setter del menu', () => {
      const otroMenu = new Menu(new CategoriaMenu([]), []);
      restaurante.setMenu(otroMenu);

      expect(restaurante.getMenu()).toBe(otroMenu);
    });

    it('guarda la estacion por la que entran los productos a la cadena', () => {
      expect(restaurante.getEstacion()).toBe(parrilla);
    });

    it('por defecto arranca sin pedidos ni estaciones', () => {
      const nuevo = new Restaurante(new Menu(new CategoriaMenu([]), []));

      expect(nuevo.getPedidosTotales()).toEqual([]);
      expect(nuevo.getEstacion()).toBeUndefined();
    });

    it('se puede cambiar la estacion de entrada de la cadena', () => {
      const barra = new Barra();
      restaurante.setEstacion(barra);

      expect(restaurante.getEstacion()).toBe(barra);
    });
  });

  describe('registrarPedido', () => {
    it('registra un pedido en construcción', () => {
      restaurante.registrarPedido(pedido);

      expect(restaurante.getPedidosTotales()).toEqual([pedido]);
    });

    it('no registra un pedido repetido', () => {
      restaurante.registrarPedido(pedido);

      expect(() => restaurante.registrarPedido(pedido)).toThrow('ya esta registrado');
    });

    it('no registra un pedido vacío', () => {
      expect(() => restaurante.registrarPedido(undefined as unknown as Pedido)).toThrow('obligatorio');
    });

    it('no registra un pedido que ya fue confirmado', () => {
      pedido.agregarItem(itemPedidioAsado);
      pedido.confirmar();

      expect(() => restaurante.registrarPedido(pedido)).toThrow('en construccion');
    });
  });

  describe('confirmarPedido', () => {
    beforeEach(() => {
      restaurante.registrarPedido(pedido);
    });

    it('confirma el pedido y manda cada producto a su estación', () => {
      pedido.agregarItem(itemPedidioAsado);
      pedido.agregarItem(itemPedidioFlan);

      restaurante.confirmarPedido(pedido);

      expect(pedido.getEstado()).toBe(EstadoPedido.CONFIRMADO);
      expect(productosPendientes(parrilla)).toEqual([asado]);
      expect(productosPendientes(cocinaDulce)).toEqual([flan]);
    });

    it('un combo reparte sus productos entre las estaciones', () => {
      pedido.agregarItem(new ItemPedido(crearCombo([asado, flan], 10000),1));

      restaurante.confirmarPedido(pedido);

      expect(productosPendientes(parrilla)).toEqual([asado]);
      expect(productosPendientes(cocinaDulce)).toEqual([flan]);
    });

    it('cada estación recibe los productos en el orden en que llegan los pedidos', () => {
      const vacio = new Producto('Vacio', 8500, CategoriaProd.CARNE);
      const itemPedidoVacio = new ItemPedido(vacio,1);
      
      const otroPedido = new Retiro(new Cliente(), efectivo, new Date());
      restaurante.registrarPedido(otroPedido);
      pedido.agregarItem(itemPedidioAsado);
      otroPedido.agregarItem(itemPedidoVacio);

      restaurante.confirmarPedido(pedido);
      restaurante.confirmarPedido(otroPedido);

      expect(productosPendientes(parrilla)).toEqual([asado, vacio]);
    });

    it('lanza error si ninguna estacion puede preparar un producto', () => {
      pedido.agregarItem(new ItemPedido(new Producto('Gaseosa', 1500, CategoriaProd.BEBIDA),1));

      expect(() => restaurante.confirmarPedido(pedido)).toThrow('No hay estacion que pueda preparar el item');
    });

    it('no confirma si el restaurante no tiene estaciones', () => {
      const sinEstaciones = new Restaurante(new Menu(new CategoriaMenu([]), []));
      const otro = new Retiro(new Cliente(), efectivo, new Date());
      sinEstaciones.registrarPedido(otro);
      otro.agregarItem(itemPedidioAsado);

      expect(() => sinEstaciones.confirmarPedido(otro)).toThrow('No hay estaciones');
      expect(otro.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
    });

    it('no confirma un pedido sin ítems', () => {
      expect(() => restaurante.confirmarPedido(pedido)).toThrow('No se puede confirmar un pedido sin items.');
    });

    it('no confirma un pedido que no está registrado', () => {
      const otro = new Retiro(new Cliente(), efectivo, new Date());

      expect(() => restaurante.confirmarPedido(otro)).toThrow('no está registrado');
    });

    it('no confirma dos veces el mismo pedido', () => {
      pedido.agregarItem(itemPedidioAsado);
      restaurante.confirmarPedido(pedido);

      expect(() => restaurante.confirmarPedido(pedido)).toThrow('ya fue confirmado');
      expect(productosPendientes(parrilla)).toEqual([asado]);
    });
  });

  describe('facturarPedido', () => {
    beforeEach(() => {
      restaurante.registrarPedido(pedido);
      pedido.agregarItem(new ItemPedido(crearCombo([asado, flan], 10000),1));
      restaurante.confirmarPedido(pedido);
    });

    it('el combo se manda a cocina como un item por cada producto', () => {
      const itemsCocina = restaurante.obtenerItemsEnCocina(pedido);

      expect(itemsCocina.length).toBe(2);
      expect(itemsCocina[0].getItem()).toBe(asado);
      expect(itemsCocina[1].getItem()).toBe(flan);
    });

    it('no factura si hay items de cocina que no están listos', () => {
      prepararTodo(parrilla);
      const itemsCocina = restaurante.obtenerItemsEnCocina(pedido);

      expect(itemsCocina[0].getEstado()).toBe(EstadoProducto.LISTO);
      expect(itemsCocina[1].getEstado()).toBe(EstadoProducto.PENDIENTE);
      expect(() => restaurante.facturarPedido(pedido, efectivo)).toThrow('No se puede facturar: hay items que no estan listos');
    });

    it('preparar los items no cambia el estado de los productos del menu', () => {
      prepararTodo(parrilla);
      prepararTodo(cocinaDulce);

      expect(asado.getEstado()).toBe(EstadoProducto.PENDIENTE);
      expect(flan.getEstado()).toBe(EstadoProducto.PENDIENTE);
    });

    it('un pedido sin confirmar no tiene items en cocina', () => {
      const otro = new Retiro(new Cliente(), efectivo, new Date());

      expect(restaurante.obtenerItemsEnCocina(otro)).toEqual([]);
    });

    describe('con todos los productos listos', () => {
      beforeEach(() => {
        prepararTodo(parrilla);
        prepararTodo(cocinaDulce);
      });

      it('cobra el total aplicando el descuento del medio de pago', () => {
        const cobrado = restaurante.facturarPedido(pedido, efectivo);

        expect(cobrado).toBe(9000);
        expect(pedido.getTotal()).toBe(9000);
        expect(pedido.getMetodoDePago()).toBe(efectivo);
      });

      it('aplica solo el descuento más beneficioso', () => {
        const cobrado = restaurante.facturarPedido(pedido, efectivo, DiaSemana.LUNES);

        expect(cobrado).toBe(8000);
      });

      it('el pedido facturado aparece en los finalizados', () => {
        expect(restaurante.obtenerPedidosFinalizados()).toEqual([]);

        restaurante.facturarPedido(pedido, efectivo);

        expect(pedido.getEstado()).toBe(EstadoPedido.ENVIADO);
        expect(restaurante.obtenerPedidosFinalizados()).toEqual([pedido]);
      });

      it('no factura sin medio de pago', () => {
        expect(() => restaurante.facturarPedido(pedido, undefined as unknown as Efectivo)).toThrow('obligatorio');
      });

      it('no factura dos veces el mismo pedido', () => {
        restaurante.facturarPedido(pedido, efectivo);

        expect(() => restaurante.facturarPedido(pedido, efectivo)).toThrow('confirmados');
      });
    });

    it('no factura un pedido que no está registrado', () => {
      const otro = new Retiro(new Cliente(), efectivo, new Date());

      expect(() => restaurante.facturarPedido(otro, efectivo)).toThrow('no está registrado');
    });

    it('no factura un pedido en construcción', () => {
      const enConstruccion = new Retiro(new Cliente(), efectivo, new Date());
      restaurante.registrarPedido(enConstruccion);

      expect(() => restaurante.facturarPedido(enConstruccion, efectivo)).toThrow('confirmados');
    });
  });
  
  describe('DescuentoSemanal', () => {
  it('getDiaDescuento devuelve los días configurados', () => {
    restaurante.setDiaDescuento([DiaSemana.LUNES, DiaSemana.VIERNES]);
    expect(restaurante.getDiaDescuento()).toEqual([DiaSemana.LUNES, DiaSemana.VIERNES]);
  });

  it('setDiaDescuento actualiza los días de descuento', () => {
    
    restaurante.setDiaDescuento([DiaSemana.MARTES]);
    expect(restaurante.getDiaDescuento()).toEqual([DiaSemana.MARTES]);
  });

  it('getPorcentajeDescuentoSemana devuelve el porcentaje configurado', () => {
    restaurante.setPorcentajeDescuentoSemana(15);
    expect(restaurante.getPorcentajeDescuentoSemana()).toBe(15);
  });

  it('setPorcentajeDescuentoSemana actualiza el porcentaje', () => {
    restaurante.setPorcentajeDescuentoSemana(30);
    expect(restaurante.getPorcentajeDescuentoSemana()).toBe(30);
  });

  it('obtenerDescuentoSemana devuelve el porcentaje si el día coincide', () => {
    expect(restaurante.obtenerDescuentoSemana(DiaSemana.LUNES)).toBe(20);
  });

  it('obtenerDescuentoSemana devuelve 0 si el día no coincide', () => {
    expect(restaurante.obtenerDescuentoSemana(DiaSemana.JUEVES)).toBe(0);
  });

  it('obtenerDescuentoSemana devuelve 0 si no se pasa el día', () => {
    expect(restaurante.obtenerDescuentoSemana()).toBe(0);
  });

});
});
