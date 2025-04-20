import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import {useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import Select from "react-dropdown-select";
function StartProject(props) {

    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("Low");

    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleStartTime = (event) => {
        setStartTime(event.target.value);
    }

    const handleDeadline = (event) => {
        setDeadline(event.target.value);
    }

    const handlePriority = (event) => {
        setPriority(event.target.value);
    }

    const handleStartProject = ()=> {

    }

    const handleReset = () => {
        setDescription("");
        setDeadline("");
        setPriority("Low");
        setStartTime("");
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
                <div className='btn-grps btn-grps-signup'>
                    <Button variant="primary" className='btn' onClick={handleStartProject}>
                        Start
                    </Button>
                    <Button variant="primary" className='btn' onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    </div>
    
    )
}
export default StartProject;