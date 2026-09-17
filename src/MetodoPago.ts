import { DiaSemana } from "./DiaSemana";
//import { Pedido } from "./Pedido";

export abstract class MetodoPago {
    private diaDescuento:DiaSemana[];

    public constructor(diaDescuento:DiaSemana[]) {
        this.diaDescuento = diaDescuento;
    }
    
    public getDiaDescuento():DiaSemana[] {
        return this.diaDescuento;
    }

    public setDiaDescuento(descuento:DiaSemana[]):void {
        this.diaDescuento = descuento;
    }

    //public obtenerDescuentoSemana():number {}

    //public realizarPago(pedido:Pedido):void {}

}