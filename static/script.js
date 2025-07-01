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
  document.getElementById('bookAppointment').addEventListener('click', async function () {
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
