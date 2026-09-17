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

}