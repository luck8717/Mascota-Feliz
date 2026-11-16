const boton = document.getElementById('btn-tema');
const icono = boton.querySelector('.material-symbols-outlined');
const pagina = document.documentElement; // la etiqueta <html>

if (localStorage.getItem('tema') === 'oscuro') {
  pagina.classList.add('modo-oscuro');
  icono.textContent = 'light_mode';
}

boton.addEventListener('click', () => {
  const esOscuro = pagina.classList.toggle('modo-oscuro');
  icono.textContent = esOscuro ? 'light_mode' : 'dark_mode';
  localStorage.setItem('tema', esOscuro ? 'oscuro' : 'claro');
});







