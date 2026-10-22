import { CategoriaProd } from "./CategoriaProd";
import { Estacion } from "./Estacion";

// Estación que prepara las carnes. 
export class Parrilla extends Estacion {
    // Crea la parrilla, que prepara los productos de categoría {@link CategoriaProd.CARNE}. 
    public constructor() {
        super("Parrilla", CategoriaProd.CARNE)
    }
}
