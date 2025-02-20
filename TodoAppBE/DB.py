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
        
        # Drop the old schema if it exists (CAUTION: This deletes all its tables!)
        drop_old_schema_query = '''
        DROP SCHEMA IF EXISTS user_management CASCADE;
        '''
        cursor.execute(drop_old_schema_query)
        
        # Create New Schema: flexboard
        create_schema_query = '''
        CREATE SCHEMA IF NOT EXISTS flexboard;
        '''
        cursor.execute(create_schema_query)
        
        # Drop employees table if it exists
        drop_employees_table_query = '''
        DROP TABLE IF EXISTS flexboard.employees;
        '''
        cursor.execute(drop_employees_table_query)
        
        # Create Login Table inside the new schema
        create_login_table_query = '''
        CREATE TABLE IF NOT EXISTS flexboard.login (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        '''
        cursor.execute(create_login_table_query)
        create_login_mail_column = '''
        ALTER TABLE flexboard.login
        ADD COLUMN email VARCHAR(100) NOT NULL;
        '''
        cursor.execute(create_login_mail_column)
        # Commit the changes
        connection.commit()
        
        print("Schema 'flexboard' created successfully.")
        print("Table 'employees' deleted (if it existed).")
        print("Table 'login' created successfully.")

    except Exception as error:
        print(f"Error occurred: {error}")
    
    finally:
        # Close the cursor and connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# Run the function
create_schema_and_tables()
