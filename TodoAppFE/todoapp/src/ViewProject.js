import React from "react";
import {useState,useEffect} from "react";
import axios from "axios";
import swal from "sweetalert";
import { reusableModalViewProject } from "./ReusableModals&Methods";
import { Button } from "react-bootstrap";

function ViewProject(props) {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const getProjects = async ()=> {
        try {
        const response = await axios.get("http://127.0.0.1:5000/getProjectDetails",{
            params: { userName:props.userName }, 
        });
       setProjects(response.data.projects);
        }
        catch(error) {
            console.log("error fetching projects");
        }
    }

    useEffect(()=> {
        const checkProjectAvailability = async () => {
             await getProjects();
        };
        checkProjectAvailability();
    },[]);

    return (
        
        <div className="project-view">
            {projects.map((project, index) => (
                <div className="project-individual-css">
                    <div className="project-title">{project.project_name}</div>
                    <div className="btn-grps btn-grps-view-project">
                        <Button>Open Project</Button>
                        <Button>Show Project</Button>
                        <Button>Delete Project</Button>
                        </div> 
                </div>
            ))}

        </div>
 )   
}export default ViewProject;