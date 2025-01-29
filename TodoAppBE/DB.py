import psycopg2

def create_schema_and_tables():
    try:
        # Connect to your PostgreSQL database
        connection = psycopg2.connect(
            dbname="ToDoApp", 
            user="postgres", 
            password="bohSVE1@", 
            host="localhost", 
            port="5432"
        )
        cursor = connection.cursor()
        
        # Create Schema
        create_schema_query = '''
        CREATE SCHEMA IF NOT EXISTS user_management;
        '''
        cursor.execute(create_schema_query)
        
        # Create Employees Table inside the schema
        create_employees_table_query = '''
        CREATE TABLE IF NOT EXISTS user_management.employees (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            age INT,
            department VARCHAR(100),
            date_joined DATE
        );
        '''
        cursor.execute(create_employees_table_query)
        
        # Create Login Table inside the schema
        create_login_table_query = '''
        CREATE TABLE IF NOT EXISTS user_management.login (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        '''
        cursor.execute(create_login_table_query)
        
        # Commit the changes
        connection.commit()
        
        print("Schema and Tables created successfully.")
        
    except Exception as error:
        print(f"Error occurred: {error}")
    
    finally:
        # Close the cursor and connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()


