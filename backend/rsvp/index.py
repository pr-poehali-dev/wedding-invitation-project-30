import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Сохраняет анкету гостя в базу данных"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    attending = body.get('attending', 'yes')
    guests = int(body.get('guests', 1))
    dietary = body.get('dietary', '').strip()
    message = body.get('message', '').strip()

    if not name:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя обязательно'})
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO rsvp (name, attending, guests, dietary, message) VALUES (%s, %s, %s, %s, %s) RETURNING id",
        (name, attending, guests, dietary, message)
    )
    row_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'id': row_id})
    }
