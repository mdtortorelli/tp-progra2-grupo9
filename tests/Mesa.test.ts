import { describe, test, expect, beforeEach, afterEach} from '@jest/globals';
import {Mesa} from '../src/Mesa';

describe(Mesa, () => {
    
    beforeEach( () => {
    })

    afterEach(() => {
    }); 

    let instance: Mesa;
    instance = new Mesa(5);

    test("Debe ser una instancia de la clase Combo", () => {
        expect(instance).toBeInstanceOf(Mesa);
    });

    test("El número de Mesa tiene que ser el mismo que el de las instancia", () => {
            
            const numero = instance.getNumero();
    
            expect(numero).toEqual(5);
        });
    
        test("El número tiene que actualizarse en la instancia", () => {
            
            instance.setNumero(2);
    
            expect(2).toEqual(instance.getNumero());
        });
    
});
