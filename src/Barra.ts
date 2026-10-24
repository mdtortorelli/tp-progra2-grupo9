import { CategoriaProd } from "./CategoriaProd";
import { Estacion } from "./Estacion";

/** Estación que prepara las bebidas. */
export class Barra extends Estacion {
    /** Crea la barra, que prepara los productos de categoría {@link CategoriaProd.BEBIDA}. */
    public constructor() {
        super("Barra", CategoriaProd.BEBIDA)
    }
}
