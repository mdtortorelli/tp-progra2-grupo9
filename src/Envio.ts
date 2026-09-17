export class Envio {
    private direccion:string;
    private costo:number;

    public constructor(direccion:string,costo:number) {
        this.direccion = direccion;
        this.costo = costo;
    }

     public getDireccion():string {
            return this.direccion;
        }
    
    public setDireccion(direccion:string):void {
        this.direccion = direccion;
    }
    
    public getCosto():number {
        return this.costo;
    }

    public setCosto(costo:number):void {
        this.costo = costo;
    }
}