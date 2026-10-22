import { DiaSemana } from "./DiaSemana";
import { Estacion } from "./Estacion";
import { EstadoPedido } from "./EstadoPedido";
import { EstadoProducto } from "./EstadoProducto";
import { Menu } from "./Menu";
import MetodoPago from "./MetodoPago";
import { Pedido } from "./Pedido";
import { Producto } from "./Producto";

export class Restaurante {
    private menu: Menu
    private pedidosTotales: Pedido[]
    private estaciones: Estacion[]

    /**
     * @param {Menu} menu - Menú del restaurante.
     * @param {Pedido[]} [pedidosTotales=[]] - Pedidos ya registrados.
     * @param {Estacion[]} [estaciones=[]] - Estaciones de cocina disponibles.
     */
    public constructor(menu: Menu, pedidosTotales: Pedido[] = [], estaciones: Estacion[] = []) {
        this.menu = menu
        this.pedidosTotales = pedidosTotales
        this.estaciones = estaciones
    }

    /** @returns {Menu} El menú del restaurante. */
    public getMenu(): Menu {
        return this.menu
    }

    /** @param {Menu} menu - Nuevo menú del restaurante. */
    public setMenu(menu: Menu): void {
        this.menu = menu
    }

    /** @returns {Pedido[]} Todos los pedidos registrados. */
    public getPedidosTotales(): Pedido[] {
        return this.pedidosTotales
    }

    /** @returns {Estacion[]} Las estaciones de cocina. */
    public getEstaciones(): Estacion[] {
        return this.estaciones
    }

    /**
     * Registra un pedido nuevo (de cualquier modalidad).
     * @param {Pedido} pedido - Pedido en construcción a registrar.
     * @throws {Error} Si el pedido falta, ya está registrado o no está en construcción.
     */
    public registrarPedido(pedido: Pedido): void {
        if (!pedido) {
            throw new Error("El pedido es obligatorio");
        }
        if (this.estaRegistrado(pedido)) {
            throw new Error("El pedido ya esta registrado");
        }
        if (pedido.getEstado() !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("Solo se pueden registrar pedidos que esten en construccion");
        }
        this.pedidosTotales.push(pedido);
    }

    /**
     * Indica si un pedido ya fue registrado en el restaurante.
     * @param {Pedido} pedido - Pedido a buscar.
     * @returns {boolean} `true` si el pedido está registrado.
     */
    private estaRegistrado(pedido: Pedido): boolean {
        for (const registrado of this.pedidosTotales) {
            if (registrado === pedido) {
                return true;
            }
        }
        return false;
    }

    /**
     * Agrega una estación de cocina.
     * @param {Estacion} estacion - Estación a agregar.
     * @throws {Error} Si la estación falta o ya fue agregada.
     */
    public agregarEstacion(estacion: Estacion): void {
        if (!estacion) {
            throw new Error("La estacion es obligatoria");
        }
        if (this.tieneEstacion(estacion)) {
            throw new Error("La estacion ya esta registrada y no se puede agregar");
        }
        this.estaciones.push(estacion);
    }

    /**
     * Indica si una estación ya fue agregada al restaurante.
     * @param {Estacion} estacion - Estación a buscar.
     * @returns {boolean} `true` si la estación ya está agregada.
     */
    private tieneEstacion(estacion: Estacion): boolean {
        for (const agregada of this.estaciones) {
            if (agregada === estacion) {
                return true;
            }
        }
        return false;
    }

    /**
     * Busca la estación que prepara un producto.
     * @param {Producto} producto - Producto a preparar.
     * @returns {Estacion} La primera estación que puede prepararlo.
     * @throws {Error} Si ninguna estación puede prepararlo.
     */
    public buscarEstacionPara(producto: Producto): Estacion {
        for (const estacion of this.estaciones) {
            if (estacion.puedePreparar(producto)) {
                return estacion;
            }
        }
        throw new Error("No hay estacion que pueda preparar este producto");
    }

    /**
     * Confirma un pedido y envía cada producto a la estación que lo prepara.
     * Combos y productos sueltos se tratan igual: cada ítem informa qué productos hay que preparar.
     * @param {Pedido} pedido - Pedido en construcción a confirmar.
     * @throws {Error} Si el pedido no está registrado, no se puede confirmar
     * o algún producto no tiene estación que lo prepare (en ese caso no se confirma nada).
     */
    public confirmarPedido(pedido: Pedido): void {
        if (!this.estaRegistrado(pedido)) {
            throw new Error("El pedido no está registrado en el restaurante");
        }
        const productos: Producto[] = [];
        const estacionesAsignadas: Estacion[] = [];
        for (const item of pedido.getItems()) {
            for (const producto of item.obtenerProductos()) {
                productos.push(producto);
                estacionesAsignadas.push(this.buscarEstacionPara(producto));
            }
        }

        pedido.confirmar();
        for (let i = 0; i < productos.length; i++) {
            estacionesAsignadas[i].recibir(productos[i]);
        }
    }

    /**
     * Factura un pedido confirmado cuyos productos están todos listos. El medio de pago aplica
     * el descuento más beneficioso (efectivo o día especial) y guarda el total en el pedido.
     * @param {Pedido} pedido - Pedido a facturar.
     * @param {MetodoPago} metodoPago - Medio de pago elegido por el cliente.
     * @param {DiaSemana} [diaActual] - Día de la semana, para el descuento por día especial.
     * @returns {number} El monto cobrado.
     * @throws {Error} Si el pedido no está registrado, falta el medio de pago, no está confirmado
     * o tiene productos que no están listos.
     */
    public facturarPedido(pedido: Pedido, metodoPago: MetodoPago, diaActual?: DiaSemana): number {
        if (!this.estaRegistrado(pedido)) {
            throw new Error("El pedido no está registrado en el restaurante");
        }
        if (!metodoPago) {
            throw new Error("El medio de pago es obligatorio");
        }
        if (pedido.getEstado() !== EstadoPedido.CONFIRMADO) {
            throw new Error("Solo se pueden facturar pedidos confirmados");
        }

        let subtotal = 0;
        for (const item of pedido.getItems()) {
            for (const producto of item.obtenerProductos()) {
                if (producto.getEstado() !== EstadoProducto.LISTO) {
                    throw new Error("No se puede facturar: hay ítems que no están listos");
                }
            }
            subtotal += item.obtenerPrecio();
        }

        pedido.setMetodoDePago(metodoPago);
        metodoPago.realizarPago(pedido, subtotal, diaActual);
        pedido.setEstado(EstadoPedido.ENVIADO);

        return pedido.getTotal() as number;
    }

    /** @returns {Pedido[]} Los pedidos ya facturados. */
    public obtenerPedidosFinalizados(): Pedido[] {
        const finalizados: Pedido[] = [];
        for (const pedido of this.pedidosTotales) {
            if (pedido.getEstado() === EstadoPedido.ENVIADO) {
                finalizados.push(pedido);
            }
        }
        return finalizados;
    }
}
