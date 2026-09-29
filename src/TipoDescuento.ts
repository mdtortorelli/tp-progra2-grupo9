import { Combo } from "./Combo";

export interface TipoDescuento {
    aplicarDescuento(combo:Combo):number
}