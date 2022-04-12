import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";


function LogInAdmin(){

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [existentAdmins, setExistentAdmins] = useState( [] );

    useEffect(() => {
        fetch('http://localhost:8080/assignment2/admin/index')
            .then((response) => response.json())
            .then((json) => {
                setExistentAdmins(json);
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
            const userData = existentAdmins.find((user) => user.username === uname.value);

            // Compare user info
            if (userData) {
                if (userData.password !== pass.value) {
                    // Invalid password
                    setErrorMessages({name: "pass", message: errors.pass});
                } else {
                    setIsSubmitted(true);
                }
            } else {
                // Username not found
                setErrorMessages({name: "uname", message: errors.uname});
            }
        };

        const renderErrorMessage = (name) =>
            name === errorMessages.name && (
                <div className="error">{errorMessages.message}</div>
            );

        const renderForm = (
            <div className="form">
                <form onSubmit = {handleSubmit}>
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
                    {isSubmitted ? <div>Admin is successfully logged in</div> : renderForm}
                    <nav>
                        <span>&nbsp;&nbsp;</span>
                        <Link to="/">
                            <Button as={Col} variant="outline-dark">Go back</Button>
                        </Link>
                    </nav>
                    <Outlet />
                </div>
                {/*<div>*/}
                {/*    <ul>*/}
                {/*        {existentAdmins.map(user => (*/}
                {/*            <li key={user.id}>*/}
                {/*                <p> {user.username}</p>*/}
                {/*            </li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<LogInAdmin />, rootElement);
export default LogInAdmin;