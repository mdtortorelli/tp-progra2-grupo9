# 🍽️ Sistema de Gestión de Pedidos - "Fogón del Barrio"

Trabajo Práctico — Programación II - Grupo 9  
**Tecnologías:** TypeScript, Jest (Pruebas Unitarias)

---

## 📌 Descripción del Proyecto

"Fogón del Barrio" es un restaurante tradicional que operaba mediante toma de pedidos manual en papel. Este proyecto consiste en el desarrollo de un sistema informático robusto en **TypeScript** para digitalizar de punta a punta la gestión del negocio: desde la creación de pedidos en sus distintas modalidades, su preparación independiente en estaciones de cocina distribuidas, hasta el control de stock, aplicación de beneficios/descuentos y facturación final.

---

## 🚀 Características Principales (Requerimientos Funcionales)

1. **Modalidades de Pedido:** Soporta pedidos en **Salón** (asociados a una mesa), para **Retirar** (con horario pactado) y con **Envío Propio** (con dirección y costo de envío), diseñado de forma extensible para incorporar nuevas modalidades a futuro.
2. **Gestión de Menú y Combos:** Administración de productos individuales por categorías y combos flexibles (con descuentos porcentuales o precios fijos cerrados).
3. **Construcción y Corrección de Pedidos:** Permite agregar/quitar ítems de a uno mientras el pedido está "en construcción", soportando operaciones de **deshacer (undo)** para corregir errores rápidamente antes de confirmarlo.
4. **Distribución a Estaciones de Cocina:** Al confirmar un pedido, sus ítems se derivan de forma automática e independiente a las estaciones correspondientes (parrilla, cocina fría, barra, pastelería, etc.) respetando el orden de llegada.
5. **Control de Estados y Bloqueos:** 
   * Los ítems transitan por los estados: `pendiente` $\rightarrow$ `en preparación` $\rightarrow$ `listo`.
   * Un ítem en estado `en preparación` no puede ser modificado ni cancelado.
   * Ningún pedido puede facturarse si posee ítems pendientes o en preparación.
6. **Medios de Pago y Descuentos Dinámicos:** Cálculo de subtotales y totales aplicando el medio de pago elegido (Efectivo, Tarjetas, Billetera virtual) y seleccionando automáticamente el descuento más beneficioso para el cliente entre múltiples opciones aplicables (por pago en efectivo o días especiales).
7. **Historial de Pedidos:** Consulta permanente del historial de pedidos finalizados con el detalle de lo cobrado.

---

## 🛠️ Estructura del Repositorio y Arquitectura

El diseño interno de clases prioriza principios SOLID, alta cohesión y bajo acoplamiento para garantizar la escalabilidad (creación de nuevas estaciones o modalidades sin modificar la lógica existente).

* `src/` - Contiene el código fuente del dominio y la lógica de negocio.
* `tests/` - Pruebas unitarias desarrolladas con Jest.
* `src/integration/` - Clase de integración requerida para la ejecución de pruebas automatizadas estandarizadas.

---

## 🧪 Pruebas Unitarias y Calidad de Código

El proyecto cuenta con una cobertura de pruebas unitarias superior al **80%**, garantizando el correcto funcionamiento de cada regla de negocio.

Para ejecutar las pruebas y verificar la cobertura, utiliza los siguientes comandos:


# Instalar dependencias
npm install

# Ejecutar pruebas y verificar porcentaje de cobertura
npm run test

# Compilar Solución
npm run build

# Ejecutar index
npm run start
