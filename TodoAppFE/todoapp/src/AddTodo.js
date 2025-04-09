import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
function AddTodo(props) {
    const [todoList, setTodoList] = useState([{ id: 0, todoVal: "" }]);

    const handleTodoChange = (index, value) => {
        setTodoList(prevTodoList => {
            const newTodoList = [...prevTodoList];
            newTodoList[index].todoVal = value; 
            return newTodoList;
        });
    }

    const handleAddTodo = () => {
        setTodoList(prevTodoList => [
            ...prevTodoList,
            { id: prevTodoList.length, todoVal: "" }
        ]);
    };
    const getDate = ()=> {
        const date = new Date();
        return date.toISOString();
    }
    const handleSave = async () => {
        const payloadData ={
            userName:props.userName,
            todoList:JSON.stringify(todoList), 
            date: getDate()
        };
        
        const response = await axios.post("http://127.0.0.1:5000/saveTodo",payloadData);
        if(response.data === "True") {
            swal("Success!","Thanks for saving the ToDo","success");
            setTodoList([{ id: 0, todoVal: "" }]);      
        }
        else {
            swal("Error!","Error saving the ToDo","error");
        }
        props.handleClose();
    };

    const handleReset = () => {
        setTodoList([{ id: 0, todoVal: "" }]);
    };

    return (
        <Modal show={props.isAddTodoClicked} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Todo</Modal.Title>
                <Button variant="primary" className="todo-btn" onClick={handleAddTodo}>
                    Add Todo
                </Button>
            </Modal.Header>
            <Modal.Body className="modal-body todo-form-others">
                <Form className="todo-form-others">
                    {todoList.map((todo, index) => (
                        <div key={todo.id} className="todo-others">
                            <Form.Label>Todo {index + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                className="todo-textfield"
                                value={todo.todoVal}
                                onChange={(e) => handleTodoChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="todo-footer-btns">
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="primary" onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default AddTodo;