import React, {useEffect, useState} from "react";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import axios from "axios";


function SignUpAdmin(){
    const [errorMessagesAS, setErrorMessagesAS] = useState({});
    const [isSubmittedAS, setIsSubmittedAS] = useState(false);
    const [adminRegistration, setAdminRegistration] = useState({
        email: "",
        username: "",
        password: ""
    });

    const errors = {
        username: "username already exists",
        email: "email already exists",
        invalid_email: "invalid email"
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
            .get('http://localhost:8080/assignment2/admin/checkIfValid', {
                params: {
                    email: adminRegistration.email,
                    username: adminRegistration.username
                }
            })
            .then((response) => {
                console.info(response);
                if (response.data === "username_exists") {
                    setErrorMessagesAS({name: "username", message: errors.username});
                    localStorage.removeItem("admin");
                } else if (response.data === "email_exists"){
                    setErrorMessagesAS({name: "email", message: errors.email});
                    localStorage.removeItem("admin");
                }  else if (response.data === "invalid_email"){
                    setErrorMessagesAS({name: "invalid_email", message: errors.invalid_email});
                    localStorage.removeItem("admin");
                } else{
                    setIsSubmittedAS(true);
                    localStorage.setItem("admin", JSON.stringify(adminRegistration));
                }
            })
            .catch((error) => {
                console.error("There was an error!", error.response.data.message)
            });

        // axios
        //     .get('http://localhost:8080/assignment2/admin/checkIfEmailExists', {
        //         params: {
        //             email: adminRegistration.email
        //         }
        //     })
        //     .then((response) => {
        //         console.info(response);
        //         if (response.data === true) {
        //             setErrorMessagesAS({name: "email", message: errors.email});
        //             localStorage.removeItem("admin");
        //         } else {
        //             setIsSubmittedAS(true);
        //             localStorage.setItem("admin", JSON.stringify(adminRegistration));
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("There was an error!", error.response.data.message)
        //     });
    }

    const renderErrorMessage = (name) =>
        name === errorMessagesAS.name && (
            <div className="error">{errorMessagesAS.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div className="input-container">
                    <label>Email </label>
                    <input type="text"
                           value={adminRegistration.email}
                           onChange={handleInput}
                           name="email" required id = "email"/>
                    {renderErrorMessage("email")}
                    {renderErrorMessage("invalid_email")}
                </div>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text"
                           value={adminRegistration.username}
                           onChange={handleInput}
                           name="username" required id = "username"/>
                    {renderErrorMessage("username")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password"
                           value={adminRegistration.password}
                           onChange={handleInput}
                           name="password" required id = "password"/>
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
                <div className="title">Sign Up</div>
                {isSubmittedAS ?
                    <div>
                        <div>
                            Admin account was created successfully
                            <span>&nbsp;&nbsp;</span>
                        </div>
                        <span>&nbsp;&nbsp;</span>
                        <Link to="/CreateRestaurant">
                            <span>&nbsp;&nbsp;</span>
                            <Button as={Col} variant="success">Register a restaurant</Button>
                        </Link>
                    </div> : renderForm}
                <Outlet />
            </div>
        </div>
    );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<LogInCustomer />, rootElement);
export default SignUpAdmin;