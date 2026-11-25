import { useState, useEffect } from "react";
import "../styles/servicios.css";

export default function Servicios() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    mascota: "",
    servicio: "",
    comentarios: "",
  });

  const [reservas, setReservas] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("reservasMascotaFeliz")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("reservasMascotaFeliz", JSON.stringify(reservas));
  }, [reservas]);

  const handleChange = (evento) => {
    const { id, value } = evento.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    const nombreLimpio = formData.nombre.trim();
    const telefonoLimpio = formData.telefono.trim();
    const comentariosLimpios = formData.comentarios.trim();

    if (
      nombreLimpio === "" ||
      telefonoLimpio === "" ||
      formData.mascota === "" ||
      formData.servicio === ""
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (isNaN(telefonoLimpio) || telefonoLimpio.length < 9) {
      alert("Ingresa un número de teléfono o celular válido.");
      return;
    }

    const nuevaCita = {
      nombre: nombreLimpio,
      telefono: telefonoLimpio,
      mascota: formData.mascota,
      servicio: formData.servicio,
      comentarios: comentariosLimpios,
      fecha: new Date().toLocaleDateString(),
    };

    const historialActualizado = [...reservas, nuevaCita];
    setReservas(historialActualizado);

    alert(
      `¡Reserva exitosa, ${nombreLimpio}! Hemos registrado tu cita para tu ${formData.mascota}.`
    );
    console.log("Historial de citas de la sesión:", historialActualizado);

    setFormData({
      nombre: "",
      telefono: "",
      mascota: "",
      servicio: "",
      comentarios: "",
    });
  };

  return (
    <main>
      <section className="mf-banner">
        <div className="mf-contenedor">
          <nav className="mf-migas" aria-label="Migas de pan">
            <a href="/">Inicio</a>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Servicios Médicos</span>
          </nav>
          <p className="mf-sobretitulo">Servicios Médicos</p>
          <h1 className="mf-banner__titulo">Cuidado clínico y estético para tu mascota</h1>
          <p className="mf-banner__texto">
            Medicina preventiva, especialistas por especie, peluquería dermatológica y
            urgencias las 24 horas.
          </p>
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
            <article className="mf-especie mf-especie--perro" id="perros">
              <span className="mf-especie__icono material-symbols-outlined" aria-hidden="true">
                pets
              </span>
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
              <a className="mf-especie__enlace" href="#reserva">
                Reservar cita para mi perro
              </a>
            </article>

            <article className="mf-especie mf-especie--gato" id="gatos">
              <span className="mf-especie__icono material-symbols-outlined" aria-hidden="true">
                cruelty_free
              </span>
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
              <a className="mf-especie__enlace" href="#reserva">
                Reservar cita para mi gato
              </a>
            </article>

            <article className="mf-especie mf-especie--ave" id="aves">
              <span className="mf-especie__icono material-symbols-outlined" aria-hidden="true">
                flutter_dash
              </span>
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
              <a className="mf-especie__enlace" href="#reserva">
                Reservar cita para mi ave
              </a>
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
              <a className="mf-btn mf-btn--primario mf-servicio__boton" href="#reserva">
                <span className="material-symbols-outlined" aria-hidden="true">
                  calendar_month
                </span>
                Reservar cita
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
              <a className="mf-btn mf-btn--primario mf-servicio__boton" href="#reserva">
                <span className="material-symbols-outlined" aria-hidden="true">
                  calendar_month
                </span>
                Reservar cita
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
              <a className="mf-btn mf-btn--primario mf-servicio__boton" href="#reserva">
                <span className="material-symbols-outlined" aria-hidden="true">
                  calendar_month
                </span>
                Reservar cita
              </a>
            </article>

            <article className="mf-servicio mf-servicio--urgencia" id="urgencias">
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
                <span>Urgencias</span>
                <strong className="mf-servicio__precio-valor">24/7</strong>
              </div>
              <a className="mf-btn mf-btn--urgencia mf-servicio__boton" href="tel:+51987654321">
                <span className="material-symbols-outlined" aria-hidden="true">
                  call
                </span>
                Llamar a urgencias
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="mf-seccion" id="peluqueria">
        <div className="mf-contenedor">
          <header className="mf-seccion__cabecera mf-seccion__cabecera--centrada">
            <p className="mf-sobretitulo">Peluquería e higiene</p>
            <h2 className="mf-seccion__titulo">Nuestros Servicios de Grooming</h2>
          </header>

          <div className="mf-grooming">
            <article className="mf-grooming__tarjeta">
              <img
                className="mf-grooming__imagen"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJtYfbBNaq4gwo6w17WqiYluO06lfWZcQasj8tBPbqDd54k24aAXwgcLc&s=10"
                alt="Perro recibiendo baño con champú en tina especial"
                loading="lazy"
              />
              <h3 className="mf-grooming__titulo">Baño e Higiene Completa</h3>
              <p className="mf-grooming__texto">
                Ofrecemos servicio completo de baño con champú dermatológico especial según el tipo
                de pelaje, secado profesional, cepillado y limpieza de oídos y glándulas.
              </p>
            </article>

            <article className="mf-grooming__tarjeta">
              <img
                className="mf-grooming__imagen"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlk1op3vHcpyvDxGYBlAtlGX_yU2xmFp6z9Wm0K8tuyA&s=10"
                alt="Especialista realizando corte de pelo a un perro"
                loading="lazy"
              />
              <h3 className="mf-grooming__titulo">Peluquería Canina y Felina</h3>
              <p className="mf-grooming__texto">
                Cortes de pelo especializados según la raza de tu mascota, deslanado profundo y
                corte de uñas ejecutado por especialistas para evitar el estrés de tu engreído.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mf-seccion" id="reserva">
        <div className="mf-contenedor mf-reserva">
          <div className="mf-reserva__whatsapp">
            <h2 className="mf-reserva__titulo">Agendado Rápido por WhatsApp</h2>
            <p className="mf-reserva__texto">
              ¿Prefieres una atención inmediata? Escríbenos directamente a nuestro WhatsApp oficial
              para coordinar una cita.
            </p>
            <a
              className="mf-btn mf-btn--whatsapp"
              href="https://wa.me/51999999999?text=Hola,%20quisiera%20agendar%20un%20servicio%20para%20mi%20mascota"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                chat
              </span>
              Reservar Cita por WhatsApp
            </a>
          </div>

          <form className="mf-formulario" onSubmit={handleSubmit}>
            <h2 className="mf-formulario__titulo">Formulario de Reserva de Citas</h2>

            <div className="mf-campo">
              <label htmlFor="nombre">Nombre del Cliente:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ej. Juan Pérez"
                autoComplete="name"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mf-campo">
              <label htmlFor="telefono">Teléfono / Celular:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                placeholder="Ej. 987654321"
                autoComplete="tel"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mf-campo">
              <label htmlFor="mascota">Tipo de Mascota:</label>
              <select
                id="mascota"
                name="mascota"
                value={formData.mascota}
                onChange={handleChange}
                required
              >
                <option value="">-- Selecciona una opción --</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="mf-campo">
              <label htmlFor="servicio">Servicio Requerido:</label>
              <select
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                required
              >
                <option value="">-- Selecciona un servicio --</option>
                <option value="bano">Baño e Higiene</option>
                <option value="peluqueria">Corte y Peluquería</option>
                <option value="completo">Servicio Completo (Baño + Corte)</option>
              </select>
            </div>

            <div className="mf-campo">
              <label htmlFor="comentarios">Detalles o Indicaciones Especiales:</label>
              <textarea
                id="comentarios"
                name="comentarios"
                rows="4"
                placeholder="Ej. Alérgico a ciertos champús, temeroso con la secadora..."
                value={formData.comentarios}
                onChange={handleChange}
              />
            </div>

            <button className="mf-btn mf-btn--primario" type="submit">
              Enviar Reserva
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}