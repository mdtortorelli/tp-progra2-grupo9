import { Producto } from "./Producto";

export interface Item {
    obtenerPrecio():number;
    obtenerProductos(): Array<Producto>
}
