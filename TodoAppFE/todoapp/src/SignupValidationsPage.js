import React from "react";

function SignupValidationsPage() {

    const validations = ["Minimum 8 letters", "Maximum 15 letters", "One lowercase letter, One uppercase letter, One number, One Special symbol"];

    return (
        <ul>
            {validations.map((validation) =>
                <li>{validation}</li>
            )}
        </ul>
    )
}
export default SignupValidationsPage;