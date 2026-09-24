import { MockProxy, mock } from 'jest-mock-extended';
import {TipoDescuento} from "../src/TipoDescuento";
import { Combo } from '../src/Combo';
import { Producto } from '../src/Producto';
import { CategoriaProd } from '../src/CategoriaProd';
import { EstadoProducto } from '../src/EstadoProducto';

export const tipoDescuentoFijoMock: TipoDescuento = {
    aplicarDescuento: function (combo: Combo): number {
        const descuento = combo.obtenerPrecio() - 10; 
        return descuento;
    }
} as any
 
export const tipoDescuentoPorcentualMock: TipoDescuento = {
    aplicarDescuento: function (combo: Combo): number {
        const descuento = combo.obtenerPrecio()*0.25; 
        return descuento;
    }
}
export const TipoDescuentoMock: MockProxy<TipoDescuento> = mock<TipoDescuento>();

export const productoMock: Producto = {
    nombre: 'Milanesa',
    precio: 12000,
    descripcion: '',
    estado: EstadoProducto.PENDIENTE,
    categoria: new CategoriaProd,
    getCategoria: function (): CategoriaProd {
        return new CategoriaProd;
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
        jest.fn().mockReturnValue(10000);
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
        jest.fn().mockReturnValue(EstadoProducto.EN_PREPARAION);
    }
} as any;

export const arrayProductosMock : MockProxy<Producto[]> = mock<Producto[]>();