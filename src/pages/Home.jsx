import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

const PRODUCTOS_FAVORITOS = [
  {
    nombre: 'Royal Canin Maxi Puppy 15kg',
    precio: 68.0,
    precioAnterior: '79.90',
    imagen: '/img/productos/royal-canin.jpg',
    alt: 'Bolsa de alimentos para perros de raza grande',
    categoria: 'Perro Cachorro',
    descuento: '-15% OFF',
    valoracion: 4.5,
    resenas: 142,
    descripcion: 'Para cachorros de razas grandes hasta los 15 meses.',
  },
  {
    nombre: 'Bravecto Antipulgas Perros M (10-20kg)',
    precio: 32.5,
    imagen: '/img/productos/bravecto.jpg',
    alt: 'Paquete de producto antipulgas para perros',
    categoria: 'Farmacia Canina',
    valoracion: 5,
    resenas: 289,
    descripcion: 'Protección continua por 12 semanas contra pulgas y garrapatas.',
  },
  {
    nombre: 'Arena Sanitaria Aglomerante Gatos 10kg',
    precio: 18.0,
    imagen: '/img/productos/arena-sanitaria.jpg',
    alt: 'Paquete de arena sanitaria para gatos',
    categoria: 'Gatos Higiene',
    claseExtra: 'mf-producto--gato',
    valoracion: 4,
    resenas: 96,
    descripcion: 'Ultra aglomeración, libre de polvo en un 99.8% y neutralizador de olores.',
  },
  {
    nombre: 'Mezcla Premium Loros y Aves 2kg',
    precio: 14.9,
    imagen: '/img/productos/mezcla-premium.jpg',
    alt: 'Paquete de Mezcla Premium para loros y aves',
    categoria: 'Aves Nutrición',
    valoracion: 5,
    resenas: 53,
    descripcion: 'Semillas seleccionadas, frutos deshidratados y vitaminas añadidas.',
  },
]

