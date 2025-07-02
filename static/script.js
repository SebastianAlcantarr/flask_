function mostrarPopup(texto, color = '#28a745') {
  const div = document.getElementById('mensaje-popup');
  div.textContent = texto;
  div.style.backgroundColor = color;
  div.style.display = 'block';

  setTimeout(() => {
    div.style.display = 'none';
  }, 3000); // Se oculta automáticamente después de 3 segundos
}

function llenarCampos(texto,color='rgba(131,59,155,0.84)'){
const div = document.getElementById('mensaje-popup');
  div.textContent = texto;
  div.style.backgroundColor = color;
  div.style.display = 'block';

  setTimeout(() => {
    div.style.display = 'none';
  }, 3000);
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
        llenarCampos('error al agendar la cita');
      }

    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('No se pudo conectar con el servidor.');
    }
  });
});





document.addEventListener('DOMContentLoaded', function () {
  const boton = document.getElementById('cargarDatosBtn');
  const resultado = document.getElementById('resultado');

  boton.addEventListener('click', async function () {
    try {
     const response = await fetch('https://flask-7ebi.onrender.com/api/app', {
        method: 'GET'
     });


      const data = await response.json();
      console.log('Datos obtenidos:', data);

      // Limpiar contenido anterior
      resultado.innerHTML = '';

      if (data.length === 0) {
        resultado.innerText = 'No hay citas registradas.';
        return;
      }

      // Mostrar citas
      data.forEach(cita => {
        const citaDiv = document.createElement('div');
        citaDiv.innerHTML = `
          <strong>ID:</strong> ${cita.id} <br>
          <strong>Servicio:</strong> ${cita.service_type} <br>
          <strong>Fecha:</strong> ${cita.date} <br>
          <strong>Hora:</strong> ${cita.time} <br>
          <strong>Nombre:</strong> ${cita.nombre}
          <hr>
        `;
        resultado.appendChild(citaDiv);
      });

    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('No se pudo conectar con el servidor.');
    }
  });
});
