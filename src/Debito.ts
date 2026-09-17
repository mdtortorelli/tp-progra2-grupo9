import { Pedido } from "./Pedido";
import { Tarjeta } from "./Tarjeta";

export class Debito extends Tarjeta {

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
        public obtenerDescuentoSemana(): number {
            throw new Error("Not implemented")  
        }
    
        // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-unused-vars
        public realizarPago(pedido: Pedido): void {
            throw new Error("Not implemented")
        }
}