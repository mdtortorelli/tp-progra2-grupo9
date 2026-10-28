import { CategoriaProd } from "./CategoriaProd"
import { EstadoProducto } from "./EstadoProducto"
import { Producto } from "./Producto"
import { Queue } from "./Queue"

/**
 * Estación de trabajo de la cocina (parrilla, barra, etc.).
 * Recibe los productos de la categoría que sabe preparar y los atiende en el orden en que llegaron:
 * pendiente (en la cola) → en preparación → listo.
 *
 * Para sumar una estación nueva alcanza con crear una subclase que indique su nombre:
 * la lógica de la cola y de los estados ya está acá y no hay que tocar las demás estaciones.
 */
export abstract class Estacion {
    private nombre: string
    private categoria: CategoriaProd
    private colaProductos: Queue<Producto>
    private enPreparacion: Producto[]

    /**
     * @param {string} nombre - Nombre de la estación.
     * @param {CategoriaProd} categoria - Categoría de productos que prepara esta estación.
     */
    public constructor(nombre: string, categoria: CategoriaProd) {
        this.nombre = nombre
        this.categoria = categoria
        this.colaProductos = new Queue<Producto>()
        this.enPreparacion = []
    }

    /** @returns {string} Nombre de la estación. */
    public getNombre(): string {
        return this.nombre
    }

    /** @param {string} nombre - Nuevo nombre de la estación. */
    public setNombre(nombre: string): void {
        this.nombre = nombre
    }

    /** @returns {CategoriaProd} Categoría de productos que prepara la estación. */
    public getCategoria(): CategoriaProd {
        return this.categoria
    }

    /** @param {CategoriaProd} categoria - Nueva categoría que prepara la estación. */
    public setCategoria(categoria: CategoriaProd): void {
        this.categoria = categoria
    }

    /**
     * Indica si la estación puede preparar un producto, según su categoría.
     * @param {Producto} prod - Producto a evaluar.
     * @returns {boolean} `true` si el producto es de la categoría de la estación.
     */
    public puedePreparar(prod: Producto): boolean {
        return prod.getCategoria() === this.categoria
    }

    /**
     * Encola un producto para prepararlo. Queda pendiente hasta que la estación lo comience.
     * @param {Producto} prod - Producto a preparar.
     * @throws {Error} Si el producto no es de la categoría de la estación.
     */
    public recibir(prod: Producto): void {
        if (!this.puedePreparar(prod)) {
            throw new Error(`La estacion ${this.nombre} no puede preparar ${prod.getNombre()}`)
        }
        prod.setEstado(EstadoProducto.PENDIENTE)
        this.colaProductos.enqueue(prod)
    }

    /**
     * Toma el próximo producto pendiente (el que llegó primero) y lo pasa a "en preparación".
     * @returns {Producto | undefined} El producto comenzado, o `undefined` si no hay pendientes.
     */
    public comenzarSiguiente(): Producto | undefined {
        const siguiente = this.colaProductos.dequeue()
        if (siguiente !== undefined) {
            siguiente.setEstado(EstadoProducto.EN_PREPARACION)
            this.enPreparacion.push(siguiente)
        }
        return siguiente
    }

    /**
     * Marca como listo un producto que la estación está preparando.
     * @param {Producto} prod - Producto a finalizar.
     * @throws {Error} Si el producto no está en preparación en esta estación.
     */
    public marcarListo(prod: Producto): void {
        if (!this.estaEnPreparacion(prod)) {
            throw new Error("El producto no se encuentra en preparacion en esta estacion")
        }
        const siguenEnPreparacion: Producto[] = []
        for (const enCurso of this.enPreparacion) {
            if (enCurso !== prod) {
                siguenEnPreparacion.push(enCurso)
            }
        }
        this.enPreparacion = siguenEnPreparacion
        prod.setEstado(EstadoProducto.LISTO)
    }

    /**
     * Indica si un producto se está preparando en esta estación.
     * @param {Producto} prod - Producto a buscar.
     * @returns {boolean} `true` si el producto está en preparación acá.
     */
    private estaEnPreparacion(prod: Producto): boolean {
        for (const enCurso of this.enPreparacion) {
            if (enCurso === prod) {
                return true
            }
        }
        return false
    }

    /**
     * @returns {Producto[]} Productos pendientes, en el orden en que llegaron (no modifica la cola).
     */
    public obtenerPendientes(): Producto[] {
        return this.colaProductos.toArray()
    }

    /** @returns {Producto[]} Productos que la estación está preparando en este momento. */
    public obtenerEnPreparacion(): Producto[] {
        const copia: Producto[] = []
        for (const prod of this.enPreparacion) {
            copia.push(prod)
        }
        return copia
    }
}
