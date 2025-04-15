import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

function StoreTodo(props) {
    const [isEmailClicked, setIsEmailClicked] = useState(false);
    const [fileName, setFileName] = useState("");
    const [emailId, setEmailId] = useState("");

    const handleEmailClicked = () => {
        setIsEmailClicked(true);
    };

    const handleMail = (event) => {
        setEmailId(event.target.value);
    };

    const handleName = (event) => {
        setFileName(event.target.value);
    };

    const handleSave = async () => {
        const storeTodoRequestBody = {
            userName: props.userName,
            fileName: fileName,
            emailId: emailId
        };

        try {
            // SweetAlert loader with GIF
            swal({
                title: "Please wait...",
                text: "Sending your to-do list via email.",
                buttons: false,
                closeOnClickOutside: false,
                closeOnEsc: false,
                icon: "https://i.gifer.com/YCZH.gif"
            });

            const response = await axios.post("http://127.0.0.1:5000/sendMailTodo", storeTodoRequestBody);
            swal.close();

            if (response.data === "True") {
                swal("Success", "Mail Sent!", "success");
            } else {
                swal("Error", "Error sending mail!", "error");
            }
        } catch (error) {
            swal.close();
            console.error("Error:", error);
            swal("Error", "Something went wrong!", "error");
        }
    };

    const handleReset = () => {
        setFileName("");
        setEmailId("");
    };

    useEffect(() => {
        if (!isEmailClicked && fileName.trim().length > 0 && emailId.trim().length > 0) {
            handleReset();
        }
    }, [isEmailClicked]);

    return (
        <Modal show={props.isStoreTodoClicked} onHide={props.handleCloseStore}>
            <Modal.Header closeButton>
                <Modal.Title>Store Todo (click on the icon)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="store-todo-comp">
                    <div className="store-todo-icons">
                        <img src="https://cdn-icons-png.flaticon.com/512/732/732220.png" alt="Excel Icon" className="todo-icons" />
                        <img src="https://cdn-icons-png.flaticon.com/512/281/281769.png" alt="Gmail Icon" className="todo-icons" onClick={handleEmailClicked} />
                    </div>

                    {isEmailClicked && (
                        <div className="form-store-todo">
                            <Form>
                                <Form.Label>Name of File</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Please enter the name"
                                    value={fileName}
                                    onChange={handleName}
                                />
                                <Form.Label>Email Id</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Please enter the mail-Id"
                                    value={emailId}
                                    onChange={handleMail}
                                />
                                <div className="btns-grp-store-todo mt-3">
                                    <Button onClick={handleSave}>Save</Button>
                                    <Button onClick={handleReset}>Reset</Button>
                                </div>
                            </Form>
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default StoreTodo;
