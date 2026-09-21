import { CategoriaProd } from "./CategoriaProd";
import { EstadoProducto } from "./EstadoProducto";

export class Producto {

  private nombre: string;
  private precio: number;
  private descripcion: string;
  private estado: EstadoProducto;
  private categoria: CategoriaProd;

  public constructor(nombre: string,
    precio: number,
    categoria: CategoriaProd,
    descripcion?: string) {

    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.descripcion = descripcion ?? "";
    this.estado = EstadoProducto.PENDIENTE;
  }

  public getCategoria(): CategoriaProd {
    return this.categoria;
  }

  public setCategoria(categoria: CategoriaProd): void {
    this.categoria = categoria;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public getPrecio(): number {
    return this.precio;
  }

  public setPrecio(precio: number): void {
    this.precio = precio;
  }

  public getDescripcion(): string {
    return this.descripcion;
  }

  public setDescripcion(descripcion: string): void {
    this.descripcion = descripcion;
  }

  public getEstado(): EstadoProducto {
    return this.estado;
  }

  public setEstado(estado: EstadoProducto): void {
    this.estado = estado;
  }
}
