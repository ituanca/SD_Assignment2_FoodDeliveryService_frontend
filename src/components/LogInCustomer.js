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
    const [customerRegistration, setCustomerRegistration] = useState({
        username: "",
        password: ""
    });

    // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {
    //     fetch('http://localhost:8080/assignment2/customer/index')
    //         .then((response) => response.json())
    //         .then((json) => {
    //             setExistentUsers(json);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCustomerRegistration({ ...customerRegistration, [name] : value});
    }

    const handleSubmit = (event) => {
            // Prevent page reload
            event.preventDefault();
            // var {uname, pass} = document.forms[0];
            //
            // // Find user login info
            // const userData = existentUsers.find((user) => user.username === uname.value);
            //
            // // Compare user info
            // if (userData) {
            //     if (userData.password !== pass.value) {
            //         // Invalid password
            //         setErrorMessagesC({name: "pass", message: errors.pass});
            //     } else {
            //         setIsSubmittedC(true);
            //     }
            // } else {
            //     // Username not found
            //     setErrorMessagesC({name: "uname", message: errors.uname});
            // }

        axios
            .get("http://localhost:8080/assignment2/customer/login", {
                params: {
                    username: customerRegistration.username,
                    password: customerRegistration.password
                }
            })
            .then((response) => {
                if (response.data === "username_error") {
                    setErrorMessagesC({name: "uname", message: errors.uname});
                    localStorage.removeItem("customer");
                } else if (response.data === "password_error"){
                    setErrorMessagesC({name: "pass", message: errors.pass});
                    localStorage.removeItem("customer");
                } else{
                    setIsSubmittedC(true);
                    localStorage.setItem("customer", JSON.stringify(customerRegistration));
                }
                console.log(response.data);
            })
            .catch((error) =>
                console.error("There was an error!", error.response.data.message)
            );
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
                        <input type="text"
                               value={customerRegistration.username}
                               onChange={handleInput}
                               name="username" required id = "username"/>
                        {renderErrorMessage("uname")}
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password"
                               value={customerRegistration.password}
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
                <div className="login-form">
                    <div className="title">Sign In</div>
                    {isSubmittedC ?
                        <div>
                            <div>
                                Customer has successfully logged in
                                <span>&nbsp;&nbsp;</span>
                            </div>
                            <span>&nbsp;&nbsp;</span>
                            <Link to="/CustomerActions">
                                <span>&nbsp;&nbsp;</span>
                                <Button as={Col} variant="success">Go to customer page</Button>
                            </Link>
                        </div>
                        : renderForm}
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


