export class Mesa {
  private numero: number;

  public constructor(numero: number) {
    this.numero = numero;
  }

  public getNumero(): number {
    return this.numero;
  }

  public setNumero(numero: number): void {
    this.numero = numero;
  }
}