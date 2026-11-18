/* MascotaFeliz | Catálogo interactivo */
(() => {
  "use strict";
  const productos = [
  {
    "id": 1,
    "name": "Royal Canin Mini Adult 7.5kg",
    "description": "Nutrición equilibrada para razas pequeñas con soporte digestivo\n              y salud articular.",
    "image": "assets/img/productos/royal-canin.jpg",
    "price": 42.0,
    "pet": "perros",
    "category": "alimentos",
    "brand": "royal-canin",
    "rating": 4.9,
    "reviews": 124,
    "stock": true
  },
  {
    "id": 2,
    "name": "Bravecto Comprimido Masticable Perros (10–20kg)",
    "description": "Protección continua contra pulgas y garrapatas por 12 semanas\n              completas.",
    "image": "assets/img/productos/bravecto.jpg",
    "price": 34.5,
    "pet": "perros",
    "category": "antipulgas",
    "brand": "bravecto",
    "rating": 5.0,
    "reviews": 89,
    "stock": true
  },
  {
    "id": 3,
    "name": "Hill's Prescription Diet Feline c/d Multicare 3.8kg",
    "description": "Soporte urinario comprobado para prevenir cálculos de estruvita\n              en gatos.",
    "image": "assets/img/productos/royal-canin.jpg",
    "price": 52.0,
    "pet": "gatos",
    "category": "farmacia",
    "brand": "hills",
    "rating": 4.8,
    "reviews": 67,
    "stock": true
  },
  {
    "id": 4,
    "name": "ZuPreem FruitBlend Alimento Completo para Loros 1.6kg",
    "description": "Pellets enriquecidos con vitaminas esenciales y sabores a frutas\n              naturales.",
    "image": "assets/img/productos/mezcla-premium.jpg",
    "price": 21.5,
    "pet": "aves",
    "category": "alimentos",
    "brand": "zupreem",
    "rating": 4.9,
    "reviews": 42,
    "stock": true
  },
  {
    "id": 5,
    "name": "Rascador Torre Multinivel para Gatos con Hamaca",
    "description": "Estructura reforzada con postes de sisal natural, plataforma\n              acolchada y zona de descanso.",
    "image": "assets/img/productos/arena-sanitaria.jpg",
    "price": 65.0,
    "pet": "gatos",
    "category": "juguetes",
    "brand": "mascotafeliz",
    "rating": 4.7,
    "reviews": 53,
    "stock": true
  },
  {
    "id": 6,
    "name": "Versele-Laga Prestige Mezcla de Semillas para Canarios 1kg",
    "description": "Fórmula tradicional de semillas selectas y linaza para el canto y\n              la vitalidad.",
    "image": "assets/img/productos/mezcla-premium.jpg",
    "price": 8.9,
    "pet": "aves",
    "category": "alimentos",
    "brand": "versele-laga",
    "rating": 4.8,
    "reviews": 35,
    "stock": true
  },
  {
    "id": 7,
    "name": "Suplemento Articular Condroprotector Mascotas 60 comprimidos",
    "description": "Glucosamina, condroitina y colágeno hidrolizado para mejorar la\n              movilidad articular.",
    "image": "assets/img/productos/bravecto.jpg",
    "price": 28.0,
    "pet": "perros",
    "category": "farmacia",
    "brand": "mascotafeliz",
    "rating": 4.9,
    "reviews": 98,
    "stock": true
  },
  {
    "id": 8,
    "name": "Jaula Espaciosa para Ninfas y Agapornis con Accesorios",
    "description": "Barrotes con recubrimiento no tóxico, bandeja extraíble y apertura\n              superior de juego.",
    "image": "assets/img/productos/mezcla-premium.jpg",
    "price": 89.0,
    "pet": "aves",
    "category": "juguetes",
    "brand": "mascotafeliz",
    "rating": 5.0,
    "reviews": 19,
    "stock": true
  }
];
  const CLAVE_CARRITO = "mascotafeliz_carrito";
  const grid = document.getElementById("catalogo-productos");
  if (!grid) return;

  const form = document.getElementById("form-filtros");
  const buscador = document.getElementById("buscar-productos");
  const ordenar = document.getElementById("ordenar-productos");
  const rango = document.getElementById("precio-maximo");
  const rangoTexto = document.getElementById("precio-maximo-texto");
  const cantidad = document.getElementById("productos-cantidad");
  const filtrosActivos = document.getElementById("filtros-activos");
  const contadorCarrito = document.getElementById("contador-carrito");
  const aviso = document.getElementById("aviso-carrito");
  let avisoTimer;

  const leerCarrito = () => {
    try { return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || []; }
    catch { return []; }
  };
  const guardarCarrito = (carrito) => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    actualizarContador();
  };
  function actualizarContador() {
    const total = leerCarrito().reduce((s, p) => s + p.quantity, 0);
    if (contadorCarrito) {
      contadorCarrito.textContent = total;
      contadorCarrito.setAttribute("aria-label", `${total} productos en el carrito`);
      contadorCarrito.hidden = total === 0;
    }
  }
  function notificar(mensaje) {
    aviso.textContent = mensaje;
    aviso.classList.add("is-visible");
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(() => aviso.classList.remove("is-visible"), 2400);
  }
  const moneda = (valor) => `S/ ${valor.toFixed(2)}`;
  const valores = (nombre) => [...form.querySelectorAll(`input[name="${nombre}"]:checked`)].map(el => el.value);

  function renderizar() {
    const texto = buscador.value.trim().toLocaleLowerCase("es");
    const mascotas = valores("mascota");
    const categorias = valores("categoria");
    const marcas = valores("marca");
    const soloStock = form.querySelector('input[name="stock"]:checked') !== null;
    const precioMax = Number(rango.value);
    let lista = productos.filter(p => {
      const coincideTexto = `${p.name} ${p.description} ${p.brand}`.toLocaleLowerCase("es").includes(texto);
      return coincideTexto
        && (!mascotas.length || mascotas.includes(p.pet))
        && (!categorias.length || categorias.includes(p.category))
        && (!marcas.length || marcas.includes(p.brand))
        && (!soloStock || p.stock)
        && p.price <= precioMax;
    });

    switch (ordenar.value) {
      case "precio-asc": lista.sort((a,b) => a.price-b.price); break;
      case "precio-desc": lista.sort((a,b) => b.price-a.price); break;
      case "rating": lista.sort((a,b) => b.rating-a.rating); break;
      default: lista.sort((a,b) => b.rating-a.rating || a.id-b.id);
    }

    cantidad.textContent = lista.length;
    rangoTexto.textContent = `Hasta ${moneda(precioMax)}`;
    filtrosActivos.innerHTML = "<li>Filtros activos:</li>";
    const etiquetas = [
      ...mascotas.map(v => `Mascota: ${v}`),
      ...categorias.map(v => `Categoría: ${v}`),
      ...marcas.map(v => `Marca: ${v}`),
      ...(soloStock ? ["En stock"] : []),
      ...(precioMax < 120 ? [`Hasta ${moneda(precioMax)}`] : []),
      ...(texto ? [`Búsqueda: ${texto}`] : [])
    ];
    if (!etiquetas.length) {
      const li=document.createElement("li"); li.textContent="Sin filtros"; filtrosActivos.append(li);
    } else etiquetas.forEach(etiqueta => {
      const li=document.createElement("li"); li.textContent=etiqueta; filtrosActivos.append(li);
    });

    if (!lista.length) {
      grid.innerHTML = '<div class="mf-sin-resultados"><span>🔎</span><h3>No encontramos productos</h3><p>Prueba cambiando la búsqueda o quitando algunos filtros.</p></div>';
      return;
    }
    grid.innerHTML = lista.map(p => `
      <article class="mf-tarjeta" data-producto="${p.id}">
        <div class="mf-tarjeta__etiquetas">
          <span class="mf-chip mf-chip--categoria">${p.pet === "perros" ? "🐶 Perros" : p.pet === "gatos" ? "🐱 Gatos" : "🐦 Aves"}</span>
          <span class="mf-chip mf-chip--info">${p.category}</span>
        </div>
        <img class="mf-tarjeta__imagen" src="${p.image}" alt="${p.name}" loading="lazy">
        <p class="mf-tarjeta__stock">● En Stock en Clínica</p>
        <p class="mf-tarjeta__rating"><span class="mf-tarjeta__estrellas" aria-label="${p.rating} de 5 estrellas">★★★★★</span> ${p.rating.toFixed(1)} <span class="mf-tarjeta__resenas">(${p.reviews} reseñas)</span></p>
        <h3 class="mf-tarjeta__nombre">${p.name}</h3>
        <p class="mf-tarjeta__descripcion">${p.description}</p>
        <div class="mf-tarjeta__precio"><strong>${moneda(p.price)}</strong></div>
        <div class="mf-tarjeta__compra">
          <div class="mf-tarjeta__cantidad" aria-label="Cantidad">
            <button type="button" data-cantidad="-1" aria-label="Disminuir cantidad">−</button>
            <span class="cantidad-valor">1</span>
            <button type="button" data-cantidad="1" aria-label="Aumentar cantidad">+</button>
          </div>
          <button class="mf-tarjeta__anadir mf-btn mf-btn--primario" type="button" data-agregar="${p.id}">🛒 Añadir al Carrito</button>
        </div>
        <a class="mf-tarjeta__whatsapp" href="https://wa.me/51999999999" target="_blank" rel="noopener noreferrer">💬 Consultar por WhatsApp</a>
      </article>`).join("");
  }

  form.addEventListener("submit", e => e.preventDefault());
  form.addEventListener("change", renderizar);
  buscador.addEventListener("input", renderizar);
  ordenar.addEventListener("change", renderizar);
  rango.addEventListener("input", renderizar);
  document.getElementById("limpiar-filtros").addEventListener("click", () => {
    form.reset(); buscador.value=""; ordenar.value="populares"; rango.value="120"; renderizar();
  });

  grid.addEventListener("click", e => {
    const card=e.target.closest(".mf-tarjeta");
    if (!card) return;
    const quantityEl=card.querySelector(".cantidad-valor");
    if (e.target.matches("[data-cantidad]")) {
      quantityEl.textContent=Math.max(1, Math.min(99, Number(quantityEl.textContent)+Number(e.target.dataset.cantidad)));
    }
    const addButton=e.target.closest("[data-agregar]");
    if (addButton) {
      const product=productos.find(p => p.id === Number(addButton.dataset.agregar));
      const quantity=Number(quantityEl.textContent);
      const cart=leerCarrito();
      const existing=cart.find(p => p.id === product.id);
      if (existing) existing.quantity += quantity;
      else cart.push({...product, quantity});
      guardarCarrito(cart);
      notificar(`${product.name} se agregó al carrito.`);
      addButton.textContent="✓ Agregado";
      setTimeout(() => { if (addButton.isConnected) addButton.textContent="🛒 Añadir al Carrito"; }, 1100);
    }
  });
  window.addEventListener("storage", actualizarContador);
  actualizarContador();
  renderizar();
})();
