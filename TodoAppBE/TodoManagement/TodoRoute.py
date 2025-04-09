from flask import Flask, jsonify,request,Blueprint
from flask_cors import CORS
from .TodoService import save_todo
todo_blueprint = Blueprint('ToDo',__name__)

@todo_blueprint.route('/saveTodo', methods=['POST'])
def saveTodo():
    username = request.json.get('userName')
    todoList = request.json.get('todoList')
    date = request.json.get('date')

    if username and todoList and date:
        saveData = save_todo(username,todoList,date)
        return str(saveData)