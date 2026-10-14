import { Estacion } from "./Estacion";
import { Producto } from "./Producto";

export class Parrilla extends Estacion{
    constructor(){
        super()
    }

    public puedePreparar(prod: Producto): boolean {
        return prod.getCategoria() === this.getCategoria()
    }
}