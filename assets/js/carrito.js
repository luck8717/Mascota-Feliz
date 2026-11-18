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


