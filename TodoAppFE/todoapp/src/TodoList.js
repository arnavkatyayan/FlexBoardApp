import React from "react";
import { useState, useEffect } from "react";
import TypeWriterEffect from "./TypeWriterEffect";
import InfoPage from "./InfoPage";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import AddTodo from "./AddTodo";
function TodoList(props) {
    const [isAddTodoClicked, setIsAddTodoClicked] = useState(false);

    const handleClose = () => {
        setIsAddTodoClicked(false);
    }

    const handleAddTodo = () => {
        setIsAddTodoClicked(true);
    }
    return (
        <div className='Main-Page'>

            <div className="login-page shrink-size shrink-height">
                <h4 className="top-alignment font-weight-props">Todo Viewer</h4>
                <hr className="vertical-line" />
                <h5 className="top-alignment heading-margin-top">Keep collection of your Todo's</h5>

                <div className="grid-arrangement top-alignment">
                    <h6> ✅ View Past Todo's</h6>
                    <h6> ✅ Delete And Edit Todo's</h6>

                </div>
                <Button className="pricing-btn">View Todo</Button>
            </div>

            <div className="login-page shrink-size shrink-height ">
                <h4 className="top-alignment font-weight-props">Todo Management</h4>
                <hr className="vertical-line" />
                <h5 className="top-alignment heading-margin-top">Add your Todos for productivity</h5>

                <div className="grid-arrangement top-alignment">
                    <h6> ✅ Manage multiple Todo's seamlessly</h6>
                    <h6> ✅ Summarise your Todo's with AI</h6>

                </div>
                <Button className="pricing-btn" onClick={handleAddTodo}>Add Todo</Button>
               <AddTodo isAddTodoClicked={isAddTodoClicked} handleClose={handleClose} userName={props.userName}/>
            </div>
            <div className="login-page shrink-size shrink-height">
                <h4 className="top-alignment font-weight-props">Todo Storage</h4>
                <hr className="vertical-line" />
                <h5 className="top-alignment heading-margin-top">Store and Share your Todo.</h5>

                <div className="grid-arrangement top-alignment">
                    <h6> ✅ Store your Todo's locally</h6>
                    <h6>✅ Share with your friends </h6>

                </div>
                <Button className="pricing-btn">Store Todo</Button>
            </div>
        </div>
    )
}
export default TodoList;

