import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [correo, setCorreo] = useState('')
  const [feedback, setFeedback] = useState({ texto: '', esExito: false })

  const manejarSuscripcion = (evento) => {
    evento.preventDefault()
    const valor = correo.trim()

    if (valor === '') {
      setFeedback({ texto: 'Escribe tu correo electrónico.', esExito: false })
    } else if (!valor.includes('@') || !valor.includes('.')) {
      setFeedback({ texto: 'El correo no es válido. Ejemplo: nombre@correo.com', esExito: false })
    } else {
      setFeedback({ texto: '¡Gracias por suscribirte!', esExito: true })
      setCorreo('')
    }
  }

  return (
    <>
      <footer className="mf-footer">
        <div className="mf-footer__principal mf-contenedor">
          <div className="mf-footer__columna">
            <p className="mf-footer__marca">
              Mascota<span className="mf-footer__acento">Feliz</span>
            </p>
            <p className="mf-footer__texto">
              Clínica veterinaria y farmacia especializada comprometida con la salud, bienestar y
              cariño de tus compañeros peludos y alados.
            </p>
            <ul className="mf-footer__datos">
              <li>
                <span className="material-symbols-outlined" aria-hidden="true">verified</span>
                <p className="mf-footer--equipo--medico">Equipo Médico Colegiado N.º 95130</p>
              </li>
              <li>
                <span className="material-symbols-outlined mf-footer__icono-urgencia" aria-hidden="true">call</span>
                <span className="mf-footer__link--urgencia">
                  Urgencias 24h:{' '}
                  <a className="mf-footer__urgencia" href="tel:+51987654321">
                    +51 987 654 321
                  </a>
                </span>
              </li>
              <li>
                <span className="material-symbols-outlined" aria-hidden="true">location_on</span>
                <a
                  className="mf-footer__enlace-subrayado"
                  href="https://www.google.com/maps/search/?api=1&query=Av.+Principal+de+las+Mascotas+42%2C+Lima"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver sedes en Google Maps
                </a>
              </li>
            </ul>
          </div>

          <nav className="mf-footer__columna" aria-label="Servicios y Productos">
            <h2 className="mf-footer__titulo">Servicios y Productos por Especie</h2>
            <ul className="mf-footer__lista">
              <li><Link className="mf-footer__enlace" to="/servicios#perros">Medicina Integral para Perros</Link></li>
              <li><Link className="mf-footer__enlace" to="/servicios#gatos">Cuidados Especiales y Vacunación Felina</Link></li>
              <li><Link className="mf-footer__enlace" to="/servicios#aves">Clínica y Bienestar de Aves Exóticas</Link></li>
              <li><Link className="mf-footer__enlace" to="/catalogo">Farmacia Veterinaria y Fármacos</Link></li>
              <li><Link className="mf-footer__enlace" to="/servicios#peluqueria">Peluquería Dermatológica e Higiene</Link></li>
              <li><Link className="mf-footer__enlace" to="/servicios#urgencias">Cirugía y Hospitalización 24/7</Link></li>
            </ul>
          </nav>

          <div className="mf-footer__columna">
            <h2 className="mf-footer__titulo">Atención &amp; Sedes</h2>
            <div className="mf-footer__sede">
              <strong className="mf-footer__sede-titulo">Sede Central Lima</strong>
              <address className="mf-footer__sede-contacto">Av. Principal de las Mascotas 42, Lima</address>
              <p className="mf-footer__sede-detalle">Lun a Sáb de 8:00 a 20:00</p>
            </div>
            <div className="mf-footer__sede">
              <strong className="mf-footer__sede-titulo">Centro Hospitalario Urgencias</strong>
              <address className="mf-footer__sede-contacto">Calle del Rescate 20, Lima</address>
              <p className="mf-footer__sede-detalle">Abierto 24 Horas / 365 Días</p>
            </div>
            <div className="mf-footer__sede">
              <strong className="mf-footer__sede-titulo">WhatsApp Atención al Cliente:</strong>
              <address className="mf-footer__sede-contacto">
                <a
                  className="mf-footer__enlace-verde"
                  href="https://wa.me/51999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +51 999 999 999
                </a>
              </address>
            </div>
          </div>

          <div className="mf-footer__columna">
            <h2 className="mf-footer__titulo">Consejos &amp; Comunidad</h2>
            <p className="mf-footer__texto">
              Suscríbete para recibir guías de nutrición, recordatorios de vacunación y promociones
              de nuestra tienda.
            </p>
            <form className="mf-suscripcion" onSubmit={manejarSuscripcion} noValidate>
              <label className="mf-solo-lectores" htmlFor="correo-boletin">
                Correo electrónico
              </label>
              <input
                className="mf-suscripcion__campo"
                type="email"
                name="correo"
                id="correo-boletin"
                placeholder="Introduce tu correo electrónico"
                autoComplete="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <button className="mf-btn mf-btn--primario mf-suscripcion__boton" type="submit">
                Suscribirme gratis
              </button>
              {feedback.texto && (
                <p
                  className={`mf-suscripcion__mensaje ${
                    feedback.esExito
                      ? 'mf-suscripcion__mensaje--ok'
                      : 'mf-suscripcion__mensaje--error'
                  }`}
                  id="mensaje-suscripcion"
                  role="status"
                >
                  {feedback.texto}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mf-footer__inferior mf-contenedor">
          <small>© 2026 MascotaFeliz. Todos los derechos reservados.</small>
          <ul className="mf-footer__legal">
            <li><a href="#aviso-legal">Aviso Legal</a></li>
            <li><a href="#politica-privacidad">Política de Privacidad</a></li>
          </ul>
        </div>
      </footer>

      <div className="mf-whatsapp-flotante">
        <p className="mf-whatsapp-flotante__texto">¿Necesitas cita o consulta? ¡Escríbenos!</p>
        <a
          className="mf-whatsapp-flotante__boton"
          aria-label="Escribir por WhatsApp"
          href="https://wa.me/51999999999"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="material-symbols-outlined" aria-hidden="true">chat</span>
        </a>
      </div>
    </>
  )
}