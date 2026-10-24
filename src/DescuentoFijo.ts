import { Combo } from "./Combo";
import { CERO } from "./Constantes";
import { TipoDescuento } from "./TipoDescuento";

export class DescuentoFijo extends TipoDescuento {
    
    public aplicarDescuento(combo: Combo): number {
        try {        
                          
            const descuento = combo.obtenerPrecioSinDescuento() - this.getDescuento(); 
            
            if (descuento <= CERO)
            {
                throw new Error;
            }
            return descuento;
        } 
        catch
        {
            throw new Error('El monto a descontar no puede superar el precio')
        }
    }
}
