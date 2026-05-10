const menu = [
  { id: 1, nombre: "Espresso", categoria: "cafe", precio: "$2.50", desc: "Intenso y aromático.", img: "./img/espresso.webp" },
  { id: 2, nombre: "Cappuccino", categoria: "cafe", precio: "$3.50", desc: "Equilibrio perfecto de leche.", img: "./img/cappuccino.webp" },
  { id: 3, nombre: "Cheesecake", categoria: "postres", precio: "$4.50", desc: "Suave con frutos rojos.", img: "./img/cheesecake.jpg" },
  { id: 4, nombre: "Brownie", categoria: "postres", precio: "$3.00", desc: "Chocolate belga con nueces.", img: "./img/brownie.avif" },
  { id: 5, nombre: "Frappé Caramelo", categoria: "cafe", precio: "$5.00", desc: "Café helado con jarabe de caramelo y crema batida.", img: "./img/frappe.jpg" },
  { id: 6, nombre: "Muffin", categoria: "postres", precio: "$3.00", desc: "Esponjoso panqué horneado con arándanos frescos y un toque de vainilla.", img: "./img/muffin.avif"},
];

const contenedor = document.querySelector('.contenedor-productos');
const botones = document.querySelectorAll('.btn-filtro');

// 1. FUNCIÓN PARA MOSTRAR LOS PRODUCTOS
function mostrarMenu(items) {
  let displayMenu = items.map((item) => {
    return `<article class="producto-item">
              <img src="${item.img}" alt="${item.nombre}" class="foto-producto"> 
              <div class="info-producto">
                <h4>${item.nombre}</h4>
                <p class="precio">${item.precio}</p>
                <p>${item.desc}</p>
              </div>
            </article>`;
  }).join(""); 
  
  contenedor.innerHTML = displayMenu;
}

// Cargar todo al inicio
window.addEventListener("DOMContentLoaded", () => {
  mostrarMenu(menu);
});

// 2. LÓGICA DE FILTRADO
botones.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const categoria = e.currentTarget.dataset.id;
    const menuFiltrado = menu.filter((item) => {
      if (item.categoria === categoria) {
        return item;
      }
    });

    if (categoria === "todos") {
      mostrarMenu(menu);
    } else {
      mostrarMenu(menuFiltrado);
    }
  });
});

// 3. LÓGICA DEL FORMULARIO DE RESERVAS CON QR
const formulario = document.getElementById('formulario-reserva');
const mensajeRespuesta = document.getElementById('mensaje-respuesta');

formulario.addEventListener('submit', function(e) {
  e.preventDefault(); 

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const fecha = document.getElementById('fecha').value;
  const personas = document.getElementById('personas').value;

  // Validación rápida
  if (nombre === '' || email === '' || fecha === '') {
    mensajeRespuesta.innerHTML = `<p class="mensaje error">Por favor, llena todos los campos.</p>`;
    return;
  }

  // Simulación de envío
  mensajeRespuesta.innerHTML = `<p class="mensaje info">Procesando tu reserva...</p>`;
  
  setTimeout(() => {
    const infoReserva = `Reserva Solaris: ${nombre} | ${fecha} | ${personas} pers.`;
    const urlQR = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURI(infoReserva)}`;

    mensajeRespuesta.innerHTML = `
      <div class="confirmacion-card">
        <h3 style="color: #5cb85c;">¡Reserva Confirmada!</h3>
        <p>Hola <strong>${nombre}</strong>, revisa tu correo: <strong>${email}</strong></p>
        <img src="${urlQR}" alt="QR" class="qr-img" style="margin: 15px auto; display: block; border: 4px solid #fff; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <p style="font-size: 0.8rem;">Presenta este código al llegar.</p>
      </div>
    `;

        const nuevaReserva = {
        nombre: nombre,
        email: email,
        personas: personas,
        fecha: fecha,
        id: Date.now() // Un ID único basado en la hora
    };

    // Guardamos en localStorage
    let reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservasGuardadas.push(nuevaReserva);
    localStorage.setItem('reservas', JSON.stringify(reservasGuardadas));

    console.log("Reserva guardada en memoria local");
    
    formulario.reset();
  }, 2000);

});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY;
  
  document.querySelectorAll('section').forEach(section => {
    if (scrollPos >= section.offsetTop - 100 && scrollPos < section.offsetTop + section.offsetHeight - 100) {
      const id = section.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
});