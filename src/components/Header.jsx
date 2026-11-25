import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useCarrito } from '../context/CarritoContext'

export default function Header() {
  const { esOscuro, alternarTema } = useTheme()
  const { totalItems } = useCarrito()

  return (
    <header className="mf-header">
      <div className="mf-header__topbar">
        <div className="mf-contenedor">
          <ul className="mf-header__contacto">
            <li className="mf-header__dato">
              <span className="material-symbols-outlined" aria-hidden="true">emergency</span>
              Urgencias 24/7: <a href="tel:+51987654321">+51 987 654 321</a>
            </li>
            <li className="mf-header__dato">
              <span className="material-symbols-outlined" aria-hidden="true">schedule</span>
              Lun-Sáb: 8:00-20:00
            </li>
            <li className="mf-header__dato">
              <span className="material-symbols-outlined" aria-hidden="true">location_on</span>
              Av. Principal de las Mascotas 42, Lima
            </li>
          </ul>
        </div>
      </div>

      <div className="mf-header__principal">
        <div className="mf-header__barra mf-contenedor">
          <Link className="mf-marca" to="/">
            <img
              className="mf-marca__logo"
              src="/img/logos/logo.jpg"
              alt="MascotaFeliz, ir al inicio"
              width="150"
              height="48"
            />
          </Link>

          <nav className="mf-menu" aria-label="Navegación principal">
            <ul className="mf-menu__lista">
              <li>
                <NavLink className="mf-menu__enlace" to="/" end>
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink className="mf-menu__enlace" to="/servicios">
                  Servicios Médicos
                </NavLink>
              </li>
              <li>
                <NavLink className="mf-menu__enlace" to="/catalogo">
                  Tienda para tus Mascotas
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="mf-header__acciones">
            <a
              className="mf-btn mf-btn--primario"
              href="https://wa.me/51999999999"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined" aria-hidden="true">calendar_month</span>
              Agendar Cita
            </a>

            <button
              className="mf-carrito"
              id="btn-tema"
              type="button"
              aria-label="Cambiar modo oscuro"
              aria-pressed={esOscuro}
              onClick={alternarTema}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {esOscuro ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <Link className="mf-carrito" to="/carrito" aria-label="Carrito de compras">
              <span className="material-symbols-outlined" aria-hidden="true">shopping_cart</span>
              <span className="ms-carrito__contador" id="contador-carrito" hidden={totalItems === 0}>
                {totalItems}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}