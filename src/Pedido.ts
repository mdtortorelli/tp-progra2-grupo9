import { Cliente } from "./Cliente";
import { CERO, N_UNO } from "./Constantes";
import { EstadoPedido } from "./EstadoPedido"; 
import { EstadoProducto } from "./EstadoProducto";
import { ItemPedido } from "./ItemPedido";
import MetodoPago  from "./MetodoPago";
 
export abstract class Pedido {
    private cliente: Cliente;
    private pedidosItems: ItemPedido[];
    private estado: EstadoPedido;
    private metodoDePago: MetodoPago;
    private historialItems: ItemPedido[][];
    private total: number | null = null

 
    public constructor(cliente: Cliente, pedidosItems: ItemPedido[], metodoDePago: MetodoPago) {
        this.cliente = cliente;
        this.pedidosItems = pedidosItems;
        this.metodoDePago = metodoDePago;
        this.estado = EstadoPedido.EN_CONSTRUCCION;
        this.historialItems = [];
    }

    public getTotal(): number | null {
        return this.total
    }
    public setTotal(total: number): void {
        this.total = total
    }
 
    private guardarHistorial(): void {
        this.historialItems.push([...this.pedidosItems]);
    }
 
    public agregarItem(item: ItemPedido): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("No se pueden agregar ítems. El pedido ya esta confirmado.");
        }
        this.guardarHistorial();
        this.pedidosItems.push(item);
    }
 
    public quitarItem(item: ItemPedido): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("No se puede eliminar el item. El pedido ya esta confirmado");
        }
        this.guardarHistorial();

        for (let i = 0; i < this.pedidosItems.length; i++) {
            if (this.pedidosItems[i] === item) {
                this.pedidosItems.splice(i, N_UNO); 
                break;
            }
        }
    }
 
    public deshacerUltimaModificacion(): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("Error , El pedido ya fue confirmado.");
        }
        if (this.historialItems.length > CERO) {
            const estadoAnterior = this.historialItems.pop();
            if (estadoAnterior) {
                this.pedidosItems = estadoAnterior;
            }
        } else {
            console.log("No hay modificaciones para deshacer.");
        }
    }
 
    public obtenerEstadosItems(): void {
        this.pedidosItems.forEach((item, index) => {
            const estadoStr = EstadoProducto[item.getEstado()];
            console.log(`Ítem ${index + N_UNO}: ${estadoStr}`);
           // console.log(`Ítem ${index + N_UNO}: ${item.getEstado()}`);
        });
    }
 
    public confirmar(): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("El pedido ya fue confirmado.");
        }
        if (this.pedidosItems.length === CERO) {
            throw new Error("No se puede confirmar un pedido sin items.");
        }
        this.estado = EstadoPedido.CONFIRMADO;
    }
 
    public getCliente(): Cliente {
        return this.cliente;
    }
 
    public setCliente(cliente: Cliente): void {
        this.cliente = cliente;
    }
 
    public getEstado(): EstadoPedido {
        return this.estado;
    }
 
    public setEstado(nuevoEstado: EstadoPedido): void {
        this.estado = nuevoEstado;
    }
 
    public getItems(): ItemPedido[] {
        return this.pedidosItems;
    }
 
    public getMetodoDePago(): MetodoPago {
        return this.metodoDePago;
    }
 
    public setMetodoDePago(metodoDePago: MetodoPago): void {
        this.metodoDePago = metodoDePago;
    }
}