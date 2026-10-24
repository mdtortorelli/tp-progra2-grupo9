import { Combo } from "./Combo";

export abstract class TipoDescuento {
    private descuento: number;

    public constructor(descuento: number) {
        this.descuento = descuento;
    }

    public getDescuento(): number {
        return this.descuento;
    }

    protected setDescuento(descuento: number): void {
        this.descuento = descuento;
    }

    public static obtenerMasBeneficioso(descuento1: number, descuento2: number): number {
        return Math.max(descuento1, descuento2);
    } 

    public abstract aplicarDescuento(combo:Combo):number;
}