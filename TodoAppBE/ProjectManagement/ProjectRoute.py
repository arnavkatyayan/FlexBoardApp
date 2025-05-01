from flask import Flask,Blueprint,request,jsonify
from flask_cors import CORS
from ProjectManagement.ProjectService import isProjectPresentService,saveProjectDetails,getDaysEstimation,getProjectsFromDB
project_blueprint = Blueprint('Project', __name__)


@project_blueprint.route('/isProjectPresent', methods=['POST'])
def isProjectPresent():
    userName = request.json.get('userName')
    if userName:
        isProject = isProjectPresentService(userName)
        return str(isProject)
    
@project_blueprint.route('/saveProjectDetails', methods=['POST'])
def saveProject():
    userName = request.json.get('userName')
    description = request.json.get('description')
    priority = request.json.get('priority')
    startTime = request.json.get('startTime')
    deadline = request.json.get('deadline')
    projectName = request.json.get('projectName')
    status = request.json.get('status')
    if userName:
        isSaved = saveProjectDetails(userName,description,priority,startTime,deadline,status,projectName)
        return str(isSaved)

@project_blueprint.route('/getDaysEstimation', methods=['POST'])
def getEstimation():
    priority = request.json.get('priority')
    description = request.json.get('description')
    userName = request.json.get('userName')
    if priority and description and userName:
        getDays = getDaysEstimation(priority,description,userName)
          # ✅ Correct way to return JSON
        return jsonify({
            "success": True,
            "estimated_days": getDays
        })
    else:
        return jsonify({
            "success": False,
            "message": "Priority and StartTime are required!"
        }), 400  # Bad Request
        
@project_blueprint.route('/getProjectDetails', methods=['GET'])
def getProjects():
    userName = request.args.get('userName')
    
    if userName:
        projects = getProjectsFromDB(userName)
        return jsonify({
            "projects":projects,
            "success":False
        })