import psycopg2


DATABASE_URL = "postgresql://basedatos:yULK0ktGBtQcvVB6oRIpdpQ8omFgaiFt@dpg-d1dfkmvfte5s73fk7scg-a/basedatos_11n7"

conn = psycopg2.connect(DATABASE_URL, sslmode='require')

def agregar_citas(service_type, date, time,nombre):
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    c = conn.cursor()
    c.execute('''
        INSERT INTO citas(tipo_servicio,fecha, hora,nombre)
        VALUES (%s, %s, %s,%s)
    ''', (service_type, date, time,nombre))

    conn.commit()
    conn.close()

def get_citas():
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    c = conn.cursor()

    c.execute('''
        SELECT * FROM citas ORDER BY fecha, hora
    ''')

    citas = c.fetchall()
    conn.close()
    return citas
