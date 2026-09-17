import { DiaSemana } from "./DiaSemana";
import { Pedido } from "./Pedido";

export default abstract class MetodoPago {
    //private diaDescuento:DiaSemana[];

    public constructor(private diaDescuento:DiaSemana[]) {
        //this.diaDescuento = diaDescuento;
    }
    
    public getDiaDescuento():DiaSemana[] {
        return this.diaDescuento;
    }

    public setDiaDescuento(descuento:DiaSemana[]):void {
        this.diaDescuento = descuento;
    }

    public abstract obtenerDescuentoSemana():number;

    public abstract realizarPago(pedido:Pedido):void;

}