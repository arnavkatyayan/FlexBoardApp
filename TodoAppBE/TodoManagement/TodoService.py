from flask_mail import Message
import psycopg2
import pandas as pd
import os

DB_PARAMS = {
    'dbname': 'ToDoApp',
    'user': 'postgres',
    'password': 'bohSVE1@',
    'host': 'localhost',
    'port': '5432'
}

def save_todo(username, todoList, date):
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = """
        INSERT INTO flexboard.todo (username, todo, todo_date)
        VALUES (%s, %s, %s)
        """
        cursor.execute(query, (username, todoList, date))
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


EXPORT_DIR = "exports"  # You can customize this folder

def export_to_excel_for_saving(df, name):
    if not os.path.exists(EXPORT_DIR):
        os.makedirs(EXPORT_DIR)
    filename = f"{name}.xlsx"
    filepath = os.path.join(EXPORT_DIR, filename)
    df.to_excel(filepath, index=False, engine='openpyxl')
    return filepath  # ✅ return full path

def store_excel(username, filename):
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = "SELECT * FROM flexboard.todo WHERE username = %s"
        cursor.execute(query, (username,))
        
        # Fetching column names
        columns = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()
        
        # Creating DataFrame and exporting to Excel
        df = pd.DataFrame(rows, columns=columns)
        file_path = export_to_excel_for_saving(df, filename)
        return file_path  # 🔄 return file path instead of True
    except Exception as e:
        print(f"Error occurred: {e}")
        return None
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def send_mail(app, username, mailid, filename):
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = "SELECT * FROM flexboard.todo WHERE username = %s"
        cursor.execute(query, (username,))
        columns = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()
        df = pd.DataFrame(rows, columns=columns)
        file_path = export_to_excel(df, filename)
        mail_function(app, file_path, mailid)
        return True
    except Exception as e:
        print(f"Error occurred: {e}")
        return False
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def export_to_excel(df, name):
    filename = f"{name}.xlsx"
    df.to_excel(filename, index=False, engine='openpyxl')
    return filename

def mail_function(app, filename, mailid):
    with app.app_context():
        msg = Message(
            'Your To-Do List Export',
            sender=app.config['MAIL_USERNAME'],
            recipients=[mailid]
        )
        msg.body = "Hi,\n\nPlease find attached your exported To-Do list."

        with open(filename, 'rb') as file:
            msg.attach(
                filename,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                file.read()
            )
        mail = app.extensions.get('mail')
        mail.send(msg)
        return True
