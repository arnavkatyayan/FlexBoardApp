from flask import Flask,Blueprint,request
from flask_cors import CORS
from ProjectManagement.ProjectService import isProjectPresentService,saveProjectDetails
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