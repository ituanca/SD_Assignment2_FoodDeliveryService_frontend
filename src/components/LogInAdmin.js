import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import axios from "axios";

function LogInAdmin(){

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [existentAdmins, setExistentAdmins] = useState( [] );
    const [adminRegistration, setAdminRegistration] = useState({
        username: "",
        password: ""
    });

        const errors = {
            uname: "invalid username",
            pass: "invalid password",
        };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAdminRegistration({ ...adminRegistration, [name] : value});
    }

        const handleSubmit = (event) => {
            // Prevent page reload
            event.preventDefault();

            axios
                .get("http://localhost:8080/assignment2/admin/login", {
                    params: {
                        username: adminRegistration.username,
                        password: adminRegistration.password
                    }
                })
                .then((response) => {
                    if (response.data === "username_error") {
                        setErrorMessages({name: "uname", message: errors.uname});
                        localStorage.removeItem("admin");
                    } else if (response.data === "password_error"){
                        setErrorMessages({name: "pass", message: errors.pass});
                        localStorage.removeItem("customer");
                    } else{
                        setIsSubmitted(true);
                        localStorage.setItem("admin", JSON.stringify(adminRegistration));
                    }
                    console.log(response.data);
                })
                .catch((error) =>
                    console.error("There was an error!", error.response.data.message)
                );
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
                        <input type="text"
                               value={adminRegistration.username}
                               onChange={handleInput}
                               name="username" required id = "username"/>
                        {renderErrorMessage("uname")}
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password"
                               value={adminRegistration.password}
                               onChange={handleInput}
                               name="password" required id = "password"/>
                        {renderErrorMessage("pass")}
                    </div>
                    <div className="button-container">
                        <input type="submit"/>
                    </div>
                    <div>
                        <span>&nbsp;&nbsp;</span>
                        <Link to="/">
                            <Button as={Col} variant="outline-dark">Go back</Button>
                        </Link>
                    </div>
                </form>
            </div>
        );

        return (
            <div className="app">
                    <div className="login-form" style={{backgroundColor: 'lightblue',}}>
                        <div className="title">Sign In</div>
                        {isSubmitted ?
                            <div>
                                <div>
                                    Admin has successfully logged in
                                    <span>&nbsp;&nbsp;</span>
                                </div>
                                <span>&nbsp;&nbsp;</span>
                                <Link to="/AdminActions">
                                    <span>&nbsp;&nbsp;</span>
                                    <Button as={Col} variant="primary">Go to admin page</Button>
                                </Link>
                            </div>
                            : renderForm}
                        <Outlet />
                    </div>
            </div>
        );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<LogInAdmin />, rootElement);
export default LogInAdmin;