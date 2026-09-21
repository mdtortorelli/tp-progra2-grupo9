import { CategoriaProd } from "./CategoriaProd"
import { EstadoProducto } from "./EstadoProducto"
import { Producto } from "./Producto"
import { Queue } from "./Queue"

export abstract class Estacion {
    private nombre:string
    private categoria:CategoriaProd
    private colaProductos:Queue<Producto>

    constructor();
    constructor(nombre?:string,categoria?:CategoriaProd,colaProducto?:Queue<Producto>) {
        this.nombre=nombre ?? ""
        this.categoria=categoria ?? CategoriaProd
        this.colaProductos = new Queue<Producto>()
    }

    public getNombre():string{
        return this.nombre
    }

    public setNombre(nombre:string):void {
        this.nombre=nombre
    }

    public getCategoria():CategoriaProd {
        return this.categoria
    }

    public setCategoria(categoria:CategoriaProd):void{
        this.categoria=categoria
    }

    public recibir(prod:Producto):void{
        this.colaProductos.enqueue(prod)
    }

    public abstract puedePreparar(prod:Producto):boolean;


    //Preguntar al profe si es mejor crear una cola por cada tipo de estado de producto
    //En esta funcion nos serviria tambien para que primeroCola no lo perdamos de la queue y lo guardemos en otro lugar (Alguna cola interna?!)
    public comenzarSiguiente():Producto | undefined{
        let primeroCola:Producto | undefined 
        
        primeroCola = this.colaProductos.dequeue()
        primeroCola?.setEstado(EstadoProducto.EN_PREPARAION)

        return primeroCola
    }

    public marcarListo(prod:Producto):void {
        if(prod.getEstado() === EstadoProducto.EN_PREPARAION){
            prod.setEstado(EstadoProducto.LISTO)
        }else{
            throw new Error("El producto no se encuentra en preparacion")
        }
    }

    //Ver que onda la pregunta anterior para ver si aca tambien aplicar una cola en vez de una array
    public obtenerPendientes(): Producto[] {
        const ArrayTemporal:Producto[] = []
        let itemCola:Producto | undefined

        while(!this.colaProductos.isEmpty()){
            itemCola = this.colaProductos.dequeue()
            if (itemCola !== undefined) {
                ArrayTemporal.push(itemCola)
            }
        }  

        const resultado = ArrayTemporal

        let itemArray: Producto | undefined

        while(ArrayTemporal.length > 0){
            itemArray = ArrayTemporal.shift()
            if (itemArray !== undefined) {
                this.colaProductos.enqueue(itemArray)
            }
        }

        return resultado
    }
    

}