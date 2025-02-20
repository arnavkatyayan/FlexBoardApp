from flask import Flask,jsonify,request,Blueprint
from flask_cors import CORS
from .SignupService import check_user_exists, save_user_details, check_email_exists
signup_blueprint = Blueprint('signup', __name__)

@signup_blueprint.route('/check_user_exists', methods=['POST'])
def isUserAvailable():
    username = request.json.get('userName')
    if username:
        isPresent = check_user_exists(username)
        return str(isPresent)
    else:
        return False
    
@signup_blueprint.route('/submit_user_details', methods=['POST'])
def submitUserDetails():
    userName = request.json.get('userName')
    password = request.json.get('password')
    email = request.json.get('email')
    if userName and password and email:
        isSaved = save_user_details(userName,email,password)
        return str(isSaved)
    else:
        return False
@signup_blueprint.route('/check_email_exists',methods=['POST'])
def isEmailAvailable():
    email = request.json.get('email')
    if email:
        isPresent = check_email_exists(email)
        return str(isPresent)
    else:
        return False


