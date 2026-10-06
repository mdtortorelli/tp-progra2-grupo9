import { Pedido } from "./Pedido";
import { Cliente } from "./Cliente";
import MetodoPago from "./MetodoPago";
import { AtencionPedido } from "./AtencionPedido";
import { Mesa } from "./Mesa";
import { EstadoPedido } from "./EstadoPedido";

export class Salon extends Pedido implements AtencionPedido {
  private mesa: Mesa;

  public constructor(cliente: Cliente, metodoDePago: MetodoPago, mesa: Mesa) {
    super(cliente, [], metodoDePago);
    this.mesa = mesa;
  }

  public getMesa(): Mesa {
    return this.mesa;
  }

  public setMesa(mesa: Mesa): void {
    this.mesa = mesa;
  }

  public eliminarItem(): void {
    this.deshacerUltimaModificacion();
  }

  public obtenerEstadoPedido(): EstadoPedido {
    return this.getEstado();
  }

  public consultarEstadosDeItems(): void {
    this.obtenerEstadosItems();
  }

  public confirmarPedido(): void {
    this.confirmar();
  }
}