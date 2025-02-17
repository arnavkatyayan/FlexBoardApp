import psycopg2
from psycopg2 import sql

DB_PARAMS = {
    'dbname': 'ToDoApp',
    'user': 'postgres',
    'password': 'bohSVE1@',
    'host': 'localhost',
    'port': '5432'
}

def check_user_exists(username):
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = sql.SQL("SELECT * FROM flexboard.login WHERE username = %s")
        cursor.execute(query, (username,))  # Fix: Tuple requires a comma
        user = cursor.fetchone()
        print(user)
        return bool(user)  
    except Exception as e:
        print(f"Error occurred: {e}")
        return False
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

import psycopg2
from psycopg2 import sql

DB_PARAMS = {
    'dbname': 'ToDoApp',
    'user': 'postgres',
    'password': 'bohSVE1@',
    'host': 'localhost',
    'port': '5432'
}

def save_user_details(username, password):
    connection = None
    cursor = None
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        
        query = sql.SQL("INSERT INTO flexboard.login (username, password) VALUES (%s, %s)")
        cursor.execute(query, (username, password))
        
       
        connection.commit()

        return True
    except Exception as e:
        print(f"Error occurred: {e}")
        return False
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


