import { Mesa } from "./Mesa";

export class Salon {
    private mesa: Mesa;

    public constructor(mesa:Mesa) {
        this.mesa = mesa;
    }
    
    public getMesa():Mesa {
        return this.mesa;
    }

    public setMesa(mesa:Mesa):void {
        this.mesa = mesa;
    }
}