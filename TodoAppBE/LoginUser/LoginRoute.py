from flask import Flask,jsonify,request,Blueprint
from flask_cors import CORS
#from LoginService import check_user
from .LoginService import check_user
from .LoginService import get_coins,changeCoinsService
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
    
@login_blueprint.route('/get_coins', methods=['GET'])
def getCoins():
    username = request.args.get('user')
    
    if not username:
        return jsonify({"error": "Username parameter is missing"}), 400

    coins = get_coins(username)  # Call function properly

    if coins is False:
        return jsonify({"error": "Could not retrieve coins"}), 500
    
    return jsonify({"coins": coins})  # Return JSON response

@login_blueprint.route('/changeCoins', methods=['POST'])
def changeCoins():
    username = request.json.get('userName')
    coins = request.json.get('coins')
    
    if username and coins:
        change = changeCoinsService(username,coins)
        return str(change)


