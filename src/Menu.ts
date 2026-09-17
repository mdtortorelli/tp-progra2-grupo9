import { CategoriaMenu } from "./CategoriaMenu";
import { Item } from "./Item";

export class Menu {
    private categoria:CategoriaMenu;
    private itemsMenu: Item[];

    public constructor(categoria:CategoriaMenu, itemsMenu:Item[]) {
        this.categoria = categoria;
        this.itemsMenu = itemsMenu;
    }

    public getCategoria():CategoriaMenu {
            return this.categoria;
        }
    
    public setCategoria(categoria:CategoriaMenu):void {
        this.categoria = categoria;
    }

    public getItemsMenu():Item[] {
            return this.itemsMenu;
        }
    
    public setItemsMenu(items:Item[]):void {
        this.itemsMenu = items;
    }

}