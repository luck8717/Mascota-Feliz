
import { useState } from 'react'
import productos from '../data/productos'
import { useCarrito } from '../context/CarritoContext'
import '../styles/escatalogo.css'

export default function Catalogo() {
  const { agregarProducto } = useCarrito()

  // Estados de los filtros
  const [busqueda, setBusqueda] = useState('')
  const [mascotas, setMascotas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [marcas, setMarcas] = useState([])
  const [soloStock, setSoloStock] = useState(false)
  const [precioMaximo, setPrecioMaximo] = useState(120)
  const [orden, setOrden] = useState('populares')

  // Estado para controlar la cantidad de cada producto
  const [cantidades, setCantidades] = useState({})

  // Cambiar selección de filtros
  const cambiarFiltro = (valor, lista, setLista) => {
    if (lista.includes(valor)) {
      setLista(lista.filter((item) => item !== valor))
    } else {
      setLista([...lista, valor])
    }
  }

  // Filtrar productos
  let productosFiltrados = productos.filter((producto) => {
    const texto = busqueda.toLowerCase()

    const coincideBusqueda =
      `${producto.name} ${producto.description} ${producto.brand}`
        .toLowerCase()
        .includes(texto)

    const coincideMascota =
      mascotas.length === 0 || mascotas.includes(producto.pet)

    const coincideCategoria =
      categorias.length === 0 || categorias.includes(producto.category)

    const coincideMarca =
      marcas.length === 0 || marcas.includes(producto.brand)

    const coincideStock = !soloStock || producto.stock

    const coincidePrecio = producto.price <= precioMaximo

    return (
      coincideBusqueda &&
      coincideMascota &&
      coincideCategoria &&
      coincideMarca &&
      coincideStock &&
      coincidePrecio
    )
  })

  // Ordenar productos
  productosFiltrados.sort((a, b) => {
    if (orden === 'precio-asc') return a.price - b.price
    if (orden === 'precio-desc') return b.price - a.price
    if (orden === 'rating') return b.rating - a.rating

    return b.rating - a.rating || a.id - b.id
  })

  // Formato de precios
  const moneda = (precio) => `S/ ${precio.toFixed(2)}`

  // Cambiar cantidad
  const cambiarCantidad = (id, cambio) => {
    setCantidades((actuales) => ({
      ...actuales,
      [id]: Math.max(1, Math.min(99, (actuales[id] || 1) + cambio)),
    }))
  }

  // Agregar producto al carrito
  const anadirAlCarrito = (producto) => {
    agregarProducto(
      {
        nombre: producto.name,
        descripcion: producto.description,
        precio: producto.price,
      },
      cantidades[producto.id] || 1
    )

    setCantidades((actuales) => ({
      ...actuales,
      [producto.id]: 1,
    }))

    alert(`${producto.name} se agregó al carrito.`)
  }

  // Limpiar todos los filtros
  const limpiarFiltros = () => {
    setBusqueda('')
    setMascotas([])
    setCategorias([])
    setMarcas([])
    setSoloStock(false)
    setPrecioMaximo(120)
    setOrden('populares')
  }

  return (
    <>
      {/* Cabecera del catálogo */}
      <nav className="mf-migas mf-contenedor" aria-label="Migas de pan">
        <a href="/">Inicio</a>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Tienda de Mascotas</span>
      </nav>

      <section className="mf-tienda__cabecera mf-contenedor">
        <p className="mf-tienda__insignia">
          ✚ Farmacia y Nutrición Certificada
        </p>

        <h1 className="mf-tienda__titulo">
          Tienda &amp; Farmacia Veterinaria <span>MascotaFeliz</span>
        </h1>

        <p className="mf-tienda__subtitulo">
          Nutrición de alta gama, farmacia certificada, antipulgas y
          accesorios para consentir a perros, gatos y aves con envío
          a domicilio en 24h.
        </p>

        <ul className="mf-tienda__puntos">
          <li>
            🚚 <strong>Envío Exprés 24h</strong>
            <span>Gratis desde S/ 149</span>
          </li>
          <li>
            🛡️ <strong>Control Clínico</strong>
            <span>Supervisado por veterinarios</span>
          </li>
        </ul>
      </section>

      {/* Información de envíos */}
      <div className="mf-tienda__envios">
        <div className="mf-contenedor mf-tienda__envios-interior">
          <p>
            ⚡ Envíos exprés en el día para pedidos antes de las 14:00 |
            Retiro gratis en clínica en 30 minutos
          </p>
          <a href="https://wa.me/51999999999" target="_blank" rel="noreferrer">
            ¿Dudas o recetas? Consúltanos
          </a>
        </div>
      </div>

      <div className="mf-contenedor mf-tienda__layout">

        {/* FILTROS */}
        <aside className="mf-filtros" aria-label="Filtros de productos">
          <div className="mf-filtros__cabecera">
            <h2>🎚️ Filtros</h2>
            <button type="button" onClick={limpiarFiltros}>
              Limpiar todo
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>

            {/* Filtro por mascota */}
            <fieldset className="mf-filtros__grupo">
              <legend>Filtro por Mascota</legend>

              {[
                { valor: 'perros', texto: '🐶 Perros' },
                { valor: 'gatos', texto: '🐱 Gatos' },
                { valor: 'aves', texto: '🐦 Aves' },
              ].map((opcion) => (
                <label className="mf-filtros__opcion" key={opcion.valor}>
                  <input
                    type="checkbox"
                    checked={mascotas.includes(opcion.valor)}
                    onChange={() =>
                      cambiarFiltro(opcion.valor, mascotas, setMascotas)
                    }
                  />
                  {opcion.texto}
                </label>
              ))}
            </fieldset>

            {/* Filtro por categoría */}
            <fieldset className="mf-filtros__grupo">
              <legend>Categorías Especializadas</legend>

              {[
                { valor: 'alimentos', texto: '🍖 Alimentos y Snacks' },
                { valor: 'farmacia', texto: '✚ Farmacia y Suplementos' },
                { valor: 'antipulgas', texto: '🛡️ Antipulgas y Pipetas' },
                { valor: 'juguetes', texto: '🧸 Juguetes y Hábitats' },
                { valor: 'higiene', texto: '🧼 Higiene y Belleza' },
              ].map((opcion) => (
                <label className="mf-filtros__opcion" key={opcion.valor}>
                  <input
                    type="checkbox"
                    checked={categorias.includes(opcion.valor)}
                    onChange={() =>
                      cambiarFiltro(
                        opcion.valor,
                        categorias,
                        setCategorias
                      )
                    }
                  />
                  {opcion.texto}
                </label>
              ))}
            </fieldset>

            {/* Filtro por precio */}
            <fieldset className="mf-filtros__grupo">
              <legend>
                Rango de Precio
                <span className="mf-filtros__max">
                  Hasta {moneda(precioMaximo)}
                </span>
              </legend>

              <input
                className="mf-filtros__rango"
                type="range"
                min="5"
                max="120"
                value={precioMaximo}
                onChange={(e) => setPrecioMaximo(Number(e.target.value))}
              />

              <div className="mf-filtros__rango-marcas">
                <span>S/ 5</span>
                <span>S/ 60</span>
                <span>S/ 120</span>
              </div>
            </fieldset>

            {/* Filtro por marca */}
            <fieldset className="mf-filtros__grupo">
              <legend>Marcas Destacadas</legend>

              {[
                { valor: 'royal-canin', texto: 'Royal Canin' },
                { valor: 'bravecto', texto: 'Bravecto' },
                { valor: 'versele-laga', texto: 'Versele-Laga' },
                { valor: 'zupreem', texto: 'ZuPreem' },
              ].map((opcion) => (
                <label className="mf-filtros__opcion" key={opcion.valor}>
                  <input
                    type="checkbox"
                    checked={marcas.includes(opcion.valor)}
                    onChange={() =>
                      cambiarFiltro(opcion.valor, marcas, setMarcas)
                    }
                  />
                  {opcion.texto}
                </label>
              ))}
            </fieldset>

            {/* Disponibilidad */}
            <fieldset className="mf-filtros__grupo">
              <legend>Disponibilidad</legend>

              <label className="mf-filtros__opcion">
                <input
                  type="checkbox"
                  checked={soloStock}
                  onChange={(e) => setSoloStock(e.target.checked)}
                />
                📦 En stock para entrega hoy
              </label>
            </fieldset>

            <button
              className="mf-filtros__aplicar mf-btn mf-btn--primario"
              type="submit"
            >
              Aplicar filtros
            </button>
          </form>

          {/* Información de recetas */}
          <div className="mf-filtros__receta">
            <h3>✚ Farmacia con Receta</h3>
            <p>
              ¿Tu mascota necesita medicamentos sujetos a prescripción?
              Envíanos la orden médica por WhatsApp y la validamos.
            </p>
            <a href="https://wa.me/51999999999" target="_blank" rel="noreferrer">
              📄 Subir receta médica
            </a>
          </div>
        </aside>

        {/* LISTADO DE PRODUCTOS */}
        <section className="mf-listado" aria-label="Listado de productos">

          {/* Barra de herramientas */}
          <div className="mf-listado__barra">
            <p className="mf-listado__contador">
              Mostrando <strong>{productosFiltrados.length}</strong> productos
            </p>

            <p className="mf-listado__stock">
              ✔ Stock verificado
            </p>

            <div className="mf-listado__herramientas">
              <label className="mf-listado__buscar">
                🔍
                <input
                  type="search"
                  placeholder="Buscar productos"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </label>

              <label className="mf-listado__ordenar">
                Ordenar:
                <select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                >
                  <option value="populares">Más populares</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                  <option value="rating">Mejor valorados</option>
                </select>
              </label>
            </div>
          </div>

          {/* Filtros activos */}
          <ul className="mf-listado__activos">
            <li>Filtros activos:</li>
            {[
              ...mascotas,
              ...categorias,
              ...marcas,
              ...(soloStock ? ['En stock'] : []),
              ...(busqueda ? [`Búsqueda: ${busqueda}`] : []),
            ].map((filtro, indice) => (
              <li key={`${filtro}-${indice}`}>{filtro}</li>
            ))}
            {mascotas.length + categorias.length + marcas.length === 0 &&
              !soloStock && !busqueda && <li>Sin filtros</li>}
          </ul>

          {/* Tarjetas de productos */}
          <div className="mf-listado__rejilla">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <article className="mf-tarjeta" key={producto.id}>
                  <div className="mf-tarjeta__etiquetas">
                    <span className="mf-chip mf-chip--categoria">
                      {producto.pet === 'perros'
                        ? '🐶 Perros'
                        : producto.pet === 'gatos'
                          ? '🐱 Gatos'
                          : '🐦 Aves'}
                    </span>

                    <span className="mf-chip mf-chip--info">
                      {producto.category}
                    </span>
                  </div>

                  <img
                    className="mf-tarjeta__imagen"
                    src={producto.image}
                    alt={producto.name}
                    loading="lazy"
                  />

                  <p className="mf-tarjeta__stock">
                    ● {producto.stock ? 'En stock' : 'Agotado'}
                  </p>

                  <p className="mf-tarjeta__rating">
                    <span className="mf-tarjeta__estrellas">★★★★★</span>
                    {' '}{producto.rating.toFixed(1)}{' '}
                    <span className="mf-tarjeta__resenas">
                      ({producto.reviews} reseñas)
                    </span>
                  </p>

                  <h3 className="mf-tarjeta__nombre">
                    {producto.name}
                  </h3>

                  <p className="mf-tarjeta__descripcion">
                    {producto.description}
                  </p>

                  <div className="mf-tarjeta__precio">
                    <strong>{moneda(producto.price)}</strong>
                  </div>

                  <div className="mf-tarjeta__compra">
                    <div className="mf-tarjeta__cantidad">
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(producto.id, -1)}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>

                      <span>{cantidades[producto.id] || 1}</span>

                      <button
                        type="button"
                        onClick={() => cambiarCantidad(producto.id, 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="mf-tarjeta__anadir mf-btn mf-btn--primario"
                      type="button"
                      disabled={!producto.stock}
                      onClick={() => anadirAlCarrito(producto)}
                    >
                      🛒 Añadir al Carrito
                    </button>
                  </div>

                  <a
                    className="mf-tarjeta__whatsapp"
                    href="https://wa.me/51999999999"
                    target="_blank"
                    rel="noreferrer"
                  >
                    💬 Consultar por WhatsApp
                  </a>
                </article>
              ))
            ) : (
              <div className="mf-sin-resultados">
                <span>🔎</span>
                <h3>No encontramos productos</h3>
                <p>
                  Prueba cambiando la búsqueda o quitando algunos filtros.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Garantías de compra */}
      <section className="mf-garantias mf-contenedor">
        <article className="mf-garantias__item">
          <span className="mf-garantias__icono">🧊</span>
          <div>
            <h2>Garantía Farmacéutica</h2>
            <p>
              Productos almacenados con control de temperatura y
              supervisión veterinaria.
            </p>
          </div>
        </article>

        <article className="mf-garantias__item">
          <span className="mf-garantias__icono">🛵</span>
          <div>
            <h2>Reparto Local Urgente</h2>
            <p>
              Entregas locales para que tu mascota reciba lo que necesita.
            </p>
          </div>
        </article>

        <article className="mf-garantias__item">
          <span className="mf-garantias__icono">↩️</span>
          <div>
            <h2>Devolución Segura</h2>
            <p>
              Atención para cambios y devoluciones de accesorios.
            </p>
          </div>
        </article>
      </section>
    </>
  )
}
