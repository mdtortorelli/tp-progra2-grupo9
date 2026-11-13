import { DiaSemana } from "../Utils/DiaSemana";
import { Estacion } from "../Cocina/Estacion";
import { EstadoPedido } from "../Pedidos/EstadoPedido";
import { EstadoProducto } from "../Productos/EstadoProducto";
import { ItemPedido } from "../Productos/ItemPedido";
import { Menu } from "../Productos/Menu";
import MetodoPago from "../MediosDePago/MetodoPago";
import { Pedido } from "../Pedidos/Pedido";
import { CERO } from "../Utils/Constantes";

export class Restaurante {
    private menu: Menu
    private pedidosTotales: Pedido[]
    private estacion: Estacion | undefined
    private itemsEnCocina: Map<Pedido, ItemPedido[]>
    private porcentajeDescuentoSemana: number = CERO
    private diaDescuento: DiaSemana[] | undefined

    /**
     * @param {Menu} menu - Menú del restaurante.
     * @param {Pedido[]} [pedidosTotales=[]] - Pedidos ya registrados.
     * @param {Estacion} [estacion] - Estación por la que entran los ítems a la cadena de estaciones.
     */
    public constructor(menu: Menu, pedidosTotales: Pedido[] = [], estacion?: Estacion) {
        this.menu = menu
        this.pedidosTotales = pedidosTotales
        this.estacion = estacion
        this.itemsEnCocina = new Map<Pedido, ItemPedido[]>()
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

    /** @returns {Estacion | undefined} Estación por la que entran los productos a la cadena. */
    public getEstacion(): Estacion | undefined {
        return this.estacion
    }

    /** @param {Estacion} estacion - Estación por la que van a entrar los productos a la cadena. */
    public setEstacion(estacion: Estacion): void {
        this.estacion = estacion
    }

  /**
     * Obtiene los días de la semana configurados para aplicar descuentos.
     * 
     * @returns {DiaSemana[]} Un arreglo con los días de descuento.
     */
    public getDiaDescuento(): DiaSemana[] | undefined {
        return this.diaDescuento;
    }

    /**
     * Establece o modifica los días de la semana configurados para los descuentos.
     * 
     * @param {DiaSemana[]} descuento - El nuevo arreglo de días de descuento a asignar.
     * @returns {void}
     */
    public setDiaDescuento(descuento: DiaSemana[]): void {
        this.diaDescuento = descuento;
    }

    /**
     * Obtiene el porcentaje de descuento asignado para los días de descuento semanal.
     * 
     * @returns {number} El porcentaje de descuento semanal.
     */
    public getPorcentajeDescuentoSemana(): number {
        return this.porcentajeDescuentoSemana;
    }

    /**
     * Establece o modifica el porcentaje de descuento semanal.
     * 
     * @param {number} porcentajeDescuentoSemana - El nuevo porcentaje a asignar.
     * @returns {void}
     */
    public setPorcentajeDescuentoSemana(porcentajeDescuentoSemana: number): void {
        this.porcentajeDescuentoSemana = porcentajeDescuentoSemana;
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
     * Confirma un pedido y manda a cocina un ítem por cada producto que hay que preparar.
     * Así un combo se reparte entre las estaciones que preparan cada uno de sus productos.
     * Cada ítem entra por la estación del restaurante y avanza por la cadena hasta la que puede prepararlo.
     * @param {Pedido} pedido - Pedido en construcción a confirmar.
     * @throws {Error} Si el pedido no está registrado, no hay estaciones, no se puede confirmar
     * o algún producto no tiene estación que lo prepare.
     */
    public confirmarPedido(pedido: Pedido): void {
        if (!this.estaRegistrado(pedido)) {
            throw new Error("El pedido no está registrado en el restaurante");
        }
        const estacion = this.estacion;
        if (estacion === undefined) {
            throw new Error("No hay estaciones en el restaurante");
        }

        pedido.confirmar();
        const itemsCocina: ItemPedido[] = [];
        for (const itemPedido of pedido.getItems()) {
            for (const producto of itemPedido.getItem().obtenerProductos()) {
                itemsCocina.push(new ItemPedido(producto, itemPedido.getCantidad()));
            }
        }
        this.itemsEnCocina.set(pedido, itemsCocina);
        for (const itemCocina of itemsCocina) {
            estacion.recibir(itemCocina);
        }
    }

    /**
     * Devuelve los ítems que se mandaron a cocina para un pedido confirmado.
     * @param {Pedido} pedido - Pedido a consultar.
     * @returns {ItemPedido[]} Los ítems de cocina del pedido, o una lista vacía si todavía no se confirmó.
     */
    public obtenerItemsEnCocina(pedido: Pedido): ItemPedido[] {
        const itemsCocina = this.itemsEnCocina.get(pedido);
        if (itemsCocina === undefined) {
            return [];
        }
        return itemsCocina;
    }

    /**
     * Factura un pedido confirmado cuyos ítems de cocina están todos listos. El medio de pago aplica
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

        for (const itemCocina of this.obtenerItemsEnCocina(pedido)) {
            if (itemCocina.getEstado() !== EstadoProducto.LISTO) {
                throw new Error("No se puede facturar: hay items que no estan listos");
            }
        }

        let subtotal = 0;
        for (const itemPedido of pedido.getItems()) {
            subtotal += itemPedido.getItem().obtenerPrecio() * itemPedido.getCantidad();
        }

        pedido.setMetodoDePago(metodoPago);
        metodoPago.realizarPago(pedido, subtotal, this.obtenerDescuentoSemana(diaActual));
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

    /**
         * Calcula el porcentaje de descuento semanal evaluando si el día actual 
         * se encuentra dentro de los días configurados con beneficio.
         * 
         * @param {DiaSemana} [diaActual] - Día actual opcional a verificar.
         * @returns {number} El porcentaje de descuento si aplica, o {@link CERO} en caso contrario.
         */
        public obtenerDescuentoSemana(diaActual?: DiaSemana): number {
            if (diaActual !== undefined && this.diaDescuento !== undefined && this.diaDescuento.includes(diaActual)) {
                return this.porcentajeDescuentoSemana;
            }
            return CERO;
        }
    
}
