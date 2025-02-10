import React from "react";
import { useEffect,useState } from "react";
import { Form,Button } from "react-bootstrap";
function SignupPage() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUserName = (evt) => {
        setUserName(evt.target.value);
    }

    const handlePassword = (evt) => {
        setPassword(evt.target.value);
    }

    const handleConfirmPassword = (evt) => {
        setConfirmPassword(evt.target.value);
    }
    
    const handleSignup = (evt) => {
        evt.preventDefault();

    }

    const handleReset = () => {
        setUserName("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <div className='Main-Page'>
        <div className='info-page'>
                        
        </div>
        <div className='login-page'>
            <Form className='form login-css'>
                <Form.Group controlId="formUsername">
                    <Form.Control
                        type="text"
                        placeholder="Please enter the username"
                        value={userName}
                        onChange={handleUserName}                       
                        style={{ width: '15vw' }}
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Control
                        type="password"
                        placeholder="Please enter the password"
                        value={password}
                        onChange={handlePassword}
                        style={{ width: '15vw' }}
                    />
                </Form.Group>
                <Form.Group controlId="formUsername">
                    <Form.Control
                        type="password"
                        placeholder="Please enter the username"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        style={{ width: '15vw' }}
                    />
                </Form.Group>
                <div className='btn-grps'>
                    <Button variant="primary" onClick={handleSignup} className='btn'>
                        Signup
                    </Button>
                    <Button variant="primary" onClick={handleReset} className='btn'>
                        Reset
                    </Button>
                </div>
            </Form>

        </div>
    </div>
    )

}
export default SignupPage;