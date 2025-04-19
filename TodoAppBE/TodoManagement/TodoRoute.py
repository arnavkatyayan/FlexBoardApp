from flask import Flask, jsonify,request,Blueprint,current_app,send_file
from flask_cors import CORS
from .TodoService import save_todo,send_mail,store_excel
import os
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
    
@todo_blueprint.route('/saveExcelTodo', methods=['POST'])
def storeExcel():
    username = request.json.get('userName')
    filename = request.json.get('excelFileName')
    
    if username and filename:
        saved_file = store_excel(username, filename)
        if saved_file and os.path.exists(saved_file):
            return send_file(saved_file, as_attachment=True, download_name=f"{filename}.xlsx")
        else:
            return jsonify({"success": False, "message": "File not found"}), 404
    return jsonify({"success": False, "message": "Invalid input"}), 400