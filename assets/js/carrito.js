//Carrito
document.addEventListener("DOMContentLoaded", function () {

    // Seleccionar todas las tarjetas de productos
    const tarjetas = document.querySelectorAll(".mf-tarjeta");

    tarjetas.forEach(function (tarjeta) {

        // Obtener nombre del producto
        const nombre = tarjeta.querySelector(".mf-tarjeta__nombre").textContent.trim();

        // Obtener precio
        const precioTexto = tarjeta.querySelector(".mf-tarjeta__precio strong").textContent;
        const precio = parseFloat(precioTexto.replace("S/", "").trim());

        // Obtener elementos de cantidad
        const cantidadSpan = tarjeta.querySelector(".mf-tarjeta__cantidad span");
        const botonesCantidad = tarjeta.querySelectorAll(".mf-tarjeta__cantidad button");

        // Botón añadir
        const botonAgregar = tarjeta.querySelector(".mf-tarjeta__anadir");

        // Cantidad inicial
        let cantidad = 1;

        // Botón disminuir cantidad
        botonesCantidad[0].addEventListener("click", function () {

            if (cantidad > 1) {
                cantidad--;
                cantidadSpan.textContent = cantidad;
            }

        });

        // Botón aumentar cantidad
        botonesCantidad[1].addEventListener("click", function () {

            cantidad++;
            cantidadSpan.textContent = cantidad;

        });

        // Botón añadir al carrito
        botonAgregar.addEventListener("click", function () {

            // Leer carrito guardado
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            // Buscar si el producto ya existe
            let productoExistente = carrito.find(function (producto) {
                return producto.nombre === nombre;
            });

            if (productoExistente) {

                // Si existe, aumentar cantidad
                productoExistente.cantidad += cantidad;

            } else {

                // Si no existe, agregar producto
                carrito.push({
                    nombre: nombre,
                    precio: precio,
                    cantidad: cantidad
                });

            }

            // Guardar en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));

            // Mostrar confirmación
            alert("¡" + nombre + " agregado al carrito! 🛒");

            console.log("Carrito guardado:", carrito);

            // Reiniciar cantidad
            cantidad = 1;
            cantidadSpan.textContent = "1";

        });

    });

});

//pestaña de pagos
document.addEventListener("DOMContentLoaded", function () {

    const botonFinalizar = document.getElementById("btn-finalizar");
    const ventanaPago = document.getElementById("ventana-pago");
    const botonCerrar = document.getElementById("cerrar-pago");
    const metodoPago = document.getElementById("metodo-pago");
    const totalPago = document.getElementById("total-pago");
    const botonConfirmar = document.getElementById("confirmar-pago");

    // Abrir ventana de pago
    botonFinalizar.addEventListener("click", function () {

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        if (carrito.length === 0) {
            alert("Tu carrito está vacío. Agrega productos antes de continuar.");
            return;
        }

        const total = document.getElementById("total-compra").textContent;

        totalPago.textContent = total;
        ventanaPago.style.display = "flex";
    });

    // Cerrar ventana
    botonCerrar.addEventListener("click", function () {
        ventanaPago.style.display = "none";
    });

    // Mostrar información del método seleccionado
    metodoPago.addEventListener("change", function () {

        document.querySelectorAll(".opcion-pago").forEach(function (opcion) {
            opcion.style.display = "none";
        });

        if (metodoPago.value !== "") {
            document.getElementById("pago-" + metodoPago.value).style.display = "block";
        }

    });

    // Confirmar pedido
    botonConfirmar.addEventListener("click", function () {

        if (metodoPago.value === "") {
            alert("Por favor, selecciona un método de pago.");
            return;
        }

        const metodo = metodoPago.options[metodoPago.selectedIndex].text;

        alert(
            "¡Pedido registrado correctamente!\n\n" +
            "Método de pago: " + metodo + "\n" +
            "Total: " + totalPago.textContent
        );

        // Vaciar carrito después de confirmar
        localStorage.removeItem("carrito");

        // Recargar carrito
        location.reload();

    });

});


// catalogo
document.addEventListener("DOMContentLoaded", function () {

    // Leer productos guardados
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Obtener elementos HTML
    const tabla = document.querySelector("#lista-carrito");
    const subtotalHTML = document.querySelector("#subtotal-general");
    const envioHTML = document.querySelector("#costo-envio");
    const totalHTML = document.querySelector("#total-compra");
    const mensajeVacio = document.querySelector("#mensaje-vacio");

    // Costo de envío
    const envio = 10;

    // Función para mostrar productos
    function mostrarCarrito() {

        // Limpiar tabla
        tabla.textContent = "";

        // Verificar si está vacío
        if (carrito.length === 0) {

            mensajeVacio.style.display = "block";

            subtotalHTML.textContent = "S/ 0.00";
            envioHTML.textContent = "S/ 0.00";
            totalHTML.textContent = "S/ 0.00";

            return;
        }

        mensajeVacio.style.display = "none";

        // Suma del subtotal general
        let subtotalGeneral = 0;

        // Recorrer productos
        carrito.forEach(function (producto, index) {

            // Crear fila
            const fila = document.createElement("tr");

            // Nombre
            const tdNombre = document.createElement("td");
            tdNombre.textContent = producto.nombre;

            // Descripción
            const tdDescripcion = document.createElement("td");
            tdDescripcion.textContent = "Producto para mascota";

            // Precio
            const tdPrecio = document.createElement("td");
            tdPrecio.textContent = "S/ " + Number(producto.precio).toFixed(2);

            // Cantidad
            const tdCantidad = document.createElement("td");

            const inputCantidad = document.createElement("input");
            inputCantidad.type = "number";
            inputCantidad.min = "1";
            inputCantidad.value = producto.cantidad;

            tdCantidad.appendChild(inputCantidad);

            // Subtotal del producto
            const tdSubtotal = document.createElement("td");

            const subtotalProducto =
                Number(producto.precio) * Number(producto.cantidad);

            tdSubtotal.textContent = "S/ " + subtotalProducto.toFixed(2);

            // Sumar subtotal
            subtotalGeneral += subtotalProducto;

            // Acciones
            const tdAccion = document.createElement("td");

            const botonEliminar = document.createElement("button");
            botonEliminar.type = "button";
            botonEliminar.textContent = "Eliminar";

            // Eliminar producto
            botonEliminar.addEventListener("click", function () {

                carrito.splice(index, 1);

                localStorage.setItem("carrito", JSON.stringify(carrito));

                mostrarCarrito();

            });

            // Cambiar cantidad
            inputCantidad.addEventListener("change", function () {

                let nuevaCantidad = parseInt(inputCantidad.value);

                if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
                    nuevaCantidad = 1;
                }

                carrito[index].cantidad = nuevaCantidad;

                localStorage.setItem("carrito", JSON.stringify(carrito));

                mostrarCarrito();

            });

            tdAccion.appendChild(botonEliminar);

            // Agregar celdas a la fila
            fila.appendChild(tdNombre);
            fila.appendChild(tdDescripcion);
            fila.appendChild(tdPrecio);
            fila.appendChild(tdCantidad);
            fila.appendChild(tdSubtotal);
            fila.appendChild(tdAccion);

            // Agregar fila a tabla
            tabla.appendChild(fila);

        });

        // Calcular total
        const total = subtotalGeneral + envio;

        // Mostrar resumen
        subtotalHTML.textContent = "S/ " + subtotalGeneral.toFixed(2);
        envioHTML.textContent = "S/ " + envio.toFixed(2);
        totalHTML.textContent = "S/ " + total.toFixed(2);

    }

    // Mostrar al cargar la página
    mostrarCarrito();

});