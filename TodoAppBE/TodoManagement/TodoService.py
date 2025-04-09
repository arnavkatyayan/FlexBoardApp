import psycopg2
from psycopg2 import sql

DB_PARAMS = {
    'dbname': 'ToDoApp',
    'user': 'postgres',
    'password': 'bohSVE1@',
    'host': 'localhost',
    'port': '5432'
}

def save_todo(username, todoList, date):
    try:
        connection =psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = """
        INSERT INTO flexboard.todo (username, todo, todo_date)
        VALUES (%s, %s, %s)
        """
        cursor.execute(query,(username,todoList,date))
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
