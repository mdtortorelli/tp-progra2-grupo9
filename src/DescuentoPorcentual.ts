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
        this.setPorcentaje(porcentaje);
    }

    private convertirPorcentajeADecimal():number {
        const cien = 100;
        return this.getDescuento() / cien;        
    }

    // Devuelve el precio final del ítem con el descuento aplicado
    public aplicarDescuento(item: Item): number {
        const precio = item.obtenerPrecio();
        return precio - precio * this.convertirPorcentajeADecimal();
    }
}