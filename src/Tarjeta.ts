import { DiaSemana } from "./DiaSemana";
import MetodoPago from "./MetodoPago";

export abstract class Tarjeta extends MetodoPago {
   public constructor(diaSemana: DiaSemana[], porcentajeDescuentoSemana: number) {
      super(diaSemana, porcentajeDescuentoSemana);
   }
}