import React from "react";
import {useState,useEffect} from "react";
import axios from "axios";
import swal from "sweetalert";
import { ReusableModalViewProject } from "./ReusableModals&Methods";
import { Button } from "react-bootstrap";

function ViewProject(props) {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null); 

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

    const handleDeleteProjects = async (project) => {
        const deleteProjectDetails = {
            userName:props.userName,
            projectName:project.project_name
        };
        try {
            const response = await axios.post("http://127.0.0.1:5000/deleteProject",deleteProjectDetails);
            if(response.data.success === true) {
                swal("Success","Project Deleted","success");
                getProjects();
            }
            else {
                swal("Error","Error deleting the project","error");
            }
        }catch(error) {
            swal("Error","Error deleting the project","error");
            console.log("Error while deleting the project", error);
        }

    }

    const handleClose = () => {
        setShowModal(false);
        setSelectedProject(null);
    };

    const handleShowProject = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    return (
        <div className="project-view">
            {projects.map((project, index) => (
                <div className="project-individual-css" key={index}>
                    <div className="project-title">{project.project_name}</div>
                    <div className="btn-grps btn-grps-view-project">
                        <Button>Open Project</Button>
                        <Button onClick={() => handleShowProject(project)}>Project Details</Button>
                        <Button onClick={()=> handleDeleteProjects(project)}>Delete Project</Button>
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