from flask import Flask,jsonify,request,Blueprint
from flask_cors import CORS
#from LoginService import check_user
from .LoginService import check_user
login_blueprint = Blueprint('login', __name__)

@login_blueprint.route('/check_user', methods=['POST'])
def isUserExists():

    username = request.json.get('userName')
    password = request.json.get('password')

    if username and password:
        isPresent = check_user(username,password)
        print(isPresent)
        return str(isPresent)
    else:
        return False


