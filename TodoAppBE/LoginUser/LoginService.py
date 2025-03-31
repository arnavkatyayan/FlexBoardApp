import psycopg2
from psycopg2 import sql

DB_PARAMS = {
    'dbname': 'ToDoApp',
    'user': 'postgres',
    'password': 'bohSVE1@',
    'host': 'localhost',
    'port': '5432'
}

def get_coins(username):
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = sql.SQL("SELECT coins FROM flexboard.login WHERE username = %s")
        cursor.execute(query, (username,))
        result = cursor.fetchone()
        
        if result:
            return result[0]  # ✅ Return integer coins count
        else:
            return None  # ✅ Return None if no user found

    except Exception as e:
        print(f"Error occurred: {e}")
        return None  # ✅ Return None on error

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def check_user(username, password):
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        # Query to check if the user exists
        query = sql.SQL("SELECT * FROM flexboard.login WHERE username = %s AND password = %s")
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