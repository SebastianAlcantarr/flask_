from flask import Flask, render_template, request, jsonify
from db import agregar_citas,get_citas



app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/appointments', methods=['GET'])
def get_appointments_api():
    citas = get_citas()
    print("Citas:", citas)
    return jsonify([{
        'id': a[0],
        'service_type': a[1],
        'date': a[2],
        'time': a[3],
        'nombre': a[4]
    } for a in citas])


@app.route('/api/book', methods=['POST'])
def book_appointment():
    try:
        data = request.get_json()
        agregar_citas(data['service_type'], data['date'], data['time'],data['nombre'])
        return jsonify({'status': 'success'})
    except Exception as e:
        print("Error en la API /api/book:", e)
        return jsonify({'error': 'Error interno del servidor'}), 500


def ver_datos():
   print(get_citas())


if __name__ == '__main__':
    app.run(debug=True)






 
 