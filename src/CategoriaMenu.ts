import { Producto } from "./Producto";

export class CategoriaMenu {

    private productos: Producto[]

    public constructor(productos: Producto[]) 
    {
        this.productos = productos;
    }

    public obtenerProductos():Producto[]
    {
        return this.productos;
    }

     public agregarProductoMenu(producto:Producto):void {
        this.productos.push(producto);      
    }

    public quitarProductoMenu(producto:Producto):void {
        this.productos = this.productos.filter(prod => prod != producto);
    }
    
}