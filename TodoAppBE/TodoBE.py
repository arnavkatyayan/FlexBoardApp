from flask import Flask
from flask_cors import CORS
from LoginUser.LoginRoute import login_blueprint

app = Flask(__name__)
CORS(app)

# Register the blueprint if needed
app.register_blueprint(login_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
