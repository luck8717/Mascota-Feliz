const botones = document.querySelectorAll('.mf-producto__carrito');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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
    console.table(carrito);
  });
});