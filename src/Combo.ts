import { Item } from "./Item";
import { Producto } from "./Producto";
import { TipoDescuento } from "./TipoDescuento";

/**
 * Representa un combo de productos que implementa la interfaz Item, 
 * permitiendo aplicar distintos tipos de descuento sobre un conjunto de productos.
 * 
 * @implements {Item}
 */
export class Combo implements Item {
    /** @private @type {Producto[]} */
    private productosCombo: Producto[];
    
    /** @private @type {number} */
    private precioCombo: number;
    
    /** @private @type {TipoDescuento} */
    private tipoDescuento: TipoDescuento;

    /**
     * Crea una instancia de un Combo.
     * 
     * @constructor
     * @param {Producto[]} productosCombo - Lista inicial de productos que conforman el combo.
     * @param {TipoDescuento} tipoDescuento - Estrategia o tipo de descuento a aplicar al combo.
     */
    public constructor(productosCombo: Producto[], tipoDescuento: TipoDescuento) {            
        this.productosCombo = productosCombo;
        this.tipoDescuento = tipoDescuento;
        this.precioCombo = this.tipoDescuento.aplicarDescuento(this);
    }

    /**
     * Obtiene la lista actual de productos asociados al combo.
     * 
     * @returns {Producto[]} Arreglo con los productos del combo.
     */
    public getProductosCombo(): Producto[] {
        return this.productosCombo;
    }
   
    /**
     * Obtiene el tipo de descuento configurado para el combo.
     * 
     * @returns {TipoDescuento} Instancia del tipo de descuento actual.
     */
    public getTipoDescuento(): TipoDescuento {
        return this.tipoDescuento;
    }

    /**
     * Establece un nuevo tipo de descuento para el combo.
     * 
     * @param {TipoDescuento} tipoDescuento - Nuevo tipo de descuento a configurar.
     * @returns {void}
     */
    public setTipoDescuento(tipoDescuento: TipoDescuento): void {
        this.tipoDescuento = tipoDescuento;
    }

    /**
     * Agrega un nuevo producto al combo y recalcula su precio con descuento.
     * 
     * @param {Producto} producto - Producto que se desea agregar.
     * @returns {void}
     */
    public agregarProductoCombo(producto: Producto): void {
        this.productosCombo.push(producto);
        this.precioCombo = this.calcularPrecioCombo();
    }

    /**
     * Remueve un producto del combo y recalcula su precio con descuento.
     * 
     * @param {Producto} producto - Producto que se desea quitar.
     * @returns {void}
     */
    public quitarProductoCombo(producto: Producto): void {
        this.productosCombo = this.productosCombo.filter(prod => prod != producto);
        this.precioCombo = this.calcularPrecioCombo();
    }

    /**
     * Obtiene el precio final del combo aplicando el descuento correspondiente.
     * 
     * @returns {number} Precio final del combo.
     */
    public obtenerPrecio(): number {    
        return this.precioCombo;
    }

    /**
     * Calcula la sumatoria de los precios de todos los productos sin aplicar ningún descuento.
     * 
     * @returns {number} Precio total del combo sin descuentos.
     */
    public obtenerPrecioSinDescuento(): number {
        let precio = 0;
        this.productosCombo.forEach(function(item) {
            precio += item.getPrecio();
        });

        return precio;
    }

    /**
     * Obtiene los productos del combo (método requerido por la interfaz Item).
     * 
     * @returns {Array<Producto>} Arreglo con los productos.
     */
    public obtenerProductos(): Array<Producto> {
        return this.productosCombo;
    }

    /**
     * Método auxiliar privado para recalcular el precio del combo utilizando el descuento actual.
     * 
     * @private
     * @returns {number} Precio recalculado del combo.
     */
    private calcularPrecioCombo(): number {
        return this.tipoDescuento.aplicarDescuento(this);
    }
}