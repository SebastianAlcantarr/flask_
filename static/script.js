function mostrarPopup(texto, color = '#28a745') {
  const div = document.getElementById('mensaje-popup');
  div.textContent = texto;
  div.style.backgroundColor = color;
  div.style.display = 'block';

  setTimeout(() => {
    div.style.display = 'none';
  }, 3000); // Se oculta automáticamente después de 3 segundos
}

function llenarCampos(texto,color='#ff0000'){
const div = document.getElementById('mensaje-popup');
  div.textContent = texto;
  div.style.backgroundColor = color;
  div.style.display = 'block';

  setTimeout(() => {
    div.style.display = 'none';
  }, 1500);
}


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('boton_guardar').addEventListener('click', async function () {
    const serviceType = document.getElementById('serviceType').value;
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const nombre = document.getElementById('appointmentname').value;

    if (!serviceType || !date || !time || !nombre) {
      llenarCampos('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          service_type: serviceType,
          date: date,
          time: time,
          nombre: nombre,
        })
      });

      if (response.ok) {
        mostrarPopup('Cita agendada con éxito.');
        document.getElementById('serviceType').value = '';
        document.getElementById('appointmentDate').value = '';
        document.getElementById('appointmentTime').value = '';
        document.getElementById('appointmentname').value = '';
      } else {
        llenarCampos('Error al agendar la cita');
      }

    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('No se pudo conectar con el servidor.');
    }
  });
});




document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('boton_ver').addEventListener('click', async function () {
    try {
      const response = await fetch('/api/appointments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Respuesta no OK');

      const data = await response.json();

      // Seleccionamos el cuerpo de la tabla
      const cuerpoTabla = document.getElementById('cuerpo_tabla');
      cuerpoTabla.innerHTML = ''; // Limpiar tabla antes de insertar nuevos datos

      // Recorrer cada cita y crear una fila
      data.forEach(cita => {
        const fila = document.createElement('tr');

        // Crear celdas
        const celdaId = document.createElement('td');
        celdaId.textContent = cita.id;

        const celdaServicio = document.createElement('td');
        celdaServicio.textContent = cita.service_type;

        const celdaFecha = document.createElement('td');
        celdaFecha.textContent = cita.date;

        const celdaHora = document.createElement('td');
        celdaHora.textContent = cita.time;

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = cita.nombre;

        // Agregar celdas a la fila
        fila.appendChild(celdaId);
        fila.appendChild(celdaServicio);
        fila.appendChild(celdaFecha);
        fila.appendChild(celdaHora);
        fila.appendChild(celdaNombre);

        // Agregar fila al cuerpo de la tabla
        cuerpoTabla.appendChild(fila);
      });

    } catch (error) {
      console.error('Error en la solicitud', error);
      alert('No se conectó con el servidor');
    }
  });
});
