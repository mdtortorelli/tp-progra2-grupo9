import { Item } from "./Item";
import { TipoDescuento } from "./TipoDescuento";

const CERO: number = 0;
const CIEN: number = 100;

export class DescuentoPorcentual extends TipoDescuento {
    private porcentaje: number = CERO;

    public constructor(porcentaje: number) {
        super();
        this.setPorcentaje(porcentaje); // el constructor también valida
    }

    public getPorcentaje(): number {
        return this.porcentaje;
    }

    public setPorcentaje(porcentaje: number): void {
        if (porcentaje < CERO || porcentaje > CIEN) {
            throw new Error("El porcentaje debe estar entre 0 y 100");
        }
        this.porcentaje = porcentaje;
    }

    private convertirPorcentajeADecimal(): number {
        return this.porcentaje / CIEN;
    }

    // Devuelve el precio final del ítem con el descuento aplicado
    public aplicarDescuento(item: Item): number {
        const precio = item.obtenerPrecio();
        return precio - precio * this.convertirPorcentajeADecimal();
    }
}