import { CategoriaMenu } from '../src/CategoriaMenu';
import { CategoriaProd } from '../src/CategoriaProd';
import { Cliente } from '../src/Cliente';
import { CocinaDulce } from '../src/CocinaDulce';
import { Combo } from '../src/Combo';
import { DiaSemana } from '../src/DiaSemana';
import { Efectivo } from '../src/Efectivo';
import { Estacion } from '../src/Estacion';
import { EstadoPedido } from '../src/EstadoPedido';
import { EstadoProducto } from '../src/EstadoProducto';
import { Menu } from '../src/Menu';
import { Parrilla } from '../src/Parrilla';
import { Pedido } from '../src/Pedido';
import { Producto } from '../src/Producto';
import { Restaurante } from '../src/Restaurante';
import { Retiro } from '../src/Retiro';
import { TipoDescuento } from '../src/TipoDescuento';

function crearCombo(productos: Producto[], precio: number): Combo {
  const descuento = { aplicarDescuento: () => precio } as unknown as TipoDescuento;
  return new Combo(productos, descuento);
}

function prepararTodo(estacion: Estacion): void {
  let producto = estacion.comenzarSiguiente();
  while (producto !== undefined) {
    estacion.marcarListo(producto);
    producto = estacion.comenzarSiguiente();
  }
}

describe('Restaurante', () => {
  const efectivo = new Efectivo(10, [DiaSemana.MARTES], 20);
  let restaurante: Restaurante;
  let parrilla: Parrilla;
  let cocinaDulce: CocinaDulce;
  let pedido: Pedido;
  let asado: Producto;
  let flan: Producto;

  beforeEach(() => {
    parrilla = new Parrilla();
    cocinaDulce = new CocinaDulce();
    restaurante = new Restaurante(new Menu(new CategoriaMenu([]), []), [], [parrilla, cocinaDulce]);
    pedido = new Retiro(new Cliente(), efectivo, new Date());
    asado = new Producto('Asado', 9000, CategoriaProd.CARNE);
    flan = new Producto('Flan', 3000, CategoriaProd.POSTRE);
  });

  describe('menu y estaciones', () => {
    it('getters y setter del menu', () => {
      const otroMenu = new Menu(new CategoriaMenu([]), []);
      restaurante.setMenu(otroMenu);

      expect(restaurante.getMenu()).toBe(otroMenu);
      expect(restaurante.getEstaciones()).toEqual([parrilla, cocinaDulce]);
    });

    it('por defecto arranca sin pedidos ni estaciones', () => {
      const nuevo = new Restaurante(new Menu(new CategoriaMenu([]), []));

      expect(nuevo.getPedidosTotales()).toEqual([]);
      expect(nuevo.getEstaciones()).toEqual([]);
    });

    it('agrega una estación nueva', () => {
      const otra = new Parrilla();
      restaurante.agregarEstacion(otra);

      expect(restaurante.getEstaciones()).toContain(otra);
    });

    it('no agrega una estacion repetida ni vacia', () => {
      expect(() => restaurante.agregarEstacion(parrilla)).toThrow('ya esta registrada');
      expect(() => restaurante.agregarEstacion(undefined as unknown as Parrilla)).toThrow('obligatoria');
    });

    it('busca la estacion que prepara cada producto', () => {
      expect(restaurante.buscarEstacionPara(asado)).toBe(parrilla);
      expect(restaurante.buscarEstacionPara(flan)).toBe(cocinaDulce);
    });

    it('falla si ninguna estación prepara el producto', () => {
      const gaseosa = new Producto('Gaseosa', 1500, CategoriaProd.BEBIDA);

      expect(() => restaurante.buscarEstacionPara(gaseosa)).toThrow('No hay estacion');
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
      pedido.agregarItem(asado);
      pedido.confirmar();

      expect(() => restaurante.registrarPedido(pedido)).toThrow('en construccion');
    });
  });

  describe('confirmarPedido', () => {
    beforeEach(() => {
      restaurante.registrarPedido(pedido);
    });

    it('confirma el pedido y manda cada producto a su estación', () => {
      pedido.agregarItem(asado);
      pedido.agregarItem(flan);

      restaurante.confirmarPedido(pedido);

      expect(pedido.getEstado()).toBe(EstadoPedido.CONFIRMADO);
      expect(parrilla.obtenerPendientes()).toEqual([asado]);
      expect(cocinaDulce.obtenerPendientes()).toEqual([flan]);
    });

    it('un combo reparte sus productos entre las estaciones', () => {
      pedido.agregarItem(crearCombo([asado, flan], 10000));

      restaurante.confirmarPedido(pedido);

      expect(parrilla.obtenerPendientes()).toEqual([asado]);
      expect(cocinaDulce.obtenerPendientes()).toEqual([flan]);
    });

    it('cada estación recibe los productos en el orden en que llegan los pedidos', () => {
      const vacio = new Producto('Vacio', 8500, CategoriaProd.CARNE);
      const otroPedido = new Retiro(new Cliente(), efectivo, new Date());
      restaurante.registrarPedido(otroPedido);
      pedido.agregarItem(asado);
      otroPedido.agregarItem(vacio);

      restaurante.confirmarPedido(pedido);
      restaurante.confirmarPedido(otroPedido);

      expect(parrilla.obtenerPendientes()).toEqual([asado, vacio]);
    });

    it('no confirma nada si algún producto no tiene estación', () => {
      pedido.agregarItem(asado);
      pedido.agregarItem(new Producto('Gaseosa', 1500, CategoriaProd.BEBIDA));

      expect(() => restaurante.confirmarPedido(pedido)).toThrow('No hay estacion');
      expect(pedido.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
      expect(parrilla.obtenerPendientes()).toEqual([]);
    });

    it('no confirma un pedido sin ítems', () => {
      expect(() => restaurante.confirmarPedido(pedido)).toThrow('sin ítems');
    });

    it('no confirma un pedido que no está registrado', () => {
      const otro = new Retiro(new Cliente(), efectivo, new Date());

      expect(() => restaurante.confirmarPedido(otro)).toThrow('no está registrado');
    });

    it('no confirma dos veces el mismo pedido', () => {
      pedido.agregarItem(asado);
      restaurante.confirmarPedido(pedido);

      expect(() => restaurante.confirmarPedido(pedido)).toThrow('ya fue confirmado');
      expect(parrilla.obtenerPendientes()).toEqual([asado]);
    });
  });

  describe('facturarPedido', () => {
    beforeEach(() => {
      restaurante.registrarPedido(pedido);
      pedido.agregarItem(crearCombo([asado, flan], 10000));
      restaurante.confirmarPedido(pedido);
    });

    it('no factura si hay productos que no están listos', () => {
      prepararTodo(parrilla);

      expect(asado.getEstado()).toBe(EstadoProducto.LISTO);
      expect(flan.getEstado()).toBe(EstadoProducto.PENDIENTE);
      expect(() => restaurante.facturarPedido(pedido, efectivo)).toThrow('no están listos');
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
        const cobrado = restaurante.facturarPedido(pedido, efectivo, DiaSemana.MARTES);

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
});
