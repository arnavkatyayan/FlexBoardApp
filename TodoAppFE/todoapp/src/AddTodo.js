// import React from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { useState, useEffect } from "react";

// function AddTodo(props) {
//     const [firstTodo, setFirstTodo] = useState("");
//     const [todoList, setTodoList] = useState([{ id: 0, todoVal: "" }]);
//     const [firstTodoAdded, setFirstTodoAdded] = useState(true);
//     const todoHeadings = [ "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];

//     // useEffect(() => {
//     //     if (firstTodo.trim().length !== 0) {
//     //         setFirstTodoAdded(false);
//     //     } else {
//     //         setFirstTodoAdded(true);
//     //     }
//     // }, [firstTodo]);

//     const handleFirstTodo = (evt) => {
//         setFirstTodo(evt.target.value);
//     }

//     const handleTodoChange = (index, value) => {
//         setTodoList(prevTodoList => {
//             const newTodoList = [...prevTodoList];
//             newTodoList[index].todoVal = value; 
//             return newTodoList;
//         });
//     }

//     const handleClickMe = () => {
//         if (firstTodo.trim() !== "") {
//             setTodoList((prevTodoList) => [...prevTodoList, firstTodo]); 
            
//         }
//     };

//     return (
//         <Modal show={props.isAddTodoClicked} onHide={props.handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Add Todo</Modal.Title>
//                 <Button variant="primary" className="todo-btn" onClick={handleClickMe} >
//                     Click Me!
//                 </Button>
//             </Modal.Header>
//             <Modal.Body className="modal-body todo-form-others">
//                 {/* <Form className="todo-form">
                    
//                      <Form.Label>Todo</Form.Label>
//                     <Form.Control
//                         type="text"
//                         className="todo-textfield"
//                         value={firstTodo}
//                         onChange={handleFirstTodo}
//                     />
//                      </Form>  */}
//                     <Form className="todo-form-others">
//                     {todoList.map((todo, index) => (
//                         <div key={index} className="todo-others">
//                             {console.log(index)}
//                             <Form.Label>Todo</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 className="todo-textfield"
//                                 value={todo.todoVal}
//                                 onChange={(e) => handleTodoChange(index+1, e.target.value)}
//                             />
//                         </div>
//                     ))}
//                     </Form>
                
//             </Modal.Body>
//             <Modal.Footer>
//                 <div className="todo-footer-btns">
//                     <Button variant="primary" onClick={props.handleClose}>
//                         Save
//                     </Button>
//                     <Button variant="primary" onClick={props.handleClose}>
//                         Reset
//                     </Button>
//                 </div>
//             </Modal.Footer>
//         </Modal>
//     )
// }

// export default AddTodo;

import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

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

    const handleSave = () => {
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