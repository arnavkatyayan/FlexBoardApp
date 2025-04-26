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

def saveProjectDetails(userName,description,priority,startTime,deadline,status,projectName):
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()

        query = sql.SQL("""
            INSERT INTO flexboard.projects (username, description, priority, start_date, end_date, status, project_name)
            VALUES (%s, %s, %s, %s, %s, %s)
        """)

        cursor.execute(query, (userName, description, priority, startTime, deadline, status, projectName))
        connection.commit()

        return True

    except Exception as e:
        print(f"Error occurred while saving project details: {e}")
        return False

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
        
