import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './Redux/Actions';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfoPage from './InfoPage';

const LoginPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    // const isLogin = useSelector((state) => state.loginCred);
    // const dispatch = useDispatch();

    const handleUserName = (evt) => {
        setUserName(evt.target.value);
    };

    const handlePassword = (evt) => {
        setPassword(evt.target.value);
    };

    const checkLogin = async () => {

        const loginData ={ 
            userName:userName.trim(),
            password:password.trim()
        };
        const response = await axios.post('http://127.0.0.1:5000/check_user',loginData);
        console.log(response.data);
        return response.data;
    };

    const handleReset = () => {
        setUserName("");
        setPassword("");
    }

    return (
        <div className='Main-Page'>
            <div className='info-page'>
                dududu
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
                    <div className='btn-grps'>
                        <Button variant="primary" onClick={checkLogin} className='btn'>
                            Login
                        </Button>
                        <Button variant="primary" onClick={handleReset} className='btn'>
                            Reset
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    )
};

export default LoginPage;