export default function Home() {
  const { agregarAlCarrito } = useCarrito()

  return (
    <>
      <section className="mf-hero">
        <div className="mf-hero__contenedor mf-contenedor">
          <div className="mf-hero__texto">
            <p className="mf-etiqueta">
              <span className="material-symbols-outlined" aria-hidden="true">pets</span>
              Centro Veterinario Colegiado &amp; Farmacia
            </p>
            <h1 className="mf-hero__titulo">
              El cuidado y amor que tus mejores amigos merecen:{' '}
              <span className="mf-hero__destacado">Perros, Gatos y Aves</span>
            </h1>
            <p className="mf-hero__descripcion">
              Atención médica integral, medicina preventiva, especialistas en aves exóticas y la
              mejor tienda de alimentos y salud para tus consentidos.
            </p>

            <div className="mf-hero__acciones">
              <a
                className="mf-btn mf-btn--whatsapp"
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined" aria-hidden="true">chat</span>
                Reservar Cita por WhatsApp
              </a>
              <Link className="mf-btn mf-btn--secundario" to="/catalogo">
                <span className="material-symbols-outlined" aria-hidden="true">storefront</span>
                Explorar Tienda y Farmacia
              </Link>
            </div>

            <ul className="mf-hero__datos">
              <li className="mf-hero__dato">
                <span className="material-symbols-outlined mf-hero__dato-icono" aria-hidden="true">pets</span>
                <div className="mf-hero__dato-texto">
                  <strong className="mf-hero__dato-titulo">+15,000</strong>
                  <span className="mf-hero__dato-detalle">Pacientes</span>
                </div>
              </li>
              <li className="mf-hero__dato">
                <span className="material-symbols-outlined mf-hero__dato-icono" aria-hidden="true">emergency</span>
                <div className="mf-hero__dato-texto">
                  <strong className="mf-hero__dato-titulo">Urgencias</strong>
                  <span className="mf-hero__dato-detalle">24 Horas 365D</span>
                </div>
              </li>
              <li className="mf-hero__dato">
                <span className="material-symbols-outlined mf-hero__dato-icono" aria-hidden="true">flutter_dash</span>
                <div className="mf-hero__dato-texto">
                  <strong className="mf-hero__dato-titulo">Especialistas</strong>
                  <span className="mf-hero__dato-detalle">Aves &amp; Exóticos</span>
                </div>
              </li>
              <li className="mf-hero__dato">
                <span className="material-symbols-outlined mf-hero__dato-icono" aria-hidden="true">star</span>
                <div className="mf-hero__dato-texto">
                  <strong className="mf-hero__dato-titulo">4.9/5.0</strong>
                  <span className="mf-hero__dato-detalle">Google Reviews</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="mf-hero__visual">
            <figure className="mf-hero__figura">
              <img
                className="mf-hero__imagen"
                src="/img/hero/imagen-inicio.jpg"
                alt="Veterinaria atendiendo a un perro"
                width="800"
                height="600"
              />
            </figure>

            <div className="mf-hero__tarjeta mf-hero__tarjeta--doctora">
              <span className="material-symbols-outlined mf-hero__tarjeta-icono" aria-hidden="true">
                medical_services
              </span>
              <div className="mf-hero__tarjeta-cuerpo">
                <div className="mf-hero__tarjeta-fila">
                  <p className="mf-hero__tarjeta-titulo">Dra. Sarah Jenkins</p>
                  <span className="mf-hero__estado">Hoy libre</span>
                </div>
                <p className="mf-hero__tarjeta-detalle">3 turnos disponibles</p>
              </div>
            </div>

            <div className="mf-hero__tarjeta mf-hero__tarjeta--urgencia">
              <span className="material-symbols-outlined mf-hero__tarjeta-icono" aria-hidden="true">
                verified
              </span>
              <div className="mf-hero__tarjeta-cuerpo">
                <p className="mf-hero__tarjeta-titulo">Atención Inmediata</p>
                <p className="mf-hero__tarjeta-detalle">Triaje médico directo por WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mf-seccion">
        <div className="mf-contenedor">
          <header className="mf-seccion__cabecera">
            <div>
              <p className="mf-sobretitulo">Atención Personalizada</p>
              <h2 className="mf-seccion__titulo">Cuidado especializado por especie</h2>
            </div>
            <p className="mf-seccion__descripcion">
              Diseñamos protocolos clínicos y espacios exclusivos adaptados a la fisonomía y
              comportamiento de tu mascota.
            </p>
          </header>

          <div className="mf-especies">
            <article className="mf-especie mf-especie--perro">
              <span className="mf-especie__icono material-symbols-outlined" aria-hidden="true">pets</span>
              <div className="mf-especie__encabezado">
                <h3 className="mf-especie__nombre">Perros</h3>
                <span className="mf-especie__etiqueta">Caninos</span>
              </div>
              <p className="mf-especie__descripcion">
                Medicina preventiva integral, desparasitación rigurosa, estética canina
                hipoalergénica y la mejor nutrición premium para cada etapa de su vida.
              </p>
              <ul className="mf-especie__lista">
                <li>Plan Cachorro &amp; Senior</li>
                <li>Peluquería y baños medicados</li>
                <li>Traumatología y ortopedia</li>
              </ul>
              <Link className="mf-especie__enlace" to="/servicios#perros">
                Ver servicios para perros
              </Link>
            </article>

            <article className="mf-especie mf-especie--gato">
              <span className="mf-especie__icono material-symbols-outlined" aria-hidden="true">cruelty_free</span>
              <div className="mf-especie__encabezado">
                <h3 className="mf-especie__nombre">Gatos</h3>
                <span className="mf-especie__etiqueta">Cat-Friendly</span>
              </div>
              <p className="mf-especie__descripcion">
                Salas clínicas exclusivas sin aromas de perros ni estrés sonoro, nutrición renal /
                urinaria y vacunación triple felina certificada.
              </p>
              <ul className="mf-especie__lista">
                <li>Consultorios 100% Cat-Friendly</li>
                <li>Control renal y endocrino</li>
                <li>Hospitalización felina aislada</li>
              </ul>
              <Link className="mf-especie__enlace" to="/servicios#gatos">
                Ver servicios felinos
              </Link>
            </article>

            <article className="mf-especie mf-especie--ave">
              <span className="mf-especie__icono material-symbols-outlined" aria-hidden="true">flutter_dash</span>
              <div className="mf-especie__encabezado">
                <h3 className="mf-especie__nombre">Aves y Exóticos</h3>
                <span className="mf-especie__etiqueta">Especialidad</span>
              </div>
              <p className="mf-especie__descripcion">
                Médicos expertos en psitácidos, canarios y paseriformes: arreglo de pico y plumas,
                diagnóstico de parasitosis y asesoría de enriquecimiento ambiental.
              </p>
              <ul className="mf-especie__lista">
                <li>Corte y pulido de picos y uñas</li>
                <li>Análisis coprológico y sexado</li>
                <li>Dietas orgánicas y semillas premium</li>
              </ul>
              <Link className="mf-especie__enlace" to="/servicios#aves">
                Ver servicios para aves
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="mf-seccion">
        <div className="mf-contenedor">
          <header className="mf-seccion__cabecera mf-seccion__cabecera--centrada">
            <p className="mf-sobretitulo">Servicios clínicos</p>
            <h2 className="mf-seccion__titulo">Medicina preventiva y atención avanzada</h2>
            <p className="mf-seccion__descripcion">
              Tarifas transparentes, médicos especializados y protocolos clínicos del más alto rigor
              científico.
            </p>
          </header>

          <div className="mf-servicios">
            <article className="mf-servicio">
              <div className="mf-servicio__media">
                <img
                  className="mf-servicio__imagen"
                  src="/img/servicios/servicios-perro.jpg"
                  alt="Doctora atendiendo a un perro"
                  width="640"
                  height="480"
                  loading="lazy"
                />
                <span className="mf-servicio__etiqueta">Consulta General</span>
              </div>
              <h3 className="mf-servicio__titulo">Consulta Médica General &amp; Preventiva</h3>
              <p className="mf-servicio__descripcion">
                Examen físico completo, revisión dental, peso, auscultación y plan nutricional
                adaptado.
              </p>
              <div className="mf-servicio__precio">
                <span>Tarifa desde</span>
                <strong className="mf-servicio__precio-valor">S/ 25</strong>
              </div>
              <a
                className="mf-btn mf-btn--primario mf-servicio__boton"
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined" aria-hidden="true">calendar_month</span>
                Agendar por WhatsApp
              </a>
            </article>

            <article className="mf-servicio">
              <div className="mf-servicio__media">
                <img
                  className="mf-servicio__imagen"
                  src="/img/servicios/servicios-ave.jpg"
                  alt="Doctora atendiendo a un loro"
                  width="640"
                  height="480"
                  loading="lazy"
                />
                <span className="mf-servicio__etiqueta">Aves &amp; Exóticos</span>
              </div>
              <h3 className="mf-servicio__titulo">Especialidad en Aves y Pequeños Animales</h3>
              <p className="mf-servicio__descripcion">
                Diagnóstico aviar por especialistas titulados, chequeos de plumaje, corte de pico y
                pautas de hábitat.
              </p>
              <div className="mf-servicio__precio">
                <span>Tarifa desde</span>
                <strong className="mf-servicio__precio-valor">S/ 35</strong>
              </div>
              <a
                className="mf-btn mf-btn--primario mf-servicio__boton"
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined" aria-hidden="true">calendar_month</span>
                Agendar por WhatsApp
              </a>
            </article>

            <article className="mf-servicio">
              <div className="mf-servicio__media">
                <img
                  className="mf-servicio__imagen"
                  src="/img/servicios/servicios-gato.jpg"
                  alt="Doctora atendiendo a un gato"
                  width="640"
                  height="480"
                  loading="lazy"
                />
                <span className="mf-servicio__etiqueta">Inmunización</span>
              </div>
              <h3 className="mf-servicio__titulo">Vacunación y Desparasitación al Día</h3>
              <p className="mf-servicio__descripcion">
                Cartilla sanitaria oficial, microchip internacional, rabia, pentavalente canina y
                triple felina.
              </p>
              <div className="mf-servicio__precio">
                <span>Tarifa desde</span>
                <strong className="mf-servicio__precio-valor">S/ 20</strong>
              </div>
              <a
                className="mf-btn mf-btn--primario mf-servicio__boton"
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined" aria-hidden="true">calendar_month</span>
                Agendar por WhatsApp
              </a>
            </article>

            <article className="mf-servicio mf-servicio--urgencia">
              <div className="mf-servicio__media">
                <img
                  className="mf-servicio__imagen"
                  src="/img/servicios/servicios-24-7.jpg"
                  alt="Doctora realizando una cirugía a una mascota"
                  width="640"
                  height="480"
                  loading="lazy"
                />
                <span className="mf-servicio__etiqueta">Guardia 24 Horas</span>
              </div>
              <h3 className="mf-servicio__titulo">Cirugía y Laboratorio Clínico 24/7</h3>
              <p className="mf-servicio__descripcion">
                Quirófanos equipados, anestesia inhalatoria, ecografía Doppler y analíticas
                sanguíneas en 15 minutos.
              </p>
              <div className="mf-servicio__precio">
                <span>Atención Inmediata</span>
                <strong className="mf-servicio__precio-valor">Urgencias</strong>
              </div>
              <a
                className="mf-btn mf-btn--urgencia mf-servicio__boton"
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined" aria-hidden="true">emergency</span>
                Pedir Urgencia por WhatsApp
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="mf-seccion">
        <div className="mf-contenedor">
          <header className="mf-seccion__cabecera">
            <div>
              <p className="mf-sobretitulo mf-sobretitulo--naranja">Farmacia y Nutrición</p>
              <h2 className="mf-seccion__titulo">Los favoritos de nuestra tienda</h2>
            </div>
            <Link className="mf-enlace-flecha" to="/catalogo">
              Ver catálogo completo
            </Link>
          </header>

          <div className="mf-productos">
            {PRODUCTOS_FAVORITOS.map((prod) => (
              <article key={prod.nombre} className={`mf-producto ${prod.claseExtra || ''}`.trim()}>
                <div className="mf-producto__media">
                  <img
                    className="mf-producto__imagen"
                    src={prod.imagen}
                    alt={prod.alt}
                    width="300"
                    height="300"
                    loading="lazy"
                  />
                  <span className="mf-producto__categoria">{prod.categoria}</span>
                  {prod.descuento && (
                    <span className="mf-producto__descuento">{prod.descuento}</span>
                  )}
                </div>

                <div className="mf-producto__valoracion">
                  <span
                    className="mf-producto__estrellas"
                    role="img"
                    aria-label={`${prod.valoracion} de 5 estrellas`}
                    style={{ '--mf-valoracion': prod.valoracion }}
                  >
                    ★★★★★
                  </span>
                  <span className="mf-producto__resenas">({prod.resenas})</span>
                </div>

                <h3 className="mf-producto__nombre">{prod.nombre}</h3>
                <p className="mf-producto__descripcion">{prod.descripcion}</p>

                <div className="mf-producto__pie">
                  <div className="mf-producto__precios">
                    <strong className="mf-producto__precio">S/ {prod.precio.toFixed(2)}</strong>
                    {prod.precioAnterior && (
                      <del className="mf-producto__precio-anterior">S/ {prod.precioAnterior}</del>
                    )}
                  </div>
                  <button
                    className="mf-producto__carrito"
                    type="button"
                    aria-label={`Agregar ${prod.nombre} al carrito`}
                    onClick={() => agregarAlCarrito({ nombre: prod.nombre, precio: prod.precio })}
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">
                      add_shopping_cart
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mf-seccion">
        <div className="mf-diferencia mf-contenedor">
          <div className="mf-diferencia__texto">
            <p className="mf-sobretitulo">Nuestra Diferencia</p>
            <h2 className="mf-seccion__titulo">
              Veterinaria pensada con el corazón y respaldada por la ciencia
            </h2>
            <p className="mf-diferencia__descripcion">
              No somos solo una clínica: somos un ecosistema de bienestar animal donde la empatía,
              el silencio y la tecnología eliminan el miedo de las visitas médicas.
            </p>

            <div className="mf-respaldo">
              <span className="mf-respaldo__icono material-symbols-outlined" aria-hidden="true">
                verified_user
              </span>
              <div>
                <h3 className="mf-respaldo__titulo">Colegiatura y Certificaciones Oficiales</h3>
                <p className="mf-respaldo__texto">
                  Todos nuestros médicos están colegiados por el Colegio Médico Veterinario del
                  Perú.
                </p>
              </div>
            </div>
          </div>

          <ul className="mf-ventajas">
            <li className="mf-ventaja">
              <span className="mf-ventaja__icono material-symbols-outlined" aria-hidden="true">
                medical_services
              </span>
              <h3 className="mf-ventaja__titulo">Médicos Certificados</h3>
              <p className="mf-ventaja__texto">
                Especialistas con formación de postgrado en medicina felina, medicina interna canina
                y ornitología clínica.
              </p>
            </li>

            <li className="mf-ventaja mf-ventaja--instalaciones">
              <span className="mf-ventaja__icono material-symbols-outlined" aria-hidden="true">
                meeting_room
              </span>
              <h3 className="mf-ventaja__titulo">Instalaciones Libres de Estrés</h3>
              <p className="mf-ventaja__texto">
                Salas de espera y consultas físicamente separadas para gatos y perros, difusores de
                feromonas y reducción acústica.
              </p>
            </li>

            <li className="mf-ventaja mf-ventaja--farmacia">
              <span className="mf-ventaja__icono material-symbols-outlined" aria-hidden="true">
                vaccines
              </span>
              <h3 className="mf-ventaja__titulo">Farmacia Veterinaria Completa</h3>
              <p className="mf-ventaja__texto">
                Disponibilidad inmediata de tratamientos crónicos, antibióticos específicos y
                fármacos especializados para aves y exóticos.
              </p>
            </li>

            <li className="mf-ventaja">
              <span className="mf-ventaja__icono material-symbols-outlined" aria-hidden="true">
                chat
              </span>
              <h3 className="mf-ventaja__titulo">Seguimiento Post-Consulta Vía WhatsApp</h3>
              <p className="mf-ventaja__texto">
                No te dejamos solo tras la visita: monitorizamos la recuperación y absorción de
                medicamentos vía mensaje directo con tu doctor.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="mf-seccion">
        <div className="mf-contenedor">
          <div className="mf-guardia">
            <div className="mf-guardia__texto">
              <p className="mf-guardia__etiqueta">
                <span className="mf-guardia__punto" aria-hidden="true"></span>
                Veterinario de Guardia Disponible
              </p>
              <h2 className="mf-guardia__titulo">¿Dudas sobre los síntomas de tu mascota?</h2>
              <p className="mf-guardia__descripcion">
                Habla directamente con nuestro veterinario de turno por WhatsApp. Te orientamos al
                instante, evaluamos la gravedad y agendamos tu turno prioritario.
              </p>
            </div>

            <div className="mf-guardia__accion">
              <a
                className="mf-btn mf-btn--whatsapp mf-guardia__boton"
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined" aria-hidden="true">chat</span>
                Escribir al Veterinario Ahora
              </a>
              <span className="mf-guardia__nota">
                <span className="material-symbols-outlined" aria-hidden="true">bolt</span>
                Respuesta típica en menos de 5 minutos
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}