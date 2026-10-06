import { Item } from "./Item";
import { Producto } from "./Producto";
import { TipoDescuento } from "./TipoDescuento";

export class Combo implements Item {
    private productosCombo:Producto[];
    private precioCombo: number;
    private tipoDescuento: TipoDescuento;

    public constructor(productosCombo:Producto[],        
        tipoDescuento:TipoDescuento) {            
            this.productosCombo = productosCombo;
            this.tipoDescuento = tipoDescuento;
            this.precioCombo = this.tipoDescuento.aplicarDescuento(this);
    }

    public getProductosCombo():Producto[] {
        return this.productosCombo;
    }

    public agregarProductoCombo(producto:Producto):void {
        this.productosCombo.push(producto);
        this.precioCombo = this.calcularPrecioCombo();

    }

    public quitarProductoCombo(producto:Producto):void {
        this.productosCombo = this.productosCombo.filter(prod => prod != producto);
        this.precioCombo = this.calcularPrecioCombo();
    }
    
    public getTipoDescuento():TipoDescuento {
        return this.tipoDescuento;
    }

    public setTipoDescuento(tipoDescuento:TipoDescuento):void {
        this.tipoDescuento = tipoDescuento;
    }

    public obtenerPrecio():number
    {    
        return this.precioCombo;
    }

    public obtenerPrecioSinDescuento():number
    {
        let precio = 0;
        this.productosCombo.forEach(function(item) {
            precio += item.getPrecio();
        });

        return precio;
    }

    private calcularPrecioCombo():number {
        return this.tipoDescuento.aplicarDescuento(this);
    }

}