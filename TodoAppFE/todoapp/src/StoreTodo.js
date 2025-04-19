import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

function StoreTodo(props) {
    const [isEmailClicked, setIsEmailClicked] = useState(false);
    const [fileName, setFileName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [excelFileName, setExcelFileName] = useState("");
    const [isExcelClicked, setIsExcelClicked] = useState(false);

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

    const handleExcelFileName = ()=> {
        setIsExcelClicked(true);
    }

    useEffect(() => {
        if (!isEmailClicked && fileName.trim().length > 0 && emailId.trim().length > 0) {
            handleReset();
        }
    }, [isEmailClicked]);

    const handleResetExcel = () => {
        setExcelFileName("");

    }

    const handleFileNameExcel = (event) => {
        setExcelFileName(event.target.value);
    }

    const handleSaveExcel = async () => {
        const storeTodoExcelRequestBody = {
            excelFileName: excelFileName,
            userName: props.userName
        };
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/saveExcelTodo",
                storeTodoExcelRequestBody,
                { responseType: "blob" } // 👈 this is important
            );
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${excelFileName}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
    
            swal("Success", "Excel file downloaded", "success");
        } catch (error) {
            console.error("Error:", error);
            swal("Error", "Something went wrong!", "error");
        }
    };
    
    return (
        <Modal show={props.isStoreTodoClicked} onHide={props.handleCloseStore}>
            <Modal.Header closeButton>
                <Modal.Title>Store Todo (click on the icon)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="store-todo-comp">
                    <div className="store-todo-icons">
                        <img src="https://cdn-icons-png.flaticon.com/512/732/732220.png" alt="Excel Icon" className="todo-icons" onClick={handleExcelFileName} />
                        <img src="https://cdn-icons-png.flaticon.com/512/281/281769.png" alt="Gmail Icon" className="todo-icons" onClick={handleEmailClicked} />
                    </div>

                    {isEmailClicked && (
                        <div className="form-store-todo">
                            <Form>
                                <Form.Label>Name of File for mail</Form.Label>
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
                    {isExcelClicked && (
                        <div className="form-store-todo">
                            <Form>
                                <Form.Label>Name of File for local saving</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Please enter the name"
                                    value={excelFileName}
                                    onChange={handleFileNameExcel}
                                />
                                <div className="btns-grp-store-todo mt-3">
                                    <Button onClick={handleSaveExcel}>Save</Button>
                                    <Button onClick={handleResetExcel}>Reset</Button>
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
