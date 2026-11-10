/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Barra } from "./Cocina/Barra";
import { BilleteraVirtual } from "./MediosDePago/BilleteraVirtual";
import { CategoriaMenu } from "./Productos/CategoriaMenu";
import { CategoriaProd } from "./Productos/CategoriaProd";
import { Cliente } from "./Restaurante/Cliente";
import { CocinaDulce } from "./Cocina/CocinaDulce";
import { CocinaFria } from "./Cocina/CocinaFria";
import { Combo } from "./Productos/Combo";
import { Debito } from "./MediosDePago/Debito";
import { DescuentoFijo } from "./Beneficios/DescuentoFijo";
import { DiaSemana } from "./Utils/DiaSemana";
import { Efectivo } from "./MediosDePago/Efectivo";
import { Envio } from "./Pedidos/Envio";
import { EstadoProducto } from "./Productos/EstadoProducto";
import { ItemPedido } from "./Productos/ItemPedido";
import { Menu } from "./Productos/Menu";
import { Mesa } from "./Pedidos/Mesa";
import { Parrilla } from "./Cocina/Parrilla";
import { Producto } from "./Productos/Producto";
import { Restaurante } from "./Restaurante/Restaurante";
import { Retiro } from "./Pedidos/Retiro";
import { Salon } from "./Pedidos/Salon";

const asado = new Producto("Asado", 9000, CategoriaProd.CARNE);
const vacio = new Producto("Vacio", 8500, CategoriaProd.CARNE);
const choripan = new Producto("Choripan", 3500, CategoriaProd.CARNE);
const ensalada = new Producto("Ensalada", 4000, CategoriaProd.ENSALADA);
const gaseosa = new Producto("Gaseosa", 1500, CategoriaProd.BEBIDA);
const jugoNaranja = new Producto("Jugo de naranja", 1800, CategoriaProd.BEBIDA);
const jugoManzana = new Producto("Jugo de manzana", 1800, CategoriaProd.BEBIDA);
const agua = new Producto("Agua", 1200, CategoriaProd.BEBIDA);
const flan = new Producto("Flan", 3000, CategoriaProd.POSTRE);
const helado = new Producto("Helado", 2500, CategoriaProd.POSTRE);
const parrillada = new Combo([vacio, gaseosa], new DescuentoFijo(1000));

const menu = new Menu(new CategoriaMenu([asado, choripan, ensalada, jugoNaranja, jugoManzana, agua, flan, helado]),
    [parrillada]);
const restaurante = new Restaurante(menu);
const parrilla = new Parrilla();
const cocinaFria = new CocinaFria();
const barra = new Barra();
const cocinaDulce = new CocinaDulce();
restaurante.setEstacion(parrilla);
restaurante.setEstacion(cocinaFria);
restaurante.setEstacion(barra);
restaurante.setEstacion(cocinaDulce);


const efectivo = new Efectivo(20);
const debito = new Debito(15);
const billetera = new BilleteraVirtual(5);

console.log("Punto 1: registrar un pedido en cada modalidad ");
const salon = new Salon(new Cliente(), efectivo, new Mesa(5));
const retiro = new Retiro(new Cliente(), debito, new Date(2026, 9, 23, 21, 30));
const envio = new Envio(new Cliente(), billetera, "Av. Siempre Viva 742", 1500);
restaurante.registrarPedido(salon);
restaurante.registrarPedido(retiro);
restaurante.registrarPedido(envio);
console.log("Mesa del salon:", salon.getMesa().getNumero());
console.log("Horario de retiro:", retiro.getHorarioRetiro().getHours(), "hs");
console.log("Direccion y costo del envio:", envio.getDireccion(), envio.getCosto());
console.log("Pedidos registrados:", restaurante.getPedidosTotales().length);

console.log("Punto 2: agregar y sacar productos y combos ");
salon.agregarItem(new ItemPedido(asado,1));
salon.agregarItem(new ItemPedido(parrillada,1));
salon.agregarItem(new ItemPedido(ensalada,1));
salon.agregarItem(new ItemPedido(flan,1));
salon.agregarItem(new ItemPedido(helado,1));
console.log("Items del salon:", salon.getItems().length);
salon.quitarItem(new ItemPedido(helado,1));
console.log("Items del salon despues de sacar el helado:", salon.getItems().length);
envio.agregarItem(new ItemPedido(agua,1));

