import React from "react";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import { Modal } from "react-bootstrap";
import SignupValidationsPage from "./SignupValidationsPage";
import view from './view.png';
import hide from './hide.png';
function SignupPage(props) {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPassValidationClicked, setIsPassValidationClicked] = useState(false);
    const [passIcon, setPassIcon] = useState(false);
    const [passIconConfirm, setPassIconConfirm] = useState(false);
    const [email, setEmail] = useState("");

    const handleUserName = (evt) => {
        setUserName(evt.target.value);
    }

    const handleEmail = (evt) => {
        setEmail(evt.target.value);
    }

    const handlePassword = (evt) => {
        setPassword(evt.target.value);
    }

    const handleConfirmPassword = (evt) => {
        setConfirmPassword(evt.target.value);
    }

    const handlePassIcon = () => {
        setPassIcon(!passIcon);
    }

    const handleSignup = async (evt) => {
        if (await checkUserAvailable() == "True") {
            swal("Error", "User is already taken", "error");
            return;
        }
        if (await props.checkEmailAvailable(email) == "True") {
            swal("Error", "Email is already taken", "error");
            return;
        }
        if(email.trim().length ===0) {
            swal("Error", "email is empty", "error");
            return;
        }
        if (password.trim() != confirmPassword.trim()) {
            swal("Error", "Both Passwords are not same", "error");
            return;
        }
        if (userName.trim().length === 0) {
            swal("Error", "username is empty", "error");
            return;
        }
        if (password.trim().length === 0) {
            swal("Error", "username is empty", "error");
            return;
        }
        if (confirmPassword.trim().length === 0) {
            swal("Error", "username is empty", "error");
            return;
        }
        if (!validatePassword()) {
            swal("Error", "Password is not strong check password validations", "error");
            return;
        }

        const signupData = {
            userName: userName.trim(),
            email: email.trim(),
            password: password.trim(),
        };

        const response = await axios.post('http://127.0.0.1:5000/submit_user_details', signupData);
        if (response.data == "True") {
            swal("Success", "New User Created", "success");
        }

    }

    const checkUserAvailable = async () => {
        const userNameData = {
            userName: userName.trim()
        }
        const response = await axios.post('http://127.0.0.1:5000/check_user_exists', userNameData);
        return response.data;
    }


    const handleReset = () => {
        setUserName("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
    }

    const handlePasswordValidations = () => {
        setIsPassValidationClicked(true);
    }

    const handleClose = () => {
        setIsPassValidationClicked(false);
    }

    const handlePassIconConfirm = () => {
        setPassIconConfirm(!passIconConfirm);
    }

    const validatePassword = () => {
        if (password.trim().length < 8 || password.trim().length > 15) {
            return false;
        }
        let regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
        if (!regex.test(password)) {
            return false;
        }
        return true;
    }

    return (
        <div className='Main-Page'>
            <div className='login-page'>
                <Form className='form login-css'>
                    <Form.Group controlId="formUsername">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            value={userName}
                            onChange={handleUserName}
                            style={{ width: '15vw' }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formUsername">
                        <Form.Control
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={handleEmail}
                            style={{ width: '15vw' }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="flex">
                        <Form.Control
                            type={!passIcon ? "password" : "text"}
                            placeholder="Password"
                            value={password}
                            onChange={handlePassword}
                            style={{ width: '15vw' }}
                        />
                        {!passIcon ? <img src={hide} className='pass-icons' onClick={handlePassIcon} /> : <img src={view} className='pass-icons' onClick={handlePassIcon} />}

                    </Form.Group>
                    <Form.Group controlId="formUsername" className="flex">
                        <Form.Control
                            type={!passIconConfirm ? "password" : "text"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            style={{ width: '15vw' }}
                        />
                        {!passIconConfirm ? <img src={hide} className='pass-icons' onClick={handlePassIconConfirm} /> : <img src={view} className='pass-icons' onClick={handlePassIconConfirm} />}

                    </Form.Group>
                    <div className='btn-grps btn-grps-signup'>
                        <Button variant="primary" onClick={handleSignup} className='btn'>
                            Signup
                        </Button>
                        <Button variant="primary" onClick={handleReset} className='btn'>
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
export default SignupPage;