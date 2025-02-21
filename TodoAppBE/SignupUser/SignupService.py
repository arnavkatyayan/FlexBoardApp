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
    try:
        connection = psycopg2.connect(**DB_PARAMS)
        cursor = connection.cursor()
        query = sql.SQL("SELECT * FROM flexboard.login WHERE username = %s")
        cursor.execute(query, (username,))  # Fix: Tuple requires a comma
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

def send_forgetpass_mail(app, email):
    with app.app_context():
        msg = Message('Password Reset', 
                      sender=app.config['MAIL_USERNAME'], 
                      recipients=[email])
        msg.body = f"Hello,\n\nYou requested a password reset. Your new password is {gen_pass()}."
        mail = app.extensions.get('mail')
        mail.send(msg)
        return True

def gen_random_no():
    return random.randint(8,15)

def gen_pass():
    len = gen_random_no()
    password = ""
    lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    numberChars = '0123456789'
    specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?'
    randomStr = lowerCaseChars+upperCaseChars+numberChars+specialChars
    password = password+random.choice(lowerCaseChars)+random.choice(upperCaseChars)+random.choice(numberChars)+random.choice(specialChars)
    for i in range(0,len-4):
        password = password+random.choice(randomStr)

    return password



