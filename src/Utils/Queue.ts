import { MyNode } from "./MyNode";

/**
 * Cola FIFO (el primero en entrar es el primero en salir) implementada con nodos enlazados.
 * Cada {@link Estacion} la usa para atender los productos en el orden en que le llegaron.
 * @template T Tipo de los elementos de la cola.
 */
export class Queue<T> {
    private first: MyNode<T> | undefined;
    private last: MyNode<T> | undefined;

    /** Crea una cola vacía. */
    public constructor() {
        this.first = undefined;
        this.last = undefined;
    }

    /**
     * Agrega un elemento al final de la cola.
     * @param {T} value - Elemento a encolar.
     */
    public enqueue(value: T): void {
        const newNode = new MyNode(value);
        if (this.last === undefined) {
            this.first = newNode;
        } else {
            this.last.next = newNode;
        }
        this.last = newNode;
    }

    /**
     * Quita y devuelve el primer elemento de la cola.
     * @returns {T | undefined} El primer elemento, o `undefined` si la cola está vacía.
     */
    public dequeue(): T | undefined {
        if (this.first === undefined) {
            return undefined;
        }
        const value = this.first.value;
        this.first = this.first.next;
        if (this.first === undefined) {
            this.last = undefined;
        }
        return value;
    }

    /**
     * Devuelve el primer elemento sin quitarlo.
     * @returns {T | undefined} El primer elemento, o `undefined` si la cola está vacía.
     */
    public peek(): T | undefined {
        if (this.first === undefined) {
            return undefined;
        }
        return this.first.value;
    }

    /** @returns {boolean} `true` si la cola no tiene elementos. */
    public isEmpty(): boolean {
        return this.first === undefined;
    }

    /** @returns {number} Cantidad de elementos en la cola. */
    public size(): number {
        let cantidad = 0;
        let actual = this.first;
        while (actual !== undefined) {
            cantidad++;
            actual = actual.next;
        }
        return cantidad;
    }

    /**
     * Devuelve los elementos en orden de llegada, sin modificar la cola.
     * @returns {T[]} Copia de los elementos, del primero al último.
     */
    public toArray(): T[] {
        const elementos: T[] = [];
        let actual = this.first;
        while (actual !== undefined) {
            elementos.push(actual.value);
            actual = actual.next;
        }
        return elementos;
    }
}
