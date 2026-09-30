import { Pedido } from "./Pedido";
import { EstadoPedido } from "./EstadoPedido";

export interface AtencionPedido {
    
    eliminarItem(): void;
    obtenerEstadoPedido(pedido: Pedido): EstadoPedido;
    consultarEstadosDeItems(pedido: Pedido): void;
    confirmarPedido(pedido: Pedido): void;
}
