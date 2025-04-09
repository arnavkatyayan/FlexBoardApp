import psycopg2
import random
from flask_mail import Message
from psycopg2 import sql

DB_PARAMS = {
    'dbname': 'ToDoApp',
    'user': 'postgres',
    'password': 'bohSVE1@',
    'host': 'localhost',
    'port': '5432'
}

def check_user_exists(username):
    connection = None
    cursor = None
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = sql.SQL("SELECT * FROM flexboard.login WHERE username = %s")
        cursor.execute(query, (username,))
        user = cursor.fetchone()
        return bool(user)
    except Exception as e:
        print(f"Error occurred: {e}")
        return False
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def check_email_exists(email):
    connection = None
    cursor = None
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = sql.SQL("SELECT * FROM flexboard.login WHERE email = %s")
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        return bool(user)
    except Exception as e:
        print(f"Error occurred: {e}")
        return False
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def save_user_details(username, email, password):
    connection = None
    cursor = None
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = sql.SQL("INSERT INTO flexboard.login (username, email, password) VALUES (%s, %s, %s)")
        cursor.execute(query, (username, email, password))
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

def send_confirmation_email(app, username, email):
    with app.app_context():
        msg = Message('Welcome to FlexBoard', 
                      sender=app.config['MAIL_USERNAME'], 
                      recipients=[email])
        msg.body = f"Hello {username},\n\nThank you for registering {username} with FlexBoard. We're excited to have you on board!"
        mail = app.extensions.get('mail')
        mail.send(msg)

def change_password(username, password):
    connection = None
    cursor = None
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = sql.SQL("UPDATE flexboard.login SET password = %s WHERE username = %s")
        cursor.execute(query, (password, username))
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
def check_password(username,password):
    connection = None
    cursor = None
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = sql.SQL("Select * from flexboard.login where username =%s")
        cursor.execute(query, (username,))
        user = cursor.fetchone()
        if user and user[1]== username and user[2] == password:
            return True
        else:
            return False
    except Exception as e:
        print(f"Error occurred: {e}")
        return False
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
    
def send_forgetpass_mail(app, email):
    with app.app_context():
        new_password = gen_pass()
        msg = Message('Password Reset', 
                      sender=app.config['MAIL_USERNAME'], 
                      recipients=[email])
        msg.body = f"Hello,\n\nYou requested a password reset. Your new password is: {new_password}"
        mail = app.extensions.get('mail')
        mail.send(msg)
        return True

def gen_random_no():
    return random.randint(8, 15)

def gen_pass():
    length = gen_random_no()
    lower_case = 'abcdefghijklmnopqrstuvwxyz'
    upper_case = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    numbers = '0123456789'
    special = '!@#$%^&*()-_=+[]{}|;:,.<>?'
    all_chars = lower_case + upper_case + numbers + special

    # Ensure at least one character from each group
    password = (
        random.choice(lower_case) +
        random.choice(upper_case) +
        random.choice(numbers) +
        random.choice(special)
    )

    # Fill remaining length
    for _ in range(length - 4):
        password += random.choice(all_chars)

    return password
