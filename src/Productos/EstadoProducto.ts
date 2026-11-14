/**
 * Representa los diferentes estados por los que puede pasar un producto 
 * durante su proceso de preparación dentro del sistema.
 * 
 * @enum {string}
 * @readonly
 */
export enum EstadoProducto {
    /** El producto ha sido solicitado pero aún no ha comenzado a prepararse. */
    PENDIENTE,

    /** El producto se encuentra actualmente en proceso de preparación en la estación correspondiente. */
    EN_PREPARACION,

    /** El producto ha finalizado su preparación y está listo para ser entregado o servido. */
    LISTO
}