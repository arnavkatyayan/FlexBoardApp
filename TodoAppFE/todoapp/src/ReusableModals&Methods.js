import React from "react";
import { Modal, Button } from "react-bootstrap";


export const reusableModalViewProject = (showModal, handleClose, title) => {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
      </Modal>
    );
  };