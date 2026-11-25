import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

export default function Carrito() {
  const navigate = useNavigate()
  const {
    carrito,
    eliminarProducto,
    cambiarCantidad,
    vaciarCarrito,
    subtotal,
    costoEnvio,
    total,
  } = useCarrito()

  const [mostrarPago, setMostrarPago] = useState(false)
  const [metodoPago, setMetodoPago] = useState('')
  const [errorPago, setErrorPago] = useState('')
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false)

  const abrirModalPago = () => {
    if (carrito.length === 0) return
    setErrorPago('')
    setMostrarPago(true)
  }

  const confirmarPedido = () => {
    if (!metodoPago) {
      setErrorPago('Por favor, selecciona un método de pago.')
      return
    }
    vaciarCarrito()
    setMostrarPago(false)
    setMetodoPago('')
    setErrorPago('')
    setPedidoConfirmado(true)
  }

  return (
    <div className="mf-contenedor carrito-pagina">
      <section>
        <h1>Mi carrito de compras</h1>
        <p>Revisa los productos que deseas comprar para tu mascota.</p>
      </section>

      {pedidoConfirmado && (
        <p className="mf-suscripcion__mensaje mf-suscripcion__mensaje--ok" role="status">
          ¡Pedido confirmado con éxito! Gracias por comprar en MascotaFeliz.
        </p>
      )}

      <section>
        <h2>Productos seleccionados</h2>

        {carrito.length === 0 ? (
          <p id="mensaje-vacio">Tu carrito está vacío.</p>
        ) : (
          <table border="1">
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
            <tbody id="lista-carrito">
              {carrito.map((item, indice) => (
                <tr key={item.nombre}>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion || 'Producto MascotaFeliz'}</td>
                  <td>S/ {Number(item.precio).toFixed(2)}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => cambiarCantidad(indice, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                    >
                      -
                    </button>
                    <span style={{ margin: '0 8px' }}>{item.cantidad}</span>
                    <button
                      type="button"
                      onClick={() => cambiarCantidad(indice, item.cantidad + 1)}
                    >
                      +
                    </button>
                  </td>
                  <td>S/ {(Number(item.precio) * item.cantidad).toFixed(2)}</td>
                  <td>
                    <button type="button" onClick={() => eliminarProducto(indice)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2>Resumen de compra</h2>
        <p>
          Subtotal: <span id="subtotal-compra">S/ {subtotal.toFixed(2)}</span>
        </p>
        <p>
          Costo de envío: <span id="costo-envio">S/ {costoEnvio.toFixed(2)}</span>
        </p>
        <h3>
          Total: <span id="total-compra">S/ {total.toFixed(2)}</span>
        </h3>

        <button
          type="button"
          className="mf-btn mf-btn--secundario"
          onClick={() => navigate('/catalogo')}
        >
          Continuar comprando
        </button>

        {carrito.length > 0 && (
          <button
            type="button"
            id="btn-finalizar"
            className="mf-btn mf-btn--primario"
            onClick={abrirModalPago}
          >
            Finalizar compra
          </button>
        )}
      </section>

      {mostrarPago && (
        <div
          id="ventana-pago"
          className="modal-pago"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            className="contenido-pago"
            style={{
              backgroundColor: 'var(--color-superficie, #ffffff)',
              color: 'var(--color-texto, #1e293b)',
              padding: '2rem',
              borderRadius: '12px',
              maxWidth: '450px',
              width: '90%',
              position: 'relative',
            }}
          >
            <button
              type="button"
              id="cerrar-pago"
              className="cerrar-pago"
              onClick={() => setMostrarPago(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem' }}
            >
              ✖
            </button>

            <h2>Método de pago</h2>
            <p>Selecciona cómo deseas pagar tu compra.</p>

            <h3>
              Total a pagar: <span id="total-pago">S/ {total.toFixed(2)}</span>
            </h3>

            <label htmlFor="metodo-pago">Selecciona tu método de pago:</label>
            <select
              id="metodo-pago"
              value={metodoPago}
              onChange={(e) => {
                setMetodoPago(e.target.value)
                setErrorPago('')
              }}
            >
              <option value="">Seleccionar método</option>
              <option value="tarjeta">Tarjeta de crédito o débito</option>
              <option value="yape">Yape</option>
              <option value="plin">Plin</option>
              <option value="contraentrega">Pago contra entrega</option>
            </select>

            {metodoPago === 'tarjeta' && (
              <div id="pago-tarjeta" className="opcion-pago">
                <h3>Pago con tarjeta</h3>
                <label>Número de tarjeta (simulación)</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                <label>Nombre del titular</label>
                <input type="text" placeholder="Nombre del titular" />
                <label>Fecha de vencimiento</label>
                <input type="text" placeholder="MM/AA" />
              </div>
            )}

            {metodoPago === 'yape' && (
              <div id="pago-yape" className="opcion-pago">
                <h3>Pago con Yape</h3>
                <p>Realiza tu pago al número de Yape de nuestra tienda.</p>
                <p>
                  <strong>Número:</strong> 999999999
                </p>
                <p>Después de realizar el pago, confirma tu pedido.</p>
              </div>
            )}

            {metodoPago === 'plin' && (
              <div id="pago-plin" className="opcion-pago">
                <h3>Pago con Plin</h3>
                <p>Realiza tu pago al número de Plin de nuestra tienda.</p>
                <p>
                  <strong>Número:</strong> 999999999
                </p>
                <p>Después de realizar el pago, confirma tu pedido.</p>
              </div>
            )}

            {metodoPago === 'contraentrega' && (
              <div id="pago-contraentrega" className="opcion-pago">
                <h3>Pago contra entrega</h3>
                <p>Paga cuando recibas los productos en tu domicilio.</p>
              </div>
            )}

            {errorPago && (
              <p className="mf-suscripcion__mensaje mf-suscripcion__mensaje--error">
                {errorPago}
              </p>
            )}

            <button
              type="button"
              id="confirmar-pago"
              className="mf-btn mf-btn--primario"
              onClick={confirmarPedido}
            >
              Confirmar pedido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}