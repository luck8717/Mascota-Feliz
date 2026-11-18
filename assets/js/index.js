const botones = document.querySelectorAll('.mf-producto__carrito');
const contador = document.getElementById('contador-carrito');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function actualizarContador() {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.cantidad;
  });

  contador.textContent = total;
  contador.hidden = total === 0;
}

botones.forEach((boton) => {
  boton.addEventListener('click', () => {
    const nombre = boton.dataset.nombre;
    const precio = Number(boton.dataset.precio);

    const existente = carrito.find((p) => p.nombre === nombre);

    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
  });
});

actualizarContador();

const formulario = document.querySelector('.mf-suscripcion');
const campoCorreo = document.getElementById('correo-boletin');
const mensaje = document.getElementById('mensaje-suscripcion');

function mostrarMensaje(texto, esExito) {
  mensaje.textContent = texto;
  mensaje.className = esExito
    ? 'mf-suscripcion__mensaje mf-suscripcion__mensaje--ok'
    : 'mf-suscripcion__mensaje mf-suscripcion__mensaje--error';
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const correo = campoCorreo.value.trim();

  if (correo === '') {
    mostrarMensaje('Escribe tu correo electrónico.', false);
  } else if (!correo.includes('@') || !correo.includes('.')) {
    mostrarMensaje('El correo no es válido. Ejemplo: nombre@correo.com', false);
  } else {
    mostrarMensaje('¡Gracias por suscribirte!', true);
    formulario.reset();
  }
});