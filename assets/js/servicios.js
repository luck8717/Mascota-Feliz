// Gestión de Reservas de Citas con localStorage y Validación 
const formularioReserva = document.querySelector(".mf-formulario");

// Recuperamos las reservas previas del navegador o iniciamos un array vacío
let reservas = JSON.parse(localStorage.getItem("reservasMascotaFeliz")) || [];

if (formularioReserva) {
  formularioReserva.addEventListener("submit", (evento) => {
    evento.preventDefault(); // Evita que la página se recargue bruscamente

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mascota = document.getElementById("mascota").value;
    const servicio = document.getElementById("servicio").value;
    const comentarios = document.getElementById("comentarios").value.trim();

    if (nombre === "" || telefono === "" || mascota === "" || servicio === "") {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (isNaN(telefono) || telefono.length < 9) {
      alert("Ingresa un número de teléfono o celular válido.");
      return;
    }

    // Creamos el objeto de la nueva cita
    const nuevaCita = {
      nombre,
      telefono,
      mascota,
      servicio,
      comentarios,
      fecha: new Date().toLocaleDateString()
    };

    // Agregamos la cita al arreglo usando .push()
    reservas.push(nuevaCita);

    // Guardamos permanentemente en el navegador (LocalStorage)
    localStorage.setItem("reservasMascotaFeliz", JSON.stringify(reservas));

    alert(`¡Reserva exitosa, ${nombre}! Hemos registrado tu cita para tu ${mascota}.`);
    
    console.log("Historial de citas de la sesión:", reservas);

    formularioReserva.reset();
  });
}