import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export function CarritoProvider({ children }) {

  const [carrito, setCarrito] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("carrito")) || [];
    } catch {
      return [];
    }
  });

  // Guardar automáticamente los cambios
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Agregar productos
  const agregarProducto = (producto, cantidad = 1) => {
    setCarrito(actual => {
      const existente = actual.find(
        p => p.nombre === producto.nombre
      );

      if (existente) {
        return actual.map(p =>
          p.nombre === producto.nombre
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        );
      }

      return [
        ...actual,
        {
          nombre: producto.nombre,
          descripcion: producto.descripcion || "Producto MascotaFeliz",
          precio: Number(producto.precio) || 0,
          cantidad: cantidad
        }
      ];
    });
  };

  // Eliminar producto
  const eliminarProducto = (indice) => {
    setCarrito(actual =>
      actual.filter((_, i) => i !== indice)
    );
  };

  // Modificar cantidad
  const cambiarCantidad = (indice, cantidad) => {
    if (cantidad < 1) return;

    setCarrito(actual =>
      actual.map((p, i) =>
        i === indice ? { ...p, cantidad } : p
      )
    );
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Calcular subtotal
  const subtotal = carrito.reduce(
    (suma, p) =>
      suma + Number(p.precio) * Number(p.cantidad),
    0
  );

  // Costo de envío
  const costoEnvio = subtotal > 0 ? 10 : 0;

  // Total final
  const total = subtotal + costoEnvio;

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        cambiarCantidad,
        vaciarCarrito,
        subtotal,
        costoEnvio,
        total
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}