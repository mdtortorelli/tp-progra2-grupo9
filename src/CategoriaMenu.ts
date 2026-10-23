import { Producto } from "./Producto";

/**
 * Representa una categoría de menú que agrupa y administra una colección de productos.
 */
export class CategoriaMenu {
    /** @private @type {Producto[]} */
    private productos: Producto[];

    /**
     * Crea una instancia de una categoría de menú.
     * 
     * @constructor
     * @param {Producto[]} productos - Lista inicial de productos que pertenecen a la categoría.
     */
    public constructor(productos: Producto[]) {
        this.productos = productos;
    }

    /**
     * Obtiene la lista actual de productos asociados a la categoría.
     * 
     * @returns {Producto[]} Arreglo con los productos de la categoría.
     */
    public obtenerProductos(): Producto[] {
        return this.productos;
    }

    /**
     * Agrega un nuevo producto a la categoría del menú.
     * 
     * @param {Producto} producto - Producto que se desea agregar.
     * @returns {void}
     */
    public agregarProductoMenu(producto: Producto): void {
        this.productos.push(producto);      
    }

    /**
     * Remueve un producto de la categoría del menú.
     * 
     * @param {Producto} producto - Producto que se desea quitar.
     * @returns {void}
     */
    public quitarProductoMenu(producto: Producto): void {
        this.productos = this.productos.filter(prod => prod != producto);
    }
}