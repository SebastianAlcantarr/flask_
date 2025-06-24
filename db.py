import sqlite3


def add_citas(service_type, date, time,nombre):
    conn = sqlite3.connect('identifier.sqlite')
    c = conn.cursor()
    c.execute('''
        INSERT INTO citas(tipo_servicio,fecha, hora,nombre)
        VALUES (?, ?, ?,?)
    ''', (service_type, date, time,nombre))

    conn.commit()
    conn.close()

def get_citas():
    conn = sqlite3.connect('identifier.sqlite')
    c = conn.cursor()

    c.execute('''
        SELECT * FROM citas ORDER BY fecha, hora
    ''')

    citas = c.fetchall()
    conn.close()
    return citas


