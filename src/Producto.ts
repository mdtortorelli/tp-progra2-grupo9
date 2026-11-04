import { CategoriaProd } from "./CategoriaProd";
import { EstadoProducto } from "./EstadoProducto";
import { Item } from "./Item";

/**
 * Representa un producto individual dentro del sistema, implementando la interfaz {@link Item} 
 * para gestionar su precio, categoría, descripción y estado de preparación.
 * 
 * @class Producto
 * @implements {Item}
 */
export class Producto implements Item {
  /** Nombre identificatorio del producto. */
  private nombre: string;

  /** Precio monetario del producto. */
  private precio: number;

  /** Descripción detallada u opcional del producto. */
  private descripcion: string;

  /** Estado actual de preparación en el que se encuentra el producto. */
  private estado: EstadoProducto;

  /** Categoría a la que pertenece el producto. */
  private categoria: CategoriaProd;

  /**
   * Crea una instancia de un nuevo producto, inicializando su estado por defecto 
   * en pendiente ({@link EstadoProducto.PENDIENTE}) y asignando una cadena vacía si no se provee descripción.
   * 
   * @constructor
   * @param {string} nombre - Nombre del nuevo producto.
   * @param {number} precio - Precio unitario del producto.
   * @param {CategoriaProd} categoria - Categoría comercial o de estación a la que pertenece el producto.
   * @param {string} [descripcion=""] - Descripción opcional del producto (por defecto es una cadena vacía).
   */
  public constructor(
    nombre: string,
    precio: number,
    categoria: CategoriaProd,
    descripcion?: string
  ) {
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.descripcion = descripcion ?? "";
    this.estado = EstadoProducto.PENDIENTE;
  }

  /**
   * Obtiene la categoría actual del producto.
   * 
   * @returns {CategoriaProd} La categoría asociada.
   */
  public getCategoria(): CategoriaProd {
    return this.categoria;
  }

  /**
   * Establece o modifica la categoría del producto.
   * 
   * @param {CategoriaProd} categoria - La nueva categoría a asignar.
   * @returns {void}
   */
  public setCategoria(categoria: CategoriaProd): void {
    this.categoria = categoria;
  }

  /**
   * Obtiene el nombre actual del producto.
   * 
   * @returns {string} El nombre del producto.
   */
  public getNombre(): string {
    return this.nombre;
  }

  /**
   * Establece o modifica el nombre del producto.
   * 
   * @param {string} nombre - El nuevo nombre a asignar.
   * @returns {void}
   */
  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  /**
   * Obtiene el precio actual del producto.
   * 
   * @returns {number} El valor numérico del precio.
   */
  public getPrecio(): number {
    return this.precio;
  }

  /**
   * Establece o modifica el precio del producto.
   * 
   * @param {number} precio - El nuevo precio a asignar.
   * @returns {void}
   */
  public setPrecio(precio: number): void {
    this.precio = precio;
  }

  /**
   * Obtiene la descripción del producto.
   * 
   * @returns {string} El texto descriptivo.
   */
  public getDescripcion(): string {
    return this.descripcion;
  }

  /**
   * Establece o modifica la descripción del producto.
   * 
   * @param {string} descripcion - El nuevo texto descriptivo a asignar.
   * @returns {void}
   */
  public setDescripcion(descripcion: string): void {
    this.descripcion = descripcion;
  }

  /**
   * Obtiene el estado actual de preparación del producto.
   * 
   * @returns {EstadoProducto} El estado en el que se encuentra.
   */
  
  public getEstado(): EstadoProducto {
    return this.estado;
  }
  

  /**
   * Establece o modifica el estado de preparación del producto.
   * 
   * @param {EstadoProducto} estado - El nuevo estado a asignar.
   * @returns {void}
   */
  public setEstado(estado: EstadoProducto): void {
    this.estado = estado;
  }

  /**
   * Obtiene el precio del producto cumpliendo con la interfaz {@link Item}.
   * 
   * @override
   * @returns {number} El precio del producto.
   */
  public obtenerPrecio(): number {
      return this.getPrecio();
  }

  /**
   * Retorna una colección que contiene al producto actual, cumpliendo con la interfaz {@link Item}.
   * 
   * @override
   * @returns {Array<Producto>} Un arreglo con este único producto.
   */
  public obtenerProductos(): Array<Producto> {
      const productos: Producto[] = [];
      productos.push(this);
      return productos;
  }
}