import { Pedido } from "./Pedido";
import { Cliente } from "./Cliente";
import MetodoPago from "./MetodoPago";

export class Envio extends Pedido {
  private direccion: string;
  private costo: number;
  //momento magic number part 2
  private static readonly longitudMinima = 0;
  private static readonly costoMinimo = 0;

  public constructor(cliente: Cliente, metodoDePago: MetodoPago, direccion: string, costo: number) {
    super(cliente, [], metodoDePago);
    Envio.validarDireccion(direccion);
    Envio.validarCosto(costo);
    this.direccion = direccion;
    this.costo = costo;
  }

  private static validarDireccion(direccion: string): void {
    if (!direccion || direccion.trim().length === Envio.longitudMinima) {
      throw new Error("Error ingrese la direccion de vuelta");
    }
  }

  private static validarCosto(costo: number): void {
    if (costo < Envio.costoMinimo) {
      throw new Error("el costo nunca puede ser negativo.");
    }
  }

  public getDireccion(): string {
    return this.direccion;
  }

  public setDireccion(direccion: string): void {
    Envio.validarDireccion(direccion);
    this.direccion = direccion;
  }

  public getCosto(): number {
    return this.costo;
  }

  public setCosto(costo: number): void {
    Envio.validarCosto(costo);
    this.costo = costo;
  }
}