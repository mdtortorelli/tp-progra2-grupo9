import { CategoriaProd } from "./CategoriaProd";
import { EstadoProducto } from "./EstadoProducto";
import { Item } from "./Item";

export class Producto implements Item {

    private categoria: CategoriaProd;
    private nombre: string;
    private precio:number ;
    private descripcion:string;
    private estado:EstadoProducto;

    public constructor(categoria: CategoriaProd,
         nombre: string, descripcion:string, 
         precio: number,estado:EstadoProducto) {
        
            this.categoria = categoria;
            this.nombre = nombre;
            this.precio = precio;
            this.descripcion = descripcion;
            this.estado = estado;
    }

    public getCategoria():CategoriaProd {
        return this.categoria;
    }

    public setCategoria(categoria:CategoriaProd):void {
        this.categoria = categoria;
    }

    public getNombre():string {
        return this.nombre;
    }

    public setNombre(nombre:string):void {
        this.nombre = nombre;
    }

    public getPrecio():number {
        return this.precio;
    }

    public setPrecio(precio:number):void {
        this.precio = precio;
    }

    public getDescripcion():string {
        return this.descripcion;
    }

    public setDescripcion(descripcion:string):void {
        this.descripcion = descripcion;
    }

    public getEstado():EstadoProducto {
        return this.estado;
    }

    public setEstado(estado:EstadoProducto):void {
        this.estado = estado;
    }

     public calcularPrecio():number
    {
        //TODO:logica con el precio y el tipo de descuento
        //por ahora devuelve el precio del combo
        return this.precio;
    }
}