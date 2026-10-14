import { Estacion } from "./Estacion";
import { EstadoPedido } from "./EstadoPedido";
import { Menu } from "./Menu";
import MetodoPago from "./MetodoPago";
import { Pedido } from "./Pedido";
import { Producto } from "./Producto";

export class Restaurante {
    private menu: Menu
    private pedidosTotales: Pedido[]
    private estaciones: Estacion[]

    constructor(menu:Menu, pedidosTotales:Pedido[], estaciones:Estacion[]){
        this.menu=menu
        this.pedidosTotales=pedidosTotales
        this.estaciones=estaciones
    }


    public getMenu():Menu{
        return this.menu
    }

    public setMenu(menu:Menu):void{

        this.menu=menu
    }

    public getPedidosTotales():Pedido[]{
        return this.pedidosTotales
    }

    public getEstaciones():Estacion[]{
        return this.estaciones
    }

    //Mejora: Crear errores para cada tipo de error
    public registrarPedido(pedido:Pedido):void{

        if (!pedido) {
            throw new Error("El pedido es obligatorio");
        }
        if (this.pedidosTotales.includes(pedido)) {
            throw new Error("El pedido ya esta registrado");
        }
        if (pedido.getEstado() !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("Solo se pueden registrar pedidos que esten en construccion");
        }
        this.pedidosTotales.push(pedido);

    }

    public agregarEstacion(estacion: Estacion): void {
        if (!estacion) {
            throw new Error("La estacion es obligatoria");
        }
        if (this.estaciones.includes(estacion)) {
            throw new Error("La estacion ya esta registrada y no se puede agregar");
        }
        this.estaciones.push(estacion);
    }

    public buscarEstacionPara(producto: Producto): Estacion {
        const estacionEncontrada = this.estaciones.find((e) =>
            e.puedePreparar(producto)
        );
        if (!estacionEncontrada) {
            throw new Error("No hay estacion que pueda preparar este producto")
        }
        return estacionEncontrada;
    }

    //Hablar con los chicos para revisar metodos y demas para que el restaurante pueda facturar bien (Nuevo estaod de pedido en el enum, un metood para ver si el item esta listo y que realizarPago devuelva el monto)
    public facturarPedido(pedido: Pedido, metodoPago: MetodoPago): number {
        if (!this.pedidosTotales.includes(pedido)) {
            throw new Error("El pedido no está registrado en el restaurante");
        }
        if (!metodoPago) {
            throw new Error("El medio de pago es obligatorio");
        }
        if (pedido.getEstado() !== EstadoPedido.CONFIRMADO) {
            throw new Error("Solo se pueden facturar pedidos confirmados");
        }
        if (!pedido.estaListo()) { 
            throw new Error("No se puede facturar: hay ítems que no están listos");
        }

        pedido.setMetodoDePago(metodoPago);
        const montoCobrado = metodoPago.realizarPago(pedido); 
        pedido.setEstado(EstadoPedido.FACTURADO); 

        return montoCobrado;
    }

    //Ver de agregar u nuevo elemento en el enum para tener un estado mas descriptivo
    public obtenerPedidosFinalizados(): Pedido[] {
        return this.pedidosTotales.filter((pedido) => pedido.getEstado() === EstadoPedido.ENVIADO)
    }



}