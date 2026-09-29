import { Combo } from "./Combo";
import { TipoDescuento } from "./TipoDescuento";

export class DescuentoFijo implements TipoDescuento {
    private monto:number;

    public constructor(monto:number) {

        this.monto = monto;
    }

    public getMonto():number {
        return this.monto;
    }

    public setMonto(monto:number):void {
        this.monto = monto;
    }

    public aplicarDescuento(combo: Combo): number {
        try {        
            const cero = 0;    
            const descuento = combo.obtenerPrecio() - this.monto; 
            if (descuento <= cero)
            {
                throw new Error;
            }
            return descuento;
        } 
        catch(Error)
        {
            throw new Error('El monto a descontar no puede superar el precio')
        }
    }
}