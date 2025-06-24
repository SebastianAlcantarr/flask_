document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'dayGridMonth',
        events: '/api/appointments' // FullCalendar obtiene citas desde Flask aquí
    });

    calendar.render();

    document.getElementById('bookAppointment').addEventListener('click', async function () {
        const serviceType = document.getElementById('serviceType').value;
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;

        if (!serviceType || !date || !time) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const response = await fetch('/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service_type: serviceType,
                date: date,
                time: time
            })
        });

        if (response.ok) {
            alert('Cita agendada con éxito');
            calendar.refetchEvents(); // Vuelve a cargar las citas en el calendario
        } else {
            alert('Hubo un error al agendar la cita.');
        }
    });
});
