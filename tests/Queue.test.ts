import { Queue } from '../src/Queue';

describe('Queue', () => {
  let cola: Queue<string>;

  beforeEach(() => {
    cola = new Queue<string>();
  });

  it('una cola nueva está vacía', () => {
    expect(cola.isEmpty()).toBe(true);
    expect(cola.size()).toBe(0);
    expect(cola.peek()).toBeUndefined();
    expect(cola.toArray()).toEqual([]);
  });

  it('dequeue en una cola vacía devuelve undefined', () => {
    expect(cola.dequeue()).toBeUndefined();
  });

  it('respeta el orden de llegada (FIFO)', () => {
    cola.enqueue('asado');
    cola.enqueue('ensalada');
    cola.enqueue('flan');

    expect(cola.dequeue()).toBe('asado');
    expect(cola.dequeue()).toBe('ensalada');
    expect(cola.dequeue()).toBe('flan');
    expect(cola.isEmpty()).toBe(true);
  });

  it('peek devuelve el primero sin sacarlo', () => {
    cola.enqueue('asado');
    cola.enqueue('flan');

    expect(cola.peek()).toBe('asado');
    expect(cola.size()).toBe(2);
  });

  it('toArray devuelve los elementos en orden sin modificar la cola', () => {
    cola.enqueue('asado');
    cola.enqueue('flan');

    expect(cola.toArray()).toEqual(['asado', 'flan']);
    expect(cola.size()).toBe(2);
    expect(cola.dequeue()).toBe('asado');
  });

  it('se puede volver a usar despues de vaciarse', () => {
    cola.enqueue('asado');
    cola.dequeue();
    cola.enqueue('flan');

    expect(cola.size()).toBe(1);
    expect(cola.toArray()).toEqual(['flan']);
  });
});
