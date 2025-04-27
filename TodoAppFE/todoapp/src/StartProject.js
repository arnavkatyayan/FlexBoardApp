import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import {useState, useEffect} from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Select from "react-dropdown-select";
import swal from "sweetalert";
import axios from "axios";
function StartProject(props) {

    const [description, setDescription] = useState("");
    const [projectName, setProjectName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("low");
    const [status, setStatus] = useState("not started");
    const [isEstimationClicked, setIsEstimateClicked] = useState(false);
    
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleEstimation = async () => {
        if(description.trim().length === 0 && priority.trim().length === 0) {
            swal("Error","Enter the description and priority for prediction","error");
            return;
        }
        const estimationRequestBody = {
            userName:props.userName,
            description:description,
            priority:priority
        }
        try {
            const response = await axios.post("http://127.0.0.1:5000/getDaysEstimation", estimationRequestBody);
            swal("Info", `It will take around (${response.data.estimated_days}) days to complete based on your past experiences.`, "info");
        }
        catch(error) {
            swal("Error","Error fetching the estimation","error");
            console.log("caught error while fetching");
        }

    }

    const handleStartTime = (event) => {
        setStartTime(event.target.value);
    }

    const changeCoinsStatus = async ()=> {
        const coinChangePayload = {
            coins:props.coins+10,
            userName:props.userName
        };
        const response = await axios.post("http://127.0.0.1:5000/changeCoins", coinChangePayload);
        return response.data;
    }

    const handleDeadline = (event) => {
        setDeadline(event.target.value);
    }

    const handlePriority = (event) => {
        setPriority(event.target.value);
    }

    const handleProjectName = (event) => {
        setProjectName(event.target.value);
    }

    const handleStatus = (event) => {
        setStatus(event.target.value);
    }

    const handleStartProject = async ()=> {
        const projectRequestBody = {
            userName:props.userName,
            description:description,
            priority:priority,
            startTime:startTime,
            deadline:deadline,
            projectName:projectName,
            status:status
        }

        try {
            const response = await axios.post("http://127.0.0.1:5000/saveProjectDetails", projectRequestBody);
            if(response.data === "True") {
                changeCoinsStatus();
                swal("Success","Project Created","success");
                props.getCoinsFromBE(props.userName);
               
            }
        }
        catch(error) {
            swal("Error","Error saving the project","error");
            console.log("Error Saving project",error);
        }
    }
    
    const handleReset = () => {
        setDescription("");
        setDeadline("");
        setPriority("Low");
        setStartTime("");
        setProjectName("");
        setStatus("Not Started");
    }

    return(
        <div className='Main-Page'>
        <div className='login-page'>
            <Form className='form login-css'>
                <Form.Group controlId="formUsername">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        style={{ width: '15vw' }}
                        value={props.userName}
                        disabled={true}
                    />
                </Form.Group>
                <Form.Group controlId="formUsername">
                    <Form.Control
                        type="text"
                        placeholder="Project Name"
                        style={{ width: '15vw' }}
                        value={projectName}
                        onChange={handleProjectName}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Control
                        as="textarea"
                        placeholder="Description"
                        value={description}
                        onChange={handleDescription}
                        style={{ width: '15vw' }}
                    />
                </Form.Group>
                <Form.Group controlId="formStartDate">
                    <Form.Control
                        type="date"
                        placeholder="Start Date"
                        style={{ width: '15vw'}}
                        value={startTime}
                        onChange={handleStartTime}
                    />
                  
                </Form.Group>
                <Form.Group controlId="formDeadline" className="flex">
                    <Form.Control
                        type="date"
                        placeholder="Deadline"
                        style={{ width: '15vw' }}
                        value={deadline}
                        onChange={handleDeadline}
                    />
                    
                </Form.Group>
                    <Form.Group controlId="formPriority">
                        <Form.Select className="project-select"
                        value={priority}
                        onChange={handlePriority}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formPriority">
                        <Form.Select className="project-select"
                        value={status}
                        onChange={handleStatus}
                        >
                            <option value="not started">Not Started</option>
                            <option value="started">Started</option>
                            <option value="finished">Finished</option>
                            
                        </Form.Select>
                    </Form.Group>
                <div className='btn-grps btn-grps-signup'>
                    <Button variant="primary" className='btn' onClick={handleStartProject}>
                        Start
                    </Button>
                    <Button variant="primary" className='btn' onClick={handleReset}>
                        Reset
                    </Button>
                    <Button variant="primary" className='btn-ai' onClick={handleEstimation}>
                        Estimate(AI)
                    </Button>
                </div>
            </Form>
        </div>
    </div>
    
    )
}
export default StartProject;