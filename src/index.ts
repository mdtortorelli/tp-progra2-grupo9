/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Barra } from "./Barra";
import { BilleteraVirtual } from "./BilleteraVirtual";
import { CategoriaMenu } from "./CategoriaMenu";
import { CategoriaProd } from "./CategoriaProd";
import { Cliente } from "./Cliente";
import { CocinaDulce } from "./CocinaDulce";
import { CocinaFria } from "./CocinaFria";
import { Combo } from "./Combo";
import { Debito } from "./Debito";
import { DescuentoFijo } from "./DescuentoFijo";
import { DiaSemana } from "./DiaSemana";
import { Efectivo } from "./Efectivo";
import { Envio } from "./Envio";
import { EstadoProducto } from "./EstadoProducto";
import { Menu } from "./Menu";
import { Mesa } from "./Mesa";
import { Parrilla } from "./Parrilla";
import { Producto } from "./Producto";
import { Restaurante } from "./Restaurante";
import { Retiro } from "./Retiro";
import { Salon } from "./Salon";

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
restaurante.agregarEstacion(parrilla);
restaurante.agregarEstacion(cocinaFria);
restaurante.agregarEstacion(barra);
restaurante.agregarEstacion(cocinaDulce);


const efectivo = new Efectivo(10, [DiaSemana.MARTES], 20);
const debito = new Debito([DiaSemana.MARTES], 15);
const billetera = new BilleteraVirtual([DiaSemana.MIERCOLES], 5);

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
salon.agregarItem(asado);
salon.agregarItem(parrillada);
salon.agregarItem(ensalada);
salon.agregarItem(flan);
salon.agregarItem(helado);
console.log("Items del salon:", salon.getItems().length);
salon.quitarItem(helado);
console.log("Items del salon despues de sacar el helado:", salon.getItems().length);
envio.agregarItem(agua);

console.log("Punto 3: deshacer la ultima modificacion ");
retiro.agregarItem(choripan);
retiro.agregarItem(jugoNaranja);
console.log("Items del retiro con el jugo equivocado:", retiro.getItems().length);
retiro.deshacerUltimaModificacion();
console.log("Items del retiro despues de deshacer:", retiro.getItems().length);
retiro.agregarItem(jugoManzana);
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

console.log("Punto 6: no se puede modificar ni cancelar un item en preparacion ");
try {
    salon.quitarItem(asado);
} catch (error) {
    console.log("Sacar el asado:", error.message);
}

parrilla.marcarListo(asado);
console.log("Estado del asado:", EstadoProducto[asado.getEstado()]);
parrilla.comenzarSiguiente();
parrilla.marcarListo(vacio);
parrilla.comenzarSiguiente();
parrilla.marcarListo(choripan);
cocinaFria.comenzarSiguiente();
cocinaFria.marcarListo(ensalada);
barra.comenzarSiguiente();
barra.marcarListo(gaseosa);
barra.comenzarSiguiente();
barra.marcarListo(jugoManzana);
barra.comenzarSiguiente();
barra.marcarListo(agua);
console.log("Pendientes en parrilla:", parrilla.obtenerPendientes().length);

console.log("Punto 7: no se factura hasta que todos los items esten listos ");
try {
    restaurante.facturarPedido(salon, efectivo, DiaSemana.MARTES);
} catch (error) {
    console.log("Facturar el salon:", error.message);
}
cocinaDulce.comenzarSiguiente();
cocinaDulce.marcarListo(flan);

console.log("Punto 8: precio de productos y combos ");
console.log("Asado:", asado.obtenerPrecio());
console.log("Combo parrillada sin descuento:", parrillada.obtenerPrecioSinDescuento());
console.log("Combo parrillada con descuento:", parrillada.obtenerPrecio());

console.log("Punto 9: cobrar segun el medio de pago con el mejor descuento ");
console.log("Salon en efectivo un martes:", restaurante.facturarPedido(salon, efectivo, DiaSemana.MARTES));
console.log("Retiro con debito un lunes:", restaurante.facturarPedido(retiro, debito, DiaSemana.LUNES));
console.log("Envio con billetera un miercoles:", restaurante.facturarPedido(envio, billetera, DiaSemana.MIERCOLES));

console.log("Punto 10: historial de pedidos finalizados ");
for (const pedido of restaurante.obtenerPedidosFinalizados()) {
    console.log("Items:", pedido.getItems().length, "- Cobrado:", pedido.getTotal());
}
