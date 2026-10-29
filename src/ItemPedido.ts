import { EstadoProducto } from "./EstadoProducto";
import { Item } from "./Item"

export class ItemPedido {
    private item: Item
    private cantidad: number
    private estado: EstadoProducto

    public constructor(item: Item, cantidad:number)
    {
        this.item = item;
        this.cantidad = cantidad;
        this.estado = EstadoProducto.PENDIENTE;
       
    }

    public getEstado(): EstadoProducto {
        return this.estado;
    }

    public getCantidad(): number {
        return this.cantidad;
    }
     
    public setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
    }
    
    public getItem(): Item {
        return this.item;
    }

    public iniciar(): void {
        this.estado = EstadoProducto.EN_PREPARACION;

    }
    public finalizar(): void {
        this.estado = EstadoProducto.LISTO;
    }

    public puedeModificarse(): boolean {
        return this.estado == EstadoProducto.PENDIENTE; 
    }

}