import { Combo } from "./Combo";
import { TipoDescuento } from "./TipoDescuento";

export class DescuentoFijo extends TipoDescuento {
    
    public aplicarDescuento(combo: Combo): number {
        try {        
            const cero = 0;    
            const descuento = combo.obtenerPrecio() - this.getDescuento(); 
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