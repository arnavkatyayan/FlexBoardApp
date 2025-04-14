from flask import Flask, jsonify,request,Blueprint,current_app
from flask_cors import CORS
from .TodoService import save_todo,send_mail
todo_blueprint = Blueprint('ToDo',__name__)

@todo_blueprint.route('/saveTodo', methods=['POST'])
def saveTodo():
    username = request.json.get('userName')
    todoList = request.json.get('todoList')
    date = request.json.get('date')

    if username and todoList and date:
        saveData = save_todo(username,todoList,date)
        return str(saveData)

@todo_blueprint.route('/sendMailTodo',methods=['POST'])
def sendMail():
    username = request.json.get('userName')
    filename = request.json.get('fileName')
    mailId = request.json.get('emailId')
    if username and filename and mailId:
        sendMail = send_mail(current_app,username,mailId,filename)
        return str(sendMail)