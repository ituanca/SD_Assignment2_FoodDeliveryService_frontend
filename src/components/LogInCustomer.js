import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import axios from "axios";

function LogInCustomer(){

    const [errorMessagesC, setErrorMessagesC] = useState({} );
    const [isSubmittedC, setIsSubmittedC] = useState(false );
    const [existentUsers, setExistentUsers] = useState( [] );

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        fetch('http://localhost:8080/assignment2/customer/index')
            .then((response) => response.json())
            .then((json) => {
                setExistentUsers(json);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
            // Prevent page reload
            event.preventDefault();
            var {uname, pass} = document.forms[0];

            // Find user login info
            const userData = existentUsers.find((user) => user.username === uname.value);

            // Compare user info
            if (userData) {
                if (userData.password !== pass.value) {
                    // Invalid password
                    setErrorMessagesC({name: "pass", message: errors.pass});
                } else {
                    setIsSubmittedC(true);
                }
            } else {
                // Username not found
                setErrorMessagesC({name: "uname", message: errors.uname});
            }
    };

    const renderErrorMessage = (name) =>
        name === errorMessagesC.name && (
            <div className="error">{errorMessagesC.message}</div>
        );

    const renderForm = (
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="uname" required/>
                        {renderErrorMessage("uname")}
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required/>
                        {renderErrorMessage("pass")}
                    </div>
                    <div className="button-container">
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        );

    return (
            <div className="app">
                <div className="login-form">
                    <div className="title">Sign In</div>
                    {isSubmittedC ? <div>Customer has successfully logged in</div> : renderForm}
                    <nav>
                        <span>&nbsp;&nbsp;</span>
                        <Link to="/">
                            <Button as={Col} variant="outline-dark">Go back</Button>
                        </Link>
                    </nav>
                    <Outlet/>
                </div>
                {/*<div>*/}
                {/*    <ul>*/}
                {/*        {existentUsers.map(user => (*/}
                {/*            <li key={user.id}>*/}
                {/*                <p> {user.username}</p>*/}
                {/*            </li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        );
};

// const rootElement = document.getElementById("root");
// ReactDOM.render(<LogInCustomer />, rootElement);
export default LogInCustomer;


