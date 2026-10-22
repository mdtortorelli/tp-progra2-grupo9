import { CategoriaProd } from "./CategoriaProd";
import { Estacion } from "./Estacion";

/** Estación que prepara los postres. */
export class CocinaDulce extends Estacion {
    /** Crea la cocina dulce, que prepara los productos de categoría {@link CategoriaProd.POSTRE}. */
    public constructor() {
        super("Cocina dulce", CategoriaProd.POSTRE)
    }
}
