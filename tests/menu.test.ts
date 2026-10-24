import { describe, test, expect, beforeEach, afterEach} from '@jest/globals';
import {Menu} from '../src/Menu';

import { arrayItemsMock, CategoriaMenuMock, itemMock, itemMock1, itemMock2 } from './mocks';

describe(Menu, () => {
    
    beforeEach( () => {
    })

    afterEach(() => {
    }); 

    let instance: Menu;
    
    instance = new Menu(CategoriaMenuMock,arrayItemsMock);

    test("Debe ser una instancia de la clase Menu", () => {
        expect(instance).toBeInstanceOf(Menu);
    });
    
    test("El array de items del combo tiene que ser el mismo que el mock", () => {
        
        const items = instance.getItemsMenu();

        expect(items).toBe(arrayItemsMock);
    });

    test("la categoria tiene que ser la categoria del mock", () => {
        
        const categoria = instance.getCategoria();

        expect(categoria).toBe(CategoriaMenuMock);
    });

    test("agregar categoria tiene que ser la categoria del mock", () => {
        
         instance.setCategoria(CategoriaMenuMock);
        const categoria = instance.getCategoria();
        expect(categoria).toBe(CategoriaMenuMock);
    });

    test("Se agregan los items del menu tiene que ser el mismo que el mock", () => {
        
        instance.setItemsMenu(arrayItemsMock);
        
        expect(arrayItemsMock).toBe(instance.getItemsMenu());
    });

     test("Se agrega un item al array de items del menu tiene que ser el mismo que el mock", () => {
                
        instance.agregarItem(itemMock1);

        
        expect(instance.getItemsMenu()).toEqual([itemMock,itemMock1]);
    });
     
     test("Se quita un item del array de items del menú y ya no se encuentra en la lista", () => {
        instance.agregarItem(itemMock1);
        instance.agregarItem(itemMock2);
    
        instance.quitarItem(itemMock1); 

        expect(instance.getItemsMenu()).toEqual([itemMock,itemMock2]);
    });
       
});