import { createContext, useContext, useState, useEffect } from 'react'

const CarritoContext = createContext()

export const useCarrito = () => useContext(CarritoContext)

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('carrito')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  const agregarProducto = (producto, cantidad = 1) => {
    setCarrito((actual) => {
      const existente = actual.find((p) => p.nombre === producto.nombre)

      if (existente) {
        return actual.map((p) =>
          p.nombre === producto.nombre
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        )
      }

      return [
        ...actual,
        {
          nombre: producto.nombre,
          descripcion: producto.descripcion || 'Producto MascotaFeliz',
          precio: Number(producto.precio) || 0,
          cantidad: cantidad,
        },
      ]
    })
  }

  const eliminarProducto = (indice) => {
    setCarrito((actual) => actual.filter((_, i) => i !== indice))
  }

  const cambiarCantidad = (indice, cantidad) => {
    if (cantidad < 1) return
    setCarrito((actual) =>
      actual.map((p, i) => (i === indice ? { ...p, cantidad } : p))
    )
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const totalItems = carrito.reduce(
    (suma, p) => suma + (Number(p.cantidad) || 1),
    0
  )

  const subtotal = carrito.reduce(
    (suma, p) => suma + Number(p.precio) * Number(p.cantidad),
    0
  )

  const costoEnvio = subtotal > 0 ? 10 : 0
  const total = subtotal + costoEnvio

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        agregarAlCarrito: agregarProducto,
        eliminarProducto,
        eliminarDelCarrito: eliminarProducto,
        cambiarCantidad,
        vaciarCarrito,
        totalItems,
        subtotal,
        costoEnvio,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}