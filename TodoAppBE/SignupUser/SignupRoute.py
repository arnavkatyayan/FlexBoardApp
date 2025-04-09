from flask import Blueprint, request, current_app
from flask_mail import Message
from .SignupService import check_user_exists, save_user_details, check_email_exists, check_password, send_confirmation_email, send_forgetpass_mail, change_password

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
        isSaved = save_user_details(userName, email, password)
        if isSaved:
            send_confirmation_email(current_app, userName, email)
        return str(isSaved)
    else:
        return False

@signup_blueprint.route('/change_password', methods=['POST'])
def changePassword():
    userName = request.json.get('userName')
    password = request.json.get('newPassword')
    if userName and password:
        isChanged = change_password(userName, password)
        if isChanged:
            return str(isChanged)
        else:
            return False

@signup_blueprint.route('/check_password', methods=['GET'])
def checkPassword():
    userName = request.args.get('username')
    password = request.args.get('password')
    if userName and password:
        checkPass = check_password(userName, password)
        if checkPass:
            return str(checkPass)
        else:
            return 'False'
    else:
        return 'Missing username or password'

@signup_blueprint.route('/send_mail', methods=['POST'])
def sendMail():
    email = request.json.get('email')
    if email:
        isMailSent = send_forgetpass_mail(current_app, email)
        return str(isMailSent)
    else:
        return False
    
@signup_blueprint.route('/check_email_exists', methods=['POST'])
def isEmailAvailable():
    email = request.json.get('email')
    if email:
        isPresent = check_email_exists(email)
        return str(isPresent)
    else:
        return False
