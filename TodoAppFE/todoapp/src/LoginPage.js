import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './Redux/Actions';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfoPage from './InfoPage';
import swal from 'sweetalert';
import view from './view.png';
import hide from './hide.png';
import Options from './Options';
const LoginPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errUserName, setErrUserName] = useState(false);
    const [errPassword, setErrPassword] = useState(false);
    const [passIcon, setPassIcon] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleUserName = (evt) => {
        setUserName(evt.target.value);
    };

    const handlePassword = (evt) => {
        setPassword(evt.target.value);
    };

    const checkLogin = async () => {

       if(!userName.trim().length && !password.trim().length) {
        swal("Error","Username and Password are empty!","error");
        return;
       }
       else if(!userName.trim().length) {
        swal("Error","Username is empty!","error");
        return;
       }
       else if(!password.trim().length) {
        swal("Error","Username is empty!","error");
        return;
       }  

        const loginData ={ 
            userName:userName.trim(),
            password:password.trim()
        };
        const response = await axios.post('http://127.0.0.1:5000/check_user',loginData);
        if(response.data === "True") {
            swal("Success", "Login Successful!", "success").then((value) => {
                if (value) {
                    setIsLoggedIn(true);
                }
            });
        }
        if(response.data === "False") {
            swal("Error","Login Failed!","error");
        }
        return response.data;
    };

    const handleReset = () => {
        setUserName("");
        setPassword("");
    }

    const handlePassIcon = () => {
        setPassIcon(!passIcon);
    }
    if(isLoggedIn) {
        return (
            <Options/>
        )
    }

    return (
        <div className='Main-Page'>
            <div className='info-page'>
            <InfoPage/>                
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
                    <Form.Group controlId="formPassword" className='flex'>
                        <Form.Control
                            type={!passIcon ? "password" :"text"}
                            placeholder="Please enter the password"
                            value={password}
                            onChange={handlePassword}
                            style={{ width: '15vw' }}
                        />
                    {!passIcon ? <img src={hide} className='pass-icons' onClick={handlePassIcon} /> : <img src={view} className='pass-icons' onClick={handlePassIcon} />}
                    </Form.Group>
                    <div className='btn-grps'>
                        <Button variant="primary" onClick={checkLogin} className='btn'>
                            Login
                        </Button>
                        <Button variant="primary" onClick={handleReset} className='btn'>
                            Reset
                        </Button>
                    </div>
                    <p className='version-no'>Version : 1.0.0</p>
                </Form>

            </div>
        </div>
    )
};

export default LoginPage;
