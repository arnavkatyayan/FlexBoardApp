import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import TodoList from "./TodoList";

function Options(props) {
       
    const [isTodoBtnClicked, setIsTodoBtnClicked] = useState(false);
    const [isProjectBtnClicked, setIsProjectBtnClicked] = useState(false);
    
    const handleTodo = () => {
        setIsTodoBtnClicked(true);
    }

    const handleProject = () => {
        setIsProjectBtnClicked(true);
    }

    if (isTodoBtnClicked) {
        return (<TodoList userName={props.userName}/>)
    }
    return (
        <div className='Main-Page'>

            <div className="login-page shrink-size">
                <h4 className="top-alignment font-weight-props">Todo Management</h4>
                <hr className="vertical-line" />
                <h5 className="top-alignment heading-margin-top">Perfect for managing daily tasks.</h5>

                <div className="grid-arrangement top-alignment">
                    <h6> ✅ Create and manage unlimited tasks</h6>
                    <h6> ✅ Assign due dates and receive reminders</h6>
                    <h6> ✅ Recurring tasks for automating daily/weekly work</h6>
                    <h6> ✅ View progress with percentage completion</h6>
                    <h6> ✅ Get insightful task analytics and reports</h6>

                </div>
                <Button className="pricing-btn" onClick={handleTodo}>Click to Start Todo</Button>
            </div>

            <div className="login-page shrink-size">
                <h4 className="top-alignment font-weight-props">Project Management</h4>
                <hr className="vertical-line" />
                <h5 className="top-alignment heading-margin-top">Best for handling large project.</h5>

                <div className="grid-arrangement top-alignment">
                    <h6> ✅ Manage multiple projects seamlessly</h6>
                    <h6> ✅ Track project milestones and deadlines</h6>
                    <h6> ✅ Create subtasks and dependencies</h6>
                    <h6> ✅ Time tracking and productivity reports</h6>
                    <h6> ✅ File sharing and document collaboration</h6>
                </div>
                <Button className="pricing-btn" onClick={handleProject}>Click To Start Project</Button>
            </div>
        </div>
    );
} export default Options;