console.log("Punto 3: deshacer la ultima modificacion ");
retiro.agregarItem(new ItemPedido(choripan,1));
retiro.agregarItem(new ItemPedido(jugoNaranja,1));
console.log("Items del retiro con el jugo equivocado:", retiro.getItems().length);
retiro.deshacerUltimaModificacion();
console.log("Items del retiro despues de deshacer:", retiro.getItems().length);
retiro.agregarItem(new ItemPedido(jugoManzana,1));
console.log("Items del retiro con el jugo correcto:", retiro.getItems().length);

console.log("Punto 4: confirmar y distribuir a las estaciones ");

restaurante.confirmarPedido(salon);
restaurante.confirmarPedido(retiro);
restaurante.confirmarPedido(envio);
console.log("Pendientes en parrilla:", parrilla.obtenerPendientes().length);
console.log("Pendientes en cocina fria:", cocinaFria.obtenerPendientes().length);
console.log("Pendientes en barra:", barra.obtenerPendientes().length);
console.log("Pendientes en cocina dulce:", cocinaDulce.obtenerPendientes().length);

console.log("Punto 5: cada estacion procesa en orden de llegada ");
parrilla.comenzarSiguiente();
console.log("Estado del asado:", EstadoProducto[asado.getEstado()]);

const itemAsado = new ItemPedido(asado,1);
const itemVacio = new ItemPedido(vacio,1);
const itemEnsalada = new ItemPedido(ensalada,1);
const itemChoripan = new ItemPedido(choripan,1);
const itemGaseosa = new ItemPedido(gaseosa,1);
const itemJugoManzana = new ItemPedido(jugoManzana,1);
const itemAgua = new ItemPedido(agua,1);
const itemFlan = new ItemPedido(flan,1);


console.log("Punto 6: no se puede modificar ni cancelar un item en preparacion ");
try {
    salon.quitarItem(itemAsado);
} catch (error) {
    console.log("Sacar el asado:", error.message);
}

parrilla.marcarListo(itemAsado);
console.log("Estado del asado:", EstadoProducto[asado.getEstado()]);
parrilla.comenzarSiguiente();
parrilla.marcarListo(itemVacio);
parrilla.comenzarSiguiente();
parrilla.marcarListo(itemChoripan);
cocinaFria.comenzarSiguiente();
cocinaFria.marcarListo(itemEnsalada);
barra.comenzarSiguiente();
barra.marcarListo(itemGaseosa);
barra.comenzarSiguiente();
barra.marcarListo(itemJugoManzana);
barra.comenzarSiguiente();
barra.marcarListo(itemAgua);
console.log("Pendientes en parrilla:", parrilla.obtenerPendientes().length);

console.log("Punto 7: no se factura hasta que todos los items esten listos ");
try {
    restaurante.facturarPedido(salon, efectivo, DiaSemana.MARTES);
} catch (error) {
    console.log("Facturar el salon:", error.message);
}
cocinaDulce.comenzarSiguiente();
cocinaDulce.marcarListo(itemFlan);

console.log("Punto 8: precio de productos y combos ");
console.log("Asado:", asado.obtenerPrecio());
console.log("Combo parrillada sin descuento:", parrillada.obtenerPrecioSinDescuento());
console.log("Combo parrillada con descuento:", parrillada.obtenerPrecio());

console.log("Punto 9: cobrar segun el medio de pago con el mejor descuento ");
salon.obtenerEstadosItems();
//console.log("Salon en efectivo un martes:", restaurante.facturarPedido(salon, efectivo, DiaSemana.MARTES));
//console.log("Retiro con debito un lunes:", restaurante.facturarPedido(retiro, debito, DiaSemana.LUNES));
//console.log("Envio con billetera un miercoles:", restaurante.facturarPedido(envio, billetera, DiaSemana.MIERCOLES));

console.log("Punto 10: historial de pedidos finalizados ");
for (const pedido of restaurante.obtenerPedidosFinalizados()) {
    console.log("Items:", pedido.getItems().length, "- Cobrado:", pedido.getTotal());
}
