import { CategoriaProd } from "./CategoriaProd";
import { Estacion } from "./Estacion";

/** Estación que prepara las ensaladas y platos fríos. */
export class CocinaFria extends Estacion {
    /** Crea la cocina fría, que prepara los productos de categoría {@link CategoriaProd.ENSALADA}. */
    public constructor() {
        super("Cocina fria", CategoriaProd.ENSALADA)
    }
}
