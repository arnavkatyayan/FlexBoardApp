import React from "react";
import {useState,useEffect} from "react";
import axios from "axios";
import swal from "sweetalert";
import { ReusableModalViewProject } from "./ReusableModals&Methods";
import { Button } from "react-bootstrap";
import Open from './openProject.png';
import Delete from './deleteProject.png';
import Details from './detailsProject.png';
import StartProject from "./StartProject";
import OpenProject from "./OpenProject";

function ViewProject(props) {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null); 
    const [isStartProjectClicked, setIsStartProjectClicked] = useState(false);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/getProjectDetails", {
                    params: { userName: props.userName },
                });
                setProjects(response.data.projects);
            } catch (error) {
                console.log("error fetching projects");
            }
        };
        getProjects();
    }, []);

    const handleDeleteProjects = async (project) => {
        const deleteProjectDetails = {
            userName: props.userName,
            projectName: project.project_name,
        };
    
        try {
            const response = await axios.post("http://127.0.0.1:5000/deleteProject", deleteProjectDetails);
            if (response.data.success === true) {
                const updatedResponse = await axios.get("http://127.0.0.1:5000/getProjectDetails", {
                    params: { userName: props.userName },
                });
            const updatedProjects = updatedResponse.data.projects;
                setProjects(updatedProjects);
                await swal("Success", "Project Deleted", "success");
                if (updatedProjects.length === 0) {
                    props.setViewProject(false);
                }
            } else {
                swal("Error", "Error deleting the project", "error");
            }
        } catch (error) {
            swal("Error", "Error deleting the project", "error");
            console.log("Error while deleting the project", error);
        }
    };
    

    const handleClose = () => {
        setShowModal(false);
        setSelectedProject(null);
    };

    const handleShowProject = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const handleOpenProject = (project) => {
        setSelectedProject(project);
        setIsStartProjectClicked(true);
    }

    if (isStartProjectClicked) {
        return(
            <OpenProject selectedProject={selectedProject}/>
        )
    }
    return (
        <div className="project-view">
            {projects.map((project, index) => (
                <div className="project-individual-css" key={index}>
                    <div className="project-title">{project.project_name}</div>
                    <div className="btn-grps btn-grps-view-project">
                       <img src={Open} title="Open Project" className="view-project-icons" onClick={()=>handleOpenProject(project)}/>
                       <img src={Details} title="Project Details" className="view-project-icons details-icon" onClick={() => handleShowProject(project)}/>
                       <img src={Delete} title="Delete Project" className="view-project-icons" onClick={()=> handleDeleteProjects(project)}/>
                    </div>
                </div>
            ))}

            {selectedProject && (
                <ReusableModalViewProject
                    showModal={showModal}
                    handleClose={handleClose}
                    project={selectedProject} 
                />
            )}
        </div>
    );
}export default ViewProject;