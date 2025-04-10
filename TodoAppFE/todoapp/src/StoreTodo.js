import React from "react";
import {useEffect,useState} from "react";
import { Button ,Modal} from "react-bootstrap";

function StoreTodo(props) {


    return(
        <Modal show={props.isStoreTodoClicked} onHide={props.handleCloseStore}>
        <Modal.Header closeButton>
            <Modal.Title>Store Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="store-todo-icons">
            <img src="https://cdn-icons-png.flaticon.com/512/732/732220.png" alt="Excel Icon" width="60" height="60"/>
            <img src="https://cdn-icons-png.flaticon.com/512/281/281769.png" alt="Gmail Icon" width="60" height="60"/>
            
            </div>
        </Modal.Body>


        </Modal>
    )
}
export default StoreTodo;