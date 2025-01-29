import psycopg2
from psycopg2 import sql

DB_PARAMS = {
    'dbname': 'ToDoApp',
    'user': 'postgres',
    'password': 'bohSVE1@',
    'host': 'localhost',
    'port': '5432'
}

def check_user(username, password):
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        print(username)
        print(password)
        # Query to check if the user exists
        query = sql.SQL("SELECT * FROM user_management.login WHERE username = %s AND password = %s")
        cursor.execute(query, (username, password))
        user = cursor.fetchone()
        print(user)
        return bool(user)  # True if user exists, else False
    except Exception as e:
        print(f"Error occurred: {e}")
        return False
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()