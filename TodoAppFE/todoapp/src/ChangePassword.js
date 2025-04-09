import React from "react";
import {useState} from "react";
import { Form, Button, Modal } from "react-bootstrap";
import view from './view.png';
import hide from './hide.png';
import swal from "sweetalert";
import axios from "axios";
import SignupValidationsPage from "./SignupValidationsPage";
function ChangePassword(props) {

    const [userName, setUserName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passIcon, setPassIcon] = useState(false);
    const [passIconNew, setPassIconNew] = useState(false);
    const [isPassValidationClicked, setIsPassValidationClicked] = useState(false); 
    const handleCurrentPassword = (event) => {
        setCurrentPassword(event.target.value);
    }

    const handleNewPassword = (event) => {
        setNewPassword(event.target.value);
    }

    const handlePassIcon = () => {
        setPassIcon(!passIcon);
    }

    const handlePassIconNew = () => {
        setPassIconNew(!passIconNew);
    }

    const handleReset = () => {
        setCurrentPassword("");
        setNewPassword("");
        setPassIcon(false);
        setPassIconNew(false);
    }

    const validatePassword = () => {
        if (newPassword.trim().length < 8 || newPassword.trim().length > 15) {
            return false;
        }
        let regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
        if (!regex.test(newPassword)) {
            return false;
        }
        return true;
     }

    const changePassword = async () => {
        const isPassDiff = await getPassForUser();
        if(currentPassword===newPassword) {
            swal("Error","The password values are same","error");
            return;
        }
        if(validatePassword() === false) {
            swal("Error","The password is not strong enough check validations","error");
            return;
        }

        if(isPassDiff === false) {
            swal("Error","The username and current password is incorrect.","error");
            return;
        }

        const changePassData = {
            userName:props.user,
            newPassword:newPassword
        };
        const resp = await axios.post('http://127.0.0.1:5000/change_password', changePassData);
        if(resp.data === "True") {
            swal("Success","Password Changed!", "success");
        }
        else {
            swal("Error","Error in changing your password","error");
        }
    }

    const getPassForUser = async () => {
        const response = await axios.get('http://127.0.0.1:5000/check_password', {
            params: { username: props.user, password:currentPassword }
          });
         
        if(response.data === "True") {
            return true;
        }
        else {
            return false;
        }
    }

    const handlePasswordValidations = () => {
        setIsPassValidationClicked(true);
    }
    const handleClose = () => {
        setIsPassValidationClicked(false);
    }

    return (
         <div className='Main-Page'>
                  <div className='login-page'>
                <Form className='form login-css'>
                    <Form.Group controlId="formUsername">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            disabled={true}
                            value={props.user}
                            style={{ width: '15vw' }}
                        />
                    </Form.Group>
                  
                    <Form.Group controlId="formPassword" className="flex">
                        <Form.Control
                            type={!passIcon ? "password" : "text"}
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={handleCurrentPassword}
                            style={{ width: '15vw' }}
                        />
                        {!passIcon ? <img src={hide} className='pass-icons' onClick={handlePassIcon} /> : <img src={view} className='pass-icons' onClick={handlePassIcon} />}

                    </Form.Group>
                    <Form.Group controlId="formUsername" className="flex">
                        <Form.Control
                            type={!passIconNew ? "password" : "text"}
                            placeholder="New Password"
                            value={newPassword}
                            onChange={handleNewPassword}
                            style={{ width: '15vw' }}
                        />
                        {!passIconNew ? <img src={hide} className='pass-icons' onClick={handlePassIconNew} /> : <img src={view} className='pass-icons' onClick={handlePassIconNew} />}

                    </Form.Group>
                    <div className='btn-grps btn-grps-signup'>
                        <Button variant="primary" onClick={changePassword} className='btn'>
                            Change
                        </Button>
                        <Button variant="primary" onClick={handleReset}className='btn'>
                            Reset
                        </Button>
                       
                    </div>
                    <p className="pass-validations" onClick={handlePasswordValidations}>Password validations</p>
                    <Modal show={isPassValidationClicked} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Password Validations</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-body-signup">
                            <SignupValidationsPage />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" className="custom" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Form>

            </div>
                   </div>
    )
}
export default ChangePassword;