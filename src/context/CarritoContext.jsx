import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([])

  // Tu compañero de Carrito completará estas funciones
  const agregarAlCarrito = (producto) => {}
  const eliminarDelCarrito = (id) => {}
  const vaciarCarrito = () => setCarrito([])
  const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0)

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        totalItems,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export const useCarrito = () => useContext(CarritoContext)