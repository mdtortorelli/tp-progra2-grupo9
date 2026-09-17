import { Cliente } from "./Cliente";
import { EstadoPedido } from "./EstadoPedido";
import { Item } from "./Item";
import MetodoPago from "./MetodoPago";


export class Pedido {
    private cliente: Cliente
    private pedidosItems: Item[]
    private estado: EstadoPedido
    private metodoDePago: MetodoPago

    public constructor(cliente: Cliente, pedidosItems: Item[], metodoDePago: MetodoPago) {
        this.cliente = cliente
        this.pedidosItems = pedidosItems
        this.metodoDePago = metodoDePago
        this.estado = EstadoPedido.EN_CONSTRUCCION
    }

    
}