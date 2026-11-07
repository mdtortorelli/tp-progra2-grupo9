/**
 * Nodo de una lista simplemente enlazada. Lo usa {@link Queue} internamente.
 * @template T Tipo del valor que guarda el nodo.
 */
export class MyNode<T> {
    private _value: T;
    private _next: MyNode<T> | undefined;

    /**
     * Crea un nodo sin siguiente.
     * @param {T} value - Valor que guarda el nodo.
     */
    public constructor(value: T) {
        this._value = value;
        this._next = undefined;
    }

    /** @returns {T} El valor guardado en el nodo. */
    public get value(): T {
        return this._value;
    }

    /** @returns {MyNode<T> | undefined} El nodo siguiente, o `undefined` si es el último. */
    public get next(): MyNode<T> | undefined {
        return this._next;
    }

    /** @param {MyNode<T> | undefined} nodo - Nodo que pasa a ser el siguiente. */
    public set next(nodo: MyNode<T> | undefined) {
        this._next = nodo;
    }
}
