import psycopg2
from psycopg2 import sql

DB_PARAMS = {
    'dbname': 'ToDoApp',
    'user': 'postgres',
    'password': 'bohSVE1@',
    'host': 'localhost',
    'port': '5432'
}
#checking if the project is present function.
def isProjectPresentService(userName):
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = sql.SQL("SELECT project_name FROM flexboard.projects WHERE username = %s")
        cursor.execute(query,(userName,))
        result = cursor.fetchone()
        if result:
            return True
        else:
            return False
        
    
    except Exception as e:
        print(f"Error occurred: {e}")
        return None 
    
    
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
        
