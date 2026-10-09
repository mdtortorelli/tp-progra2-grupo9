import { Item } from "./Item";
import { TipoDescuento } from "./TipoDescuento";

export class DescuentoPorcentual extends TipoDescuento {
    
    public constructor(porcentaje:number) {        
        try {
            const cero = 0;
            if (porcentaje <= cero) 
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


    public setPorcentaje(porcentaje:number):void {
        try {
            const cero = 0;
            if (porcentaje <= cero) 
            {
                throw new Error
            }
            this.setDescuento(porcentaje);
        } 
        catch(Error)
        {
            throw new Error('El porcentaje no puede ser negativo')
        }
        
    }

    private convertirPorcentajeADecimal():number {
        const cien = 100;
        return this.getDescuento() / cien;        
    }

    public aplicarDescuento(item: Item): number {
        try {
            const cero = 0;
            const porcentajeDecimal =this.convertirPorcentajeADecimal()
            let descuento = item.obtenerPrecio(); 
            
            if (porcentajeDecimal > cero)
            {
                descuento = descuento*porcentajeDecimal;    
            }
            return descuento;
        } catch (Error)
        {
            throw new Error('Error al calcular el descuento porcentual')
        }
    }
}