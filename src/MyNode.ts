export class MyNode<T> {
    private _value: T;
    private _next: MyNode<T>;
        constructor(value: T) {
        this._value = value;
        this._next = undefined as unknown as MyNode<T>;
    }
    public get value(): T {
        return this._value;
    }
    public get next(): MyNode<T> {
        return this._next;
    }
    public set next(n: MyNode<T>) {
        this._next = n;
    }
}