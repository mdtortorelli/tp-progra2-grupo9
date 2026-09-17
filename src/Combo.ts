import { Item } from "./Item";
import { Producto } from "./Producto";
import { TipoDescuento } from "./TipoDescuento";

export class Combo implements Item {
    private productosCombo:Producto[];
    private precioCombo: number;
    private tipoDescuento: TipoDescuento;

    public constructor(productosCombo:Producto[],
        precioCombo:number,
        tipoDescuento:TipoDescuento) {
            this.precioCombo = precioCombo;
            this.productosCombo = productosCombo;
            this.tipoDescuento = tipoDescuento;
    }

    public getPrecioCombo():number {
        return this.precioCombo;
    }

    public setPrecioCombo(precioCombo:number):void {
        this.precioCombo = precioCombo;
    }

    public getProductosCombo():Producto[] {
        return this.productosCombo;
    }

    public setProductosCombo(productosCombo:Producto[]):void {
        this.productosCombo = productosCombo;
    }

    public getTipoDescuento():TipoDescuento {
        return this.tipoDescuento;
    }

    public setTipoDescuento(tipoDescuento:TipoDescuento):void {
        this.tipoDescuento = tipoDescuento;
    }

    public calcularPrecio():number
    {
        //TODO:logica con el precio y el tipo de descuento
        //por ahora devuelve el precio del combo
        return this.precioCombo;
    }


}