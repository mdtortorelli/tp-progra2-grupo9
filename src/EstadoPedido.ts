/**
 * Representa los diferentes estados por los que puede atravesar un pedido 
 * a lo largo de su ciclo de vida dentro del sistema.
 * 
 * @enum {string}
 * @readonly
 */
export enum EstadoPedido {
    /** El pedido se encuentra en proceso de armado o construcción (aún no ha sido confirmado). */
    EN_CONSTRUCCION,

    /** El pedido ha sido confirmado formalmente por el cliente o el sistema. */
    CONFIRMADO,

    /** El pedido ha sido despachado y se encuentra en camino hacia su destino. */
    ENVIADO
}