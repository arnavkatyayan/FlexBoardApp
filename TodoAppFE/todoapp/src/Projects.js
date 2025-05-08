import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import StartProject from "./StartProject";
import ViewProject from "./ViewProject";

function Projects(props) {
    const [isProjectsAvailable, setIsProjectsAvailable] = useState(false);
    const [startProject, setStartProject] = useState(false);
    const [viewProject, setViewProject] = useState(false);

    useEffect(() => {
        const checkProjectAvailability = async () => {
            const isPresent = await isProjectPresent();
            setIsProjectsAvailable(isPresent);
        };

        checkProjectAvailability();
    }, []);

    const handleStartProject = () => {
        setStartProject(true);
    }

    const isProjectPresent = async () => {
        const projectRequestBody = {
            userName: props.userName
        }
        try {
            const response = await axios.post("http://127.0.0.1:5000/isProjectPresent", projectRequestBody);
            return response.data === "True";
        }
        catch (error) {
            console.log("Getting error on projects page", error);
        }
    }

    const handleViewProject = () => {
        setViewProject(true);
    }

    if (startProject) {
        return (<StartProject userName={props.userName} coins={props.coins} setCoins={props.setCoins}  getCoinsFromBE={props.getCoinsFromBE}/>);
    }

    if(viewProject) {
        return(<ViewProject userName={props.userName} setViewProject={setViewProject}/>);
    }

    return (
        <div className="Main-Page">
            {/* Project Viewer Section */}
            <div className="login-page shrink-size">
                <h4 className="top-alignment font-weight-props">Project Viewer</h4>
                <hr className="vertical-line" />
                <h5 className="top-alignment heading-margin-top">View your progress.</h5>

                <div className="grid-arrangement top-alignment">
                    <h6> ✅ Track project progress with real-time updates</h6>
                    <h6> ✅ Visualize task completion across all projects</h6>
                    <h6> ✅ Monitor upcoming deadlines and milestones</h6>
                    <h6> ✅ Get weekly productivity and progress summaries</h6>
                    <h6> ✅ Generate detailed reports and performance charts</h6>
                </div>
               
                    <Button
                        className="pricing-btn"
                        onClick={handleViewProject}
                        disabled={!isProjectsAvailable}
                        title={!isProjectsAvailable ? "No projects available" : "click to view projects"}
                    >
                        Click to View Project
                    </Button>
            </div>

            {/* Project Creation Section */}
            <div className="login-page shrink-size">
                <h4 className="top-alignment font-weight-props">Project Creation</h4>
                <hr className="vertical-line" />
                <h5 className="top-alignment heading-margin-top">Start a new project.</h5>

                <div className="grid-arrangement top-alignment">
                    <h6> ✅ Manage multiple projects with ease</h6>
                    <h6> ✅ Define milestones and monitor deadlines</h6>
                    <h6> ✅ Break projects into subtasks with dependencies</h6>
                    <h6> ✅ Track productivity with built-in time tracking</h6>
                    <h6> ✅ Collaborate with teammates and share files</h6>
                </div>
                <Button
                    className="pricing-btn"
                    onClick={handleStartProject}
                    title="click to start your project"
                >
                    Click To Start Project
                </Button>
            </div>
        </div>
    );
}

export default Projects;
