export class TipoDescuento {
    private porcentaje: number;

    public constructor(porcentaje: number) {
        this.porcentaje = porcentaje;
    }

    public getPorcentaje(): number {
        return this.porcentaje;
    }

    public setPorcentaje(porcentaje: number): void {
        this.porcentaje = porcentaje;
    }

    public static obtenerMasBeneficioso(descuento1: number, descuento2: number): number {
        return Math.max(descuento1, descuento2);
    } 
}