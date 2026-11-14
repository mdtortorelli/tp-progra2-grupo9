import { CategoriaProd } from "../Productos/CategoriaProd"
import { ItemPedido } from "../Productos/ItemPedido"
import { Queue } from "../Utils/Queue"

/**
 * Estación de trabajo de la cocina (parrilla, barra, etc.).
 * Recibe los ítems de la categoría que sabe preparar y los atiende en el orden en que llegaron:
 * pendiente (en la cola) → en preparación → listo.
 * Trabaja sobre {@link ItemPedido}, así el estado de preparación es de cada ítem pedido
 * y no del producto del menú.
 *
 * Las estaciones forman una cadena (patrón Chain of Responsibility): cada una conoce a la siguiente.
 * Cuando una estación recibe un ítem que no puede preparar, se lo pasa a la siguiente.
 * Para sumar una estación nueva alcanza con crear una subclase y agregarla a la cadena,
 * sin tocar las demás estaciones.
 */
export abstract class Estacion {
    private nombre: string
    private categoria: CategoriaProd
    private colaItems: Queue<ItemPedido>
    private enPreparacion: ItemPedido[]
    private siguiente: Estacion | undefined

    /**
     * @param {string} nombre - Nombre de la estación.
     * @param {CategoriaProd} categoria - Categoría de productos que prepara esta estación.
     */
    public constructor(nombre: string, categoria: CategoriaProd) {
        this.nombre = nombre
        this.categoria = categoria
        this.colaItems = new Queue<ItemPedido>()
        this.enPreparacion = []
        this.siguiente = undefined
    }

    /** @returns {Estacion | undefined} La siguiente estación de la cadena, o `undefined` si es la última. */
    public getSiguiente(): Estacion | undefined {
        return this.siguiente
    }

    /** @param {Estacion} siguiente - Estación a la que se le pasan los ítems que esta no puede preparar. */
    public setSiguiente(siguiente: Estacion): void {
        this.siguiente = siguiente
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
     * Indica si la estación puede preparar un ítem: todos sus productos tienen que ser de su categoría.
     * @param {ItemPedido} itemPedido - Ítem a evaluar.
     * @returns {boolean} `true` si la estación puede prepararlo.
     */
    public puedePreparar(itemPedido: ItemPedido): boolean {
        for (const producto of itemPedido.getItem().obtenerProductos()) {
            if (producto.getCategoria() !== this.categoria) {
                return false
            }
        }
        return true
    }

    /**
     * Recibe un ítem. Si la estación puede prepararlo, lo encola como pendiente;
     * si no, se lo pasa a la siguiente estación de la cadena.
     * @param {ItemPedido} itemPedido - Ítem a preparar.
     * @throws {Error} Si ninguna estación de la cadena puede prepararlo.
     */
    public recibir(itemPedido: ItemPedido): void {
        if (this.puedePreparar(itemPedido)) {
            this.colaItems.enqueue(itemPedido)
            return
        }
        if (this.siguiente === undefined) {
            throw new Error("No hay estacion que pueda preparar el item")
        }
        this.siguiente.recibir(itemPedido)
    }

    /**
     * Toma el próximo ítem pendiente (el que llegó primero) y lo pasa a "en preparación".
     * @returns {ItemPedido | undefined} El ítem comenzado, o `undefined` si no hay pendientes.
     */
    public comenzarSiguiente(): ItemPedido | undefined {
        const siguienteItem = this.colaItems.dequeue()
        if (siguienteItem !== undefined) {
            siguienteItem.iniciar()
            this.enPreparacion.push(siguienteItem)
        }
        return siguienteItem
    }

    /**
     * Marca como listo un ítem que la estación está preparando.
     * @param {ItemPedido} itemPedido - Ítem a finalizar.
     * @throws {Error} Si el ítem no está en preparación en esta estación.
     */
    public marcarListo(itemPedido: ItemPedido): void {
        if (!this.estaEnPreparacion(itemPedido)) {
            throw new Error("El item no se encuentra en preparacion en esta estacion")
        }
        const siguenEnPreparacion: ItemPedido[] = []
        for (const enCurso of this.enPreparacion) {
            if (enCurso !== itemPedido) {
                siguenEnPreparacion.push(enCurso)
            }
        }
        this.enPreparacion = siguenEnPreparacion
        itemPedido.finalizar()
    }

    /**
     * Indica si un ítem se está preparando en esta estación.
     * @param {ItemPedido} itemPedido - Ítem a buscar.
     * @returns {boolean} `true` si el ítem está en preparación acá.
     */
    private estaEnPreparacion(itemPedido: ItemPedido): boolean {
        for (const enCurso of this.enPreparacion) {
            if (enCurso === itemPedido) {
                return true
            }
        }
        return false
    }

    /**
     * @returns {ItemPedido[]} Ítems pendientes, en el orden en que llegaron (no modifica la cola).
     */
    public obtenerPendientes(): ItemPedido[] {
        return this.colaItems.toArray()
    }

    /** @returns {ItemPedido[]} Ítems que la estación está preparando en este momento. */
    public obtenerEnPreparacion(): ItemPedido[] {
        const copia: ItemPedido[] = []
        for (const itemPedido of this.enPreparacion) {
            copia.push(itemPedido)
        }
        return copia
    }
}
