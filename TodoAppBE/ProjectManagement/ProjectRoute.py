from flask import Flask,Blueprint,request
from flask_cors import CORS
from ProjectManagement.ProjectService import isProjectPresentService
project_blueprint = Blueprint('Project', __name__)


@project_blueprint.route('/isProjectPresent', methods=['POST'])
def isProjectPresent():
    userName = request.json.get('userName')
    if userName:
        isProject = isProjectPresentService(userName)
        return str(isProject)