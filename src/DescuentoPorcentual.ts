import { Item } from "./Item";
import { TipoDescuento } from "./TipoDescuento";

export class DescuentoPorcentual implements TipoDescuento {
    private porcentaje:number;

    public constructor(porcentaje:number) {
        try {
            const cero = 0;
            if (porcentaje <= cero) 
            {
                throw new Error
            }
            this.porcentaje = porcentaje;
        } 
        catch(Error)
        {
            throw new Error('El porcentaje no puede ser negativo')
        }
    }

     public getPorcentaje():number {
        return this.porcentaje;
    }

    public setPorcentaje(porcentaje:number):void {
        try {
            const cero = 0;
            if (porcentaje <= cero) 
            {
                throw new Error
            }
            this.porcentaje = porcentaje;
        } 
        catch(Error)
        {
            throw new Error('El porcentaje no puede ser negativo')
        }
        
    }

    private convertirPorcentajeADecimal():number {
        const cien = 100;
        return this.porcentaje / cien;        
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