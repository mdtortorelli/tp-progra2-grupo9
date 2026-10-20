import { DiaSemana } from "./DiaSemana";
import MetodoPago from "./MetodoPago";

//const CIEN: number = 100;
export class BilleteraVirtual extends MetodoPago {
    public constructor(diaSemana: DiaSemana[], porcentajeDescuentoSemana: number) {
        super(diaSemana, porcentajeDescuentoSemana);
    }

}
