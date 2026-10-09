import { describe, test, expect, beforeEach, afterEach} from '@jest/globals';
import {Menu} from '../src/Menu';
import { MockProxy, mock } from 'jest-mock-extended';
import { arrayItemsMock, arrayProductosMock, CategoriaMenuMock, itemMock } from './mocks';
import { CategoriaMenu } from '../src/CategoriaMenu';

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
        
        let items = instance.getItemsMenu();

        const agregado = items.push(itemMock);

        expect(agregado).toBe(instance.agregarItem(itemMock));
    });
     /*  
     test("Se quita un item al array de items del menu tiene que ser el mismo que el mock", () => {
        
        let items = instance.getItemsMenu();

        const quitado = items.filter(i => i != itemMock);

        expect(quitado).toBe(instance.getItemsMenu());
    });
    */
   
});