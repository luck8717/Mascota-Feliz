import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function Carrito() {

  const navigate = useNavigate();

  const {
    carrito,
    eliminarProducto,
    cambiarCantidad,
    subtotal,
    costoEnvio,
    total,
    vaciarCarrito
  } = useCarrito();

  const [mostrarPago, setMostrarPago] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");

  const formato = (numero) => `S/ ${numero.toFixed(2)}`;

  // Abrir ventana de pago
  const finalizarCompra = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de continuar.");
      return;
    }

    setMostrarPago(true);
  };

  // Confirmar pedido
  const confirmarPago = () => {

    if (!metodoPago) {
      alert("Por favor, selecciona un método de pago.");
      return;
    }

    const metodos = {
      tarjeta: "Tarjeta de crédito o débito",
      yape: "Yape",
      plin: "Plin",
      contraentrega: "Pago contra entrega"
    };

    alert(
      "¡Pedido registrado correctamente!\n\n" +
      "Método de pago: " + metodos[metodoPago] + "\n" +
      "Total: " + formato(total)
    );

    vaciarCarrito();
    setMostrarPago(false);
    setMetodoPago("");

    navigate("/");
  };

  return (
    <main className="contenedor carrito-pagina">

      <section>
        <h1>🛒 Mi carrito de compras</h1>
        <p>
          Revisa los productos que deseas comprar para tu mascota.
        </p>
      </section>

      <section className="tabla-carrito">

        <h2>Productos seleccionados</h2>

        <div className="tabla-responsive">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>

              {carrito.length === 0 ? (

                <tr>
                  <td colSpan="6" className="carrito-vacio">
                    Tu carrito está vacío.
                  </td>
                </tr>

              ) : (

                carrito.map((producto, index) => (

                  <tr key={producto.nombre}>

                    <td>{producto.nombre}</td>

                    <td>
                      {producto.descripcion || "Producto MascotaFeliz"}
                    </td>

                    <td>
                      {formato(Number(producto.precio))}
                    </td>

                    <td>
                      <div className="cantidad-control">

                        <button
                          onClick={() =>
                            cambiarCantidad(
                              index,
                              producto.cantidad - 1
                            )
                          }
                          disabled={producto.cantidad <= 1}
                        >
                          -
                        </button>

                        <span>{producto.cantidad}</span>

                        <button
                          onClick={() =>
                            cambiarCantidad(
                              index,
                              producto.cantidad + 1
                            )
                          }
                        >
                          +
                        </button>

                      </div>
                    </td>

                    <td>
                      {formato(
                        Number(producto.precio) *
                        Number(producto.cantidad)
                      )}
                    </td>

                    <td>
                      <button
                        className="btn-eliminar"
                        onClick={() => eliminarProducto(index)}
                      >
                        Eliminar
                      </button>
                    </td>

                  </tr>

                ))

              )}

            </tbody>
          </table>
        </div>

      </section>

      <section className="resumen-compra">

        <h2>Resumen de compra</h2>

        <p>
          Subtotal: <strong>{formato(subtotal)}</strong>
        </p>

        <p>
          Costo de envío: <strong>{formato(costoEnvio)}</strong>
        </p>

        <h3>
          Total: {formato(total)}
        </h3>

        <div className="acciones-carrito">

          <button
            onClick={() => navigate("/catalogo")}
          >
            Continuar comprando
          </button>

          <button
            className="btn-finalizar"
            onClick={finalizarCompra}
          >
            Finalizar compra
          </button>

        </div>

      </section>

      {/* Ventana de métodos de pago */}

      {mostrarPago && (

        <div className="modal-pago">

          <div className="contenido-pago">

            <button
              className="cerrar-pago"
              onClick={() => setMostrarPago(false)}
            >
              ✖
            </button>

            <h2>💳 Método de pago</h2>

            <p>
              Selecciona cómo deseas pagar tu compra.
            </p>

            <h3>
              Total a pagar: {formato(total)}
            </h3>

            <label htmlFor="metodo-pago">
              Selecciona tu método de pago:
            </label>

            <select
              id="metodo-pago"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
            >
              <option value="">Seleccionar método</option>
              <option value="tarjeta">
                Tarjeta de crédito o débito
              </option>
              <option value="yape">Yape</option>
              <option value="plin">Plin</option>
              <option value="contraentrega">
                Pago contra entrega
              </option>
            </select>

            {metodoPago === "tarjeta" && (
              <div className="opcion-pago">
                <h3>💳 Pago con tarjeta</h3>

                <label>Número de tarjeta (simulación)</label>
                <input
                  type="text"
                  placeholder="XXXX XXXX XXXX XXXX"
                />

                <label>Nombre del titular</label>
                <input
                  type="text"
                  placeholder="Nombre del titular"
                />

                <label>Fecha de vencimiento</label>
                <input
                  type="text"
                  placeholder="MM/AA"
                />
              </div>
            )}

            {metodoPago === "yape" && (
              <div className="opcion-pago">
                <h3>📱 Pago con Yape</h3>
                <p>
                  Realiza tu pago al número de Yape de nuestra tienda.
                </p>
                <p><strong>Número:</strong> 999999999</p>
                <p>Después de realizar el pago, confirma tu pedido.</p>
              </div>
            )}

            {metodoPago === "plin" && (
              <div className="opcion-pago">
                <h3>📱 Pago con Plin</h3>
                <p>
                  Realiza tu pago al número de Plin de nuestra tienda.
                </p>
                <p><strong>Número:</strong> 999999999</p>
                <p>Después de realizar el pago, confirma tu pedido.</p>
              </div>
            )}

            {metodoPago === "contraentrega" && (
              <div className="opcion-pago">
                <h3>💵 Pago contra entrega</h3>
                <p>
                  Paga cuando recibas los productos en tu domicilio.
                </p>
              </div>
            )}

            <button
              className="btn-confirmar"
              onClick={confirmarPago}
            >
              Confirmar pedido
            </button>

          </div>

        </div>

      )}

    </main>
  );
}

export default Carrito;