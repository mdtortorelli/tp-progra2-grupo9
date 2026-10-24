import { DiaSemana } from "./DiaSemana";
import MetodoPago from "./MetodoPago";

export class BilleteraVirtual extends MetodoPago {
    public constructor(diaSemana: DiaSemana[], porcentajeDescuentoSemana: number) {
        super(diaSemana, porcentajeDescuentoSemana);
    }

}
