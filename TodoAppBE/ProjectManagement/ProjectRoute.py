from flask import Flask,Blueprint,request,jsonify
from flask_cors import CORS
from ProjectManagement.ProjectService import isProjectPresentService,saveProjectDetails,getDaysEstimation,getProjectsFromDB, deleteProjectsServices, isProjectTakenService
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
        return jsonify({
            "success": True,
            "estimated_days": getDays
        })
    else:
        return jsonify({
            "success": False,
            "message": "Priority and StartTime are required!"
        }), 400 
        
@project_blueprint.route('/getProjectDetails', methods=['GET'])
def getProjects():
    userName = request.args.get('userName')
    
    if userName:
        projects = getProjectsFromDB(userName)
        return jsonify({
            "projects":projects,
            "success":False
        })
        
@project_blueprint.route('/deleteProject', methods=['POST'])
def deleteProject():
    userName = request.json.get('userName')
    projectName = request.json.get('projectName')
    if userName and projectName:
        isDeleted = deleteProjectsServices(userName,projectName)
        if isDeleted:
           return jsonify({
               "success":True
           })
        else:
            return jsonify({
                "success":False
            })
            
@project_blueprint.route('/isProjectPresent', methods=['GET'])
def isProjectTaken():
    userName = request.args.get('userName')
    projectName = request.args.get('projectName')
    if userName and projectName:
        isProject = isProjectTakenService(userName,projectName)
        if isProject:
            return jsonify({
                "data":True
            })
        else:
            return jsonify({
                "data":False
            })
                