import { TipoDescuento } from "./TipoDescuento";
import { CERO, CIEN } from "./Constantes";
import { Combo } from "./Combo";


export class DescuentoPorcentual extends TipoDescuento {
    
    public constructor(porcentaje:number) {     
        try {
           
            if (porcentaje <= CERO) 
            {
                throw new Error
            }
            super(porcentaje);
        } 
        catch(Error)
        {
            throw new Error('El porcentaje no puede ser negativo')
        }
    }

    public getPorcentaje():number {
        return this.getDescuento();
    }

    public setPorcentaje(porcentaje:number):void {
        try {
            const cero = 0;
            if (porcentaje <= cero) 
            {
                throw new Error('El porcentaje no puede ser negativo')
            }
            this.setDescuento(porcentaje);
        } 
        catch(Error)
        {
            throw new Error
        }        
    }

    private convertirPorcentajeADecimal():number {
        return this.getDescuento() / CIEN;        
    }

    // Devuelve el precio final del ítem con el descuento aplicado
    public aplicarDescuento(combo: Combo): number {
        try {
        const precio = combo.obtenerPrecioSinDescuento();
        const descuento = precio - precio * this.convertirPorcentajeADecimal();
         if (descuento <= CERO)
            {
                throw new Error;
            }
        return descuento; 

        } catch
        {
            throw new Error('El precio no puede ser menor o igual a cero');
        }
    }
}