export class Efectivo {
    private descuento: number

    public constructor(descuento:number) {
        this.descuento = descuento;
    }

    public getDescuento():number {
        return this.descuento;
    }

    public setDescuento(descuento:number):void {
        this.descuento = descuento;
    }

    public calcularDescuento():number {
        //TODO: validar si deberia ser el mismo que el getter o tiene otra logica
        return this.descuento;
    }
}