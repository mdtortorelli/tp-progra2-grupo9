import { Pedido } from "./Pedido";
import { Cliente } from "./Cliente";
import MetodoPago from "./MetodoPago";
import { AtencionPedido } from "./AtencionPedido";
import { EstadoPedido } from "./EstadoPedido";


export class Retiro extends Pedido implements AtencionPedido {
  private horarioRetiro: Date;

  public constructor(cliente: Cliente, metodoDePago: MetodoPago, horarioRetiro: Date) {
    super(cliente, [], metodoDePago);
    this.horarioRetiro = horarioRetiro;
  }

  public getHorarioRetiro(): Date {
    return this.horarioRetiro;
  }

  public setHorarioRetiro(horarioRetiro: Date): void {
    this.horarioRetiro = horarioRetiro;
  }

 
  public eliminarItem(): void {
    const hora = this.horarioRetiro.getHours();
    const minutos = this.horarioRetiro.getMinutes();
    console.log(`Borrando la ultima accion del retiro de las ${hora}:${minutos}`);
    this.deshacerUltimaModificacion();
  }


  public obtenerEstadoPedido(pedido: Pedido): EstadoPedido {
    if (pedido !== this) {
        throw new Error("Este mozo solo puede consultar su propio pedido.");
    }
    return this.getEstado();
}


  public consultarEstadosDeItems(pedido: Pedido): void {
    const hora = this.horarioRetiro.getHours();
    const minutos = this.horarioRetiro.getMinutes();
    console.log(`Revisando estado para el retiro de las ${hora}:${minutos}`);
    pedido.obtenerEstadosItems();
  }

  public confirmarPedido(pedido: Pedido): void {
    pedido.confirmar();
    const hora = this.horarioRetiro.getHours();
    const minutos = this.horarioRetiro.getMinutes();
    console.log(`Pedido confirmado para retirar a las ${hora}:${minutos}`);
  }
}