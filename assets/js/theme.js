const boton = document.getElementById('btn-tema');
const icono = boton.querySelector('.material-symbols-outlined');
const pagina = document.documentElement; // la etiqueta <html>

boton.addEventListener('click', () => {
  if (pagina.classList.contains('modo-oscuro')) {
    pagina.classList.remove('modo-oscuro');
    icono.textContent = 'dark_mode';
    localStorage.setItem('tema', 'claro');
  } else {
    pagina.classList.add('modo-oscuro');
    icono.textContent = 'light_mode';
    localStorage.setItem('tema', 'oscuro');
  }
});

if (localStorage.getItem('tema') === 'oscuro') {
  pagina.classList.add('modo-oscuro');
  icono.textContent = 'light_mode';
}






