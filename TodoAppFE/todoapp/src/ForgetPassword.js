import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";
function ForgetPassword(props) {
    const [email, setEmail] = useState("");

    const handleReset = () => {
        setEmail("");
    }

    const handleEmail = (evt) => {
        setEmail(evt.target.value);
    }
    const handleForgetPassword = async (evt) => {
        evt.preventDefault();
        if (await props.checkEmailAvailable(email) === "False") {
            swal("Error!", "Email is not available", "error")
            return;
        }
        if (email.trim().length === 0) {
            swal("Error!", "Email field is empty", "error")
            return;
        }

        const emailData = {
            email: email.trim()
        };
        const response = await axios.post('http://127.0.0.1:5000/send_mail', emailData);
        if (response.status === 200) {
            swal("Success!", "Email Sent", "success");
        }
        return response.data;

    }



    return (
        <div className='Main-Page'>

            <div className='login-page forget-pass-size'>
                <Form className='form login-css'>

                    <Form.Group controlId="formUsername">
                        <Form.Control
                            type="text"
                            placeholder="Please enter the email"
                            value={email}
                            onChange={handleEmail}
                            style={{ width: '15vw' }}
                        />
                    </Form.Group>
                    <div className='btn-grps'>
                        <Button variant="primary" onClick={handleForgetPassword} className='btn'>
                            Send Mail
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
export default ForgetPassword