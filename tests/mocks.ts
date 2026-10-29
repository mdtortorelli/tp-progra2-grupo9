/// <reference types="jest" />

import { MockProxy, mock } from 'jest-mock-extended';
import {TipoDescuento} from "../src/TipoDescuento";
import { Combo } from '../src/Combo';
import { Producto } from '../src/Producto';
import { CategoriaProd } from '../src/CategoriaProd';
import { EstadoProducto } from '../src/EstadoProducto';
import { Item } from '../src/Item';
import { CategoriaMenu } from '../src/CategoriaMenu';
import { DescuentoFijo } from '../src/DescuentoFijo';
import { DescuentoPorcentual } from '../src/DescuentoPorcentual';
import { ItemPedido } from '../src/ItemPedido';

export const tipoDescuentoFijoMock: TipoDescuento = {
    aplicarDescuento: function (combo: Combo): number {
        const descuento = combo.obtenerPrecio() - 10; 
        return descuento;
    }
} as any
 
export const tipoDescuentoPorcentualMock: TipoDescuento = {
    aplicarDescuento: function (combo: Combo): number {
        const descuento = combo.obtenerPrecio() * 0.25;
        return descuento;
    }
} as any

export const DescuentoFijoMock= new DescuentoFijo(100);
export const DescuentoFijoMock2= new DescuentoFijo(20000);

export const DescuentoPorcentualMock= new DescuentoPorcentual(20);
export const DescuentoPorcentualMock2= new DescuentoPorcentual(100);

export const productoMock: Producto = {
    nombre: 'Milanesa',
    precio: 12000,
    descripcion: '',
    estado: EstadoProducto.PENDIENTE,
    categoria: CategoriaProd.CARNE,
    getCategoria: function (): CategoriaProd {
        return CategoriaProd.CARNE;
    },
    setCategoria: function (categoria: CategoriaProd): void {
        jest.fn().mockReturnValue(CategoriaProd);
    },
    getNombre: function (): string {
        return 'Milanesa'
    },
    setNombre: function (nombre: string): void {
        jest.fn().mockReturnValue('Suprema');
    },
    getPrecio: function (): number {
        return 12000;
    },
    setPrecio: function (precio: number): void {
        jest.fn().mockReturnValue(12000);
    },
    getDescripcion: function (): string {
        return '';
    },
    setDescripcion: function (descripcion: string): void {
        jest.fn().mockReturnValue(undefined);
    },
    getEstado: function (): EstadoProducto {
        return EstadoProducto.PENDIENTE;
    },
    setEstado: function (estado: EstadoProducto): void {
        jest.fn().mockReturnValue(EstadoProducto.EN_PREPARACION);
    }
} as any;

export const productoMock1: Producto = {
    nombre: 'Ensalada Ceasar',
    precio: 5000,
    descripcion: '',
    estado: EstadoProducto.PENDIENTE,
    categoria: CategoriaProd.ENSALADA,
    getCategoria: function (): CategoriaProd {
        return CategoriaProd.ENSALADA;
    },
    setCategoria: function (categoria: CategoriaProd): void {
        jest.fn().mockReturnValue(CategoriaProd);
    },
    getNombre: function (): string {
        return 'Ensalada Ceasar'
    },
    setNombre: function (nombre: string): void {
        jest.fn().mockReturnValue('Ensalada Ceasar');
    },
    getPrecio: function (): number {
        return 5000;
    },
    setPrecio: function (precio: number): void {
        jest.fn().mockReturnValue(5000);
    },
    getDescripcion: function (): string {
        return '';
    },
    setDescripcion: function (descripcion: string): void {
        jest.fn().mockReturnValue(undefined);
    },
    getEstado: function (): EstadoProducto {
        return EstadoProducto.PENDIENTE;
    },
    setEstado: function (estado: EstadoProducto): void {
        jest.fn().mockReturnValue(EstadoProducto.EN_PREPARACION);
    }
} as any;

export var arrayProductosMock : MockProxy<Producto[]> = mock<Producto[]>();


export const CategoriaMenuMock : CategoriaMenu = {
    productos: arrayProductosMock,
    obtenerProductos: function (): Producto[] {
        return arrayProductosMock;
    },
    agregarProductoMenu: function (producto: Producto): void {
        arrayProductosMock.push(producto);
    },
    quitarProductoMenu: function (producto: Producto): void {
        let arrProductosMock = arrayProductosMock.filter(prod => prod != producto);
        arrayProductosMock = arrProductosMock;
    }
} as any;

export const itemMock : Item = {
    obtenerPrecio: function (): number {
        return 1000;
    },
    obtenerProductos: function (): Array<Producto> {
        return [productoMock];
    }
}

export const itemMock1 : Item = {
    obtenerPrecio: function (): number {
        return 500;
    },
    obtenerProductos: function (): Array<Producto> {
        return arrayProductosMock;
    }
}

export const itemMock2 : Item = {
    obtenerPrecio: function (): number {
        return 200;
    },
    obtenerProductos: function (): Array<Producto> {
        return arrayProductosMock;
    }
}

export let arrayItemsMock : MockProxy<Item[]> = [itemMock];

export const comboFijoMock = new Combo([productoMock],DescuentoFijoMock) ;
export const comboPorcentajeMock = new Combo([productoMock],DescuentoPorcentualMock) ;

export const itemPedidoMock = new ItemPedido(itemMock, 1);
export const itemPedidoMock1 = new ItemPedido(itemMock1, 1);
export const itemPedidoMock2 = new ItemPedido(itemMock2, 1);


