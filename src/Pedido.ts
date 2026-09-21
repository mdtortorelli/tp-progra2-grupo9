import { Cliente } from "./Cliente";
import { EstadoPedido } from "./EstadoPedido"; 
import { Item } from "./Item";
import MetodoPago  from "./MetodoPago";
 
export abstract class Pedido {
    private cliente: Cliente;
    private pedidosItems: Item[];
    private estado: EstadoPedido;
    private metodoDePago: MetodoPago;
    private historialItems: Item[][];
 
        //momento magic NUMBER
    private static readonly cantidadABorrar = 1;
    private static readonly numeroUno = 1;
    private static readonly indiceInicial =0;
 
    public constructor(cliente: Cliente, pedidosItems: Item[], metodoDePago: MetodoPago) {
        this.cliente = cliente;
        this.pedidosItems = pedidosItems;
        this.metodoDePago = metodoDePago;
        this.estado = EstadoPedido.EN_CONSTRUCCION;
        this.historialItems = [];
    }
 
 
    private guardarHistorial(): void {
        this.historialItems.push([...this.pedidosItems]);
    }
 
    public agregarItem(item: Item): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("No se pueden agregar ítems. El pedido ya esta confirmado.");
        }
        this.guardarHistorial();
        this.pedidosItems.push(item);
    }
 
 
   public quitarItem(item: Item): void {
      if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
          throw new Error("No se puede eliminar el item. El pedido ya esta confirmado");
        }
      this.guardarHistorial();
    
    
      for (let i = 0; i < this.pedidosItems.length; i++) {
          if (this.pedidosItems[i] === item) {
              this.pedidosItems.splice(i,Pedido.cantidadABorrar); 
              break;
            }
        }
    }
 
    public deshacerUltimaModificacion(): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("Error , El pedido ya fue confirmado.");
        }
        if (this.historialItems.length > Pedido.indiceInicial) {
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
            console.log(`Ítem ${index + Pedido.numeroUno}: Estado actual`);
        });
    }
 
    public confirmar(): void {
        if (this.estado !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("El pedido ya fue confirmado.");
        }
        if (this.pedidosItems.length === Pedido.indiceInicial) {
            throw new Error("No se puede confirmar un pedido sin ítems.");
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
 
    public getItems(): Item[] {
        return this.pedidosItems;
    }
 
    public getMetodoDePago(): MetodoPago {
        return this.metodoDePago;
    }
 
    public setMetodoDePago(metodoDePago: MetodoPago): void {
        this.metodoDePago = metodoDePago;
    }
}
 