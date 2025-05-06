import psycopg2
from psycopg2 import sql
import pandas as pd
from sklearn.linear_model import LinearRegression

DB_PARAMS = {
    'dbname': 'ToDoApp',
    'user': 'postgres',
    'password': 'bohSVE1@',
    'host': 'localhost',
    'port': '5432'
}
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
            VALUES (%s, %s, %s, %s, %s, %s, %s)
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
            
def getDataFrame(userName):
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = sql.SQL("""
            SELECT priority, description, start_date, end_date
            FROM flexboard.projects
            WHERE username=%s
        """)
        cursor.execute(query, (userName,))
        rows = cursor.fetchall()
        data = []
        for row in rows:
            priority, description, start_date, end_date = row
            if priority and description and start_date and end_date:
                data.append({
                    "priority_encoded": encodePriority(priority),
                    "description_length": len(description.split()),
                    "days_taken": (end_date - start_date).days
                })
        df = pd.DataFrame(data)
        return df
    except Exception as e:
        print(f"Error fetching the data: {e}")
        return pd.DataFrame()
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

            
def getDaysEstimation(priority,description,userName):
    df = getDataFrame(userName)
    model = trainModel(df)
    if model:
        priority_encoded = encodePriority(priority)
        description_length = len(description.split())
        return predict_days(model, priority_encoded, description_length)
    else:
        return None
        
        
def predict_days(model, priority, description_length):
    new_data = pd.DataFrame([[priority, description_length]], columns=['priority_encoded', 'description_length'])
    predicted_days = model.predict(new_data)
    return round(predicted_days[0], 2)
    
def trainModel(df):
    if df.empty:
        return None
    X = df[['priority_encoded', 'description_length']]
    Y = df['days_taken']
    model = LinearRegression()
    model.fit(X,Y)
    return model
    

def encodePriority(priority):
    if priority.lower() == "low":
        return 1
    elif priority.lower() == "medium":
        return 2
    elif priority.lower() == "high":
        return 3
    else:
        return 1
    
def getProjectsFromDB(username):
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = sql.SQL("""SELECT project_name, description, priority, start_date, end_date, status 
            FROM flexboard.projects 
            WHERE username = %s """)
        cursor.execute(query,(username,))
        data = cursor.fetchall()
        columns = ["project_name", "description", "priority", "start_date", "end_date", "status"]
        result = []
        for row in data:
            project = dict(zip(columns,row))
            result.append(project)
        return result
    except Exception as e:
        print("found error while fetching projects")
        return []
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def deleteProjectsServices(userName,projectName):
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = sql.SQL("""DELETE FROM flexboard.projects WHERE username = %s AND project_name = %s""")
        cursor.execute(query,(userName,projectName))
        connection.commit()
        print("Project Deleted successfully!")
        return True
    
    except Exception as e:
        print("Getting error in deleting the row",e)
        return False
    
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
def isProjectTakenService(userName,projectName):
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = sql.SQL("""SELECT project_name, username FROM flexboard.projects WHERE project_name = %s AND username = %s""")
        cursor.execute(query,(projectName,userName))
        row = cursor.fetchone()
        if row:
            return True
        else:
            return False
    except Exception as e:
        print("Getting error while fetching projects")
        return False
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
    

        
