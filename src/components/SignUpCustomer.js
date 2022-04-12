import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";


function SignUpCustomer(){
    const [errorMessagesSC, setErrorMessagesSC] = useState({});
    const [isSubmittedSC, setIsSubmittedSC] = useState(false);
    const [existentCustomers, setExistentCustomers] = useState( [] );

    useEffect(() => {
        fetch('http://localhost:8080/assignment2/customer/index')
            .then((response) => response.json())
            .then((jsonAS) => {
                setExistentCustomers(jsonAS);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const errors = {
        uname: "username already exists",
        email: "email already exists"
    };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
        var {uname, email} = document.forms[0];

        // Find users info
        const userByUsername = existentCustomers.find((user) => user.username === uname.value);
        const userByEmail = existentCustomers.find((user) => user.email === email.value);

        // Compare user info
        if (userByUsername) {
            // existent username
            setErrorMessagesSC({name: "uname", message: errors.uname});
        } else if(userByEmail){
            // existent email
            setErrorMessagesSC({name: "email", message: errors.email});
        } else {
            // ok
            setIsSubmittedSC(true);
        }
    };

    const renderErrorMessage = (name) =>
        name === errorMessagesSC.name && (
            <div className="error">{errorMessagesSC.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div className="input-container">
                    <label>Name </label>
                    <input type="text" name="name" required/>
                    {renderErrorMessage("name")}
                </div>
                <div className="input-container">
                    <label>Email </label>
                    <input type="text" name="email" required/>
                    {renderErrorMessage("email")}
                </div>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required/>
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="text" name="email" required/>
                    {renderErrorMessage("email")}
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    );

    // console.log('I was triggered during log in customer')

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign Up</div>
                {isSubmittedSC ? <div>Account created successfully</div> : renderForm}
                <nav>
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/">
                        <Button as={Col} variant="outline-dark">Go back</Button>
                    </Link>
                </nav>
                <Outlet />
            </div>
        </div>
    );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<LogInCustomer />, rootElement);
export default SignUpCustomer;