import { MyNode } from "./MyNode";
import { Producto } from "./Producto";

export class Queue<Producto> {
    private first: MyNode<Producto>;
    private last: MyNode<Producto>;
    public constructor() {
    this.first = undefined as unknown as MyNode<Producto>;
    this.last = undefined as unknown as MyNode<Producto>;
    }
    public enqueue(value: Producto): void {
        const newNode = new MyNode(value);
        if (!this.first) {
            this.first = newNode;
        }
        else {
            this.last.next = newNode
        }
        this.last = newNode
    }
    public dequeue(): Producto | undefined {
        if (this.isEmpty()){
            return undefined;
        }
        const value = this.first.value;
        this.first = this.first.next;
        if (this.first === undefined) {
            this.last = undefined as unknown as MyNode<Producto>;
        }
        return value;
    }
        public isEmpty(): boolean {
            return this.first === undefined && this.last === undefined;
        }
}