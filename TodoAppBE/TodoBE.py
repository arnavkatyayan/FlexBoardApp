from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from LoginUser.LoginRoute import login_blueprint
from SignupUser.SignupRoute import signup_blueprint

app = Flask(__name__)
CORS(app)

# Configure Flask-Mail with your Gmail settings
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'ishumisra99@gmail.com'
app.config['MAIL_PASSWORD'] = 'deijwmdulznxbmbd'
app.config['MAIL_DEFAULT_SENDER'] = 'ishumisra99@gmail.com'
app.config['MAIL_SUPPRESS_SEND'] = False

mail = Mail(app)

# Register the blueprint
app.register_blueprint(login_blueprint)
app.register_blueprint(signup_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
