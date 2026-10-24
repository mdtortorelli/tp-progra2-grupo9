import { CategoriaMenu } from "./CategoriaMenu";
import { Item } from "./Item";

/**
 * Representa un menú que agrupa una categoría específica y una lista de ítems disponibles.
 */
export class Menu {
    /** @private @type {CategoriaMenu} */
    private categoria: CategoriaMenu;
    
    /** @private @type {Item[]} */
    private itemsMenu: Item[];

    /**
     * Crea una instancia de un Menú.
     * 
     * @constructor
     * @param {CategoriaMenu} categoria - Categoría a la que pertenece el menú.
     * @param {Item[]} itemsMenu - Lista inicial de ítems que componen el menú.
     */
    public constructor(categoria: CategoriaMenu, itemsMenu: Item[]) {
        this.categoria = categoria;
        this.itemsMenu = itemsMenu;
    }

    /**
     * Obtiene la categoría asociada al menú.
     * 
     * @returns {CategoriaMenu} Categoría actual del menú.
     */
    public getCategoria(): CategoriaMenu {
        return this.categoria;
    }
    
    /**
     * Establece una nueva categoría para el menú.
     * 
     * @param {CategoriaMenu} categoria - Nueva categoría a configurar.
     * @returns {void}
     */
    public setCategoria(categoria: CategoriaMenu): void {
        this.categoria = categoria;
    }

    /**
     * Obtiene la lista actual de ítems que contiene el menú.
     * 
     * @returns {Item[]} Arreglo con los ítems del menú.
     */
    public getItemsMenu(): Item[] {
        return this.itemsMenu;
    }
    
    /**
     * Reemplaza la lista completa de ítems del menú.
     * 
     * @param {Item[]} items - Nueva lista de ítems.
     * @returns {void}
     */
    public setItemsMenu(items: Item[]): void {
        this.itemsMenu = items;
    }

    /**
     * Agrega un nuevo ítem a la lista del menú.
     * 
     * @param {Item} item - Ítem que se desea agregar.
     * @returns {void}
     */
    public agregarItem(item: Item): void {
        this.itemsMenu.push(item);
    }

    /**
     * Remueve un ítem de la lista del menú.
     * 
     * @param {Item} item - Ítem que se desea quitar.
     * @returns {void}
     */
    public quitarItem(item: Item): void {
        this.itemsMenu = this.itemsMenu.filter(i => i != item);
    }
}