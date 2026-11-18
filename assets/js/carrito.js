// ==========================================
// 1. TIENDA: Agregar productos al localStorage
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("catalogo-productos")) return;
    const tarjetas = document.querySelectorAll(".mf-tarjeta");

    tarjetas.forEach(function (tarjeta) {
        const nombreEl = tarjeta.querySelector(".mf-tarjeta__nombre");
        const precioEl = tarjeta.querySelector(".mf-tarjeta__precio strong");
        const descEl = tarjeta.querySelector(".mf-tarjeta__descripcion") || tarjeta.querySelector("p");
        const cantidadSpan = tarjeta.querySelector(".mf-tarjeta__cantidad span");
        const botonesCantidad = tarjeta.querySelectorAll(".mf-tarjeta__cantidad button");
        const botonAgregar = tarjeta.querySelector(".mf-tarjeta__anadir");

        if (!nombreEl || !precioEl || !cantidadSpan || botonesCantidad.length < 2 || !botonAgregar) {
            return;
        }

        const nombre = nombreEl.textContent.trim();
        const descripcion = descEl ? descEl.textContent.trim() : "Producto MascotaFeliz";
        const precio = parseFloat(precioEl.textContent.replace("S/", "").trim()) || 0;
        let cantidad = 1;

        botonesCantidad[0].addEventListener("click", function () {
            if (cantidad > 1) {
                cantidad--;
                cantidadSpan.textContent = cantidad;
            }
        });

        botonesCantidad[1].addEventListener("click", function () {
            cantidad++;
            cantidadSpan.textContent = cantidad;
        });

        botonAgregar.addEventListener("click", function () {
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            const productoExistente = carrito.find(function (p) {
                return p.nombre === nombre;
            });

            if (productoExistente) {
                productoExistente.cantidad += cantidad;
            } else {
                carrito.push({
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    cantidad: cantidad
                });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
            cantidad = 1;
            cantidadSpan.textContent = "1";
        });
    });
});

// ==========================================
// 2. CARRITO: Mostrar tabla, calcular y eliminar
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const listaCarrito = document.getElementById("lista-carrito");
    const subtotalEl = document.getElementById("subtotal-compra");
    const envioEl = document.getElementById("envio-compra") || document.getElementById("costo-envio") || document.getElementById("envio");
    const totalEl = document.getElementById("total-compra");

    const COSTO_ENVIO = 10.00;

    function renderizarCarrito() {
        if (!listaCarrito) return;

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        listaCarrito.innerHTML = "";
        let subtotal = 0;

        if (carrito.length === 0) {
            const filaVacia = document.createElement("tr");
            const celdaVacia = document.createElement("td");
            celdaVacia.colSpan = 6;
            celdaVacia.textContent = "Tu carrito está vacío.";
            celdaVacia.style.textAlign = "center";
            celdaVacia.style.padding = "16px";
            filaVacia.appendChild(celdaVacia);
            listaCarrito.appendChild(filaVacia);
        } else {
            carrito.forEach(function (producto, index) {
                const precio = Number(producto.precio) || 0;
                const cantidad = Number(producto.cantidad) || 1;
                const subtotalProducto = precio * cantidad;
                subtotal += subtotalProducto;

                const fila = document.createElement("tr");

                const tdNombre = document.createElement("td");
                tdNombre.textContent = producto.nombre;

                const tdDescripcion = document.createElement("td");
                tdDescripcion.textContent = producto.descripcion || "Producto MascotaFeliz";

                const tdPrecio = document.createElement("td");
                tdPrecio.textContent = "S/ " + precio.toFixed(2);

                const tdCantidad = document.createElement("td");
                tdCantidad.textContent = cantidad;

                const tdSubtotal = document.createElement("td");
                tdSubtotal.textContent = "S/ " + subtotalProducto.toFixed(2);

                const tdAccion = document.createElement("td");
                const btnEliminar = document.createElement("button");
                btnEliminar.type = "button";
                btnEliminar.textContent = "Eliminar";
                btnEliminar.className = "btn-eliminar";
                btnEliminar.addEventListener("click", function () {
                    eliminarProducto(index);
                });
                tdAccion.appendChild(btnEliminar);

                fila.append(tdNombre, tdDescripcion, tdPrecio, tdCantidad, tdSubtotal, tdAccion);
                listaCarrito.appendChild(fila);
            });
        }

        const costoEnvioFinal = subtotal > 0 ? COSTO_ENVIO : 0;
        const totalFinal = subtotal + costoEnvioFinal;

        if (subtotalEl) subtotalEl.textContent = "S/ " + subtotal.toFixed(2);
        if (envioEl) envioEl.textContent = "S/ " + costoEnvioFinal.toFixed(2);
        if (totalEl) totalEl.textContent = "S/ " + totalFinal.toFixed(2);
    }

    function eliminarProducto(indice) {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(indice, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
    }

    renderizarCarrito();
});

// ==========================================
// 3. PAGO: Modal de finalizar compra
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const botonFinalizar = document.getElementById("btn-finalizar");
    const ventanaPago = document.getElementById("ventana-pago");
    const botonCerrar = document.getElementById("cerrar-pago");
    const metodoPago = document.getElementById("metodo-pago");
    const totalPago = document.getElementById("total-pago");
    const botonConfirmar = document.getElementById("confirmar-pago");

    if (botonFinalizar && ventanaPago && totalPago) {
        botonFinalizar.addEventListener("click", function () {
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            if (carrito.length === 0) {
                alert("Tu carrito está vacío. Agrega productos antes de continuar.");
                return;
            }
            const totalEl = document.getElementById("total-compra");
            totalPago.textContent = totalEl ? totalEl.textContent : "S/ 0.00";
            ventanaPago.style.display = "flex";
        });
    }

    if (botonCerrar && ventanaPago) {
        botonCerrar.addEventListener("click", function () {
            ventanaPago.style.display = "none";
        });
    }

    if (metodoPago) {
        metodoPago.addEventListener("change", function () {
            document.querySelectorAll(".opcion-pago").forEach(function (opcion) {
                opcion.style.display = "none";
            });
            if (metodoPago.value !== "") {
                const bloqueMetodo = document.getElementById("pago-" + metodoPago.value);
                if (bloqueMetodo) bloqueMetodo.style.display = "block";
            }
        });
    }

    if (botonConfirmar && metodoPago) {
        botonConfirmar.addEventListener("click", function () {
            if (metodoPago.value === "") {
                alert("Por favor, selecciona un método de pago.");
                return;
            }
            const metodo = metodoPago.options[metodoPago.selectedIndex].text;
            alert(
                "¡Pedido registrado correctamente!\n\n" +
                "Método de pago: " + metodo + "\n" +
                "Total: " + (totalPago ? totalPago.textContent : "")
            );
            localStorage.removeItem("carrito");
            window.location.href = "index.html";
        });
    }
});
