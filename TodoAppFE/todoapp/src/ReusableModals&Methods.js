import React from "react";
import { Modal, Button } from "react-bootstrap";

var max_chars = 50;
var min_chars = 3;

export const ReusableModalViewProject = ({ showModal, handleClose, project }) => {

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{project.project_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><b>Description:</b><span className="project-description "> {project.description} </span></p>
                <p><b>Start Date:</b> {project.start_date}</p>
                <p><b>Deadline:</b> {project.end_date}</p>
                <p ><b>Priority:</b> <span
                    className={
                        project.priority === "low"
                            ? "project-low"
                            : project.priority === "medium"
                                ? "project-medium"
                                : "project-high"
                    }
                >
                    {project.priority}
                </span></p>
            </Modal.Body>
        </Modal>
    );
};
export {max_chars, min_chars}