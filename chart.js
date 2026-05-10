const ctx = document.getElementById('graficaVentas').getContext('2d');
new Chart(ctx, {
    type: 'line', // Tipo de gráfica: línea, barra, pie, etc.
    data: {
        labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        datasets: [{
            label: 'Ventas de la Semana ($)',
            data: [400, 520, 450, 700, 600, 950, 800],
            borderColor: '#d4a373',
            backgroundColor: 'rgba(212, 163, 115, 0.2)',
            fill: true,
            tension: 0.4 // Hace que la línea sea curva
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' }
        }
    }
});

function cargarReservas() {
    const tabla = document.getElementById('lista-reservas');
    const datos = JSON.parse(localStorage.getItem('reservas')) || [];

    // Limpiamos la tabla
    tabla.innerHTML = "";

    // Si no hay datos, mostramos un mensaje
    if (datos.length === 0) {
        tabla.innerHTML = "<tr><td colspan='5'>No hay reservas registradas</td></tr>";
        return;
    }

    // Dibujamos cada fila
    datos.forEach((reserva) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${reserva.nombre}</td>
            <td>${reserva.personas}</td>
            <td>${reserva.fecha}</td>
            <td>${reserva.email}</td>
            <td><button class="btn-borrar" onclick="eliminarReserva(${reserva.id})">Finalizar</button></td>
        `;
        tabla.appendChild(fila);
    });
}

function eliminarReserva(id) {
    let datos = JSON.parse(localStorage.getItem('reservas'));
    datos = datos.filter(r => r.id !== id);
    localStorage.setItem('reservas', JSON.stringify(datos));
    cargarReservas(); // Recargamos la tabla
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', cargarReservas);

