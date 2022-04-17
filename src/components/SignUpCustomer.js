import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import axios from "axios";


function SignUpCustomer(){
    const [errorMessagesSC, setErrorMessagesSC] = useState({});
    const [isSubmittedSC, setIsSubmittedSC] = useState(false);
    const [customerRegistration, setCustomerRegistration] = useState({
        username: "",
        password: "",
        name: "",
        email: ""
    });

    // useEffect(() => {
    //     fetch('http://localhost:8080/assignment2/customer/index')
    //         .then((response) => response.json())
    //         .then((jsonAS) => {
    //             setExistentCustomers(jsonAS);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    const errors = {
        username: "username already exists",
        email: "email already exists"
    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCustomerRegistration({ ...customerRegistration, [name] : value});
    }

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        // const userByUsername = existentCustomers.find((user) => user.username === customerRegistration.username);
        // const userByEmail = existentCustomers.find((user) => user.email === customerRegistration.email);
        // console.log(userByUsername);
        //
        //
        // if (userByUsername) {
        //     setErrorMessagesSC({name: "username", message: errors.username});
        // } else if(userByEmail){
        //     setErrorMessagesSC({name: "email", message: errors.email});
        // } else {
        //     setIsSubmittedSC(true);
        //     axios.post('http://localhost:8080/assignment2/customer/create', customerRegistration)
        //         .then(response => setCustomerRegistration(response.data.id));
        // }

        axios
            .post('http://localhost:8080/assignment2/customer/createAndValidate', customerRegistration)
            .then((response) => {
                console.info(response);
                if (response.data === "username_exists") {
                    setErrorMessagesSC({name: "username", message: errors.username});
                    localStorage.removeItem("customer");
                } else if (response.data === "email_exists"){
                    setErrorMessagesSC({name: "email", message: errors.email});
                    localStorage.removeItem("customer");
                } else{
                    setIsSubmittedSC(true);
                    localStorage.setItem("customer", JSON.stringify(customerRegistration));
                }
            })
            .catch((error) => {
                console.error("There was an error!", error.response.data.message)
            });
    };

    const renderErrorMessage = (nameErr) =>
        nameErr === errorMessagesSC.name && (
            <div className="error">{errorMessagesSC.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div className="input-container">
                    <label>Name </label>
                    <input type="text"
                           value={customerRegistration.name}
                           onChange={handleInput}
                           name="name" required id = "name"/>
                </div>
                <div className="input-container">
                    <label>Email </label>
                    <input type="text"
                           value={customerRegistration.email}
                           onChange={handleInput}
                           name="email" required id = "email"/>
                    {renderErrorMessage("email")}
                </div>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text"
                           value={customerRegistration.username}
                           onChange={handleInput}
                           name="username" required id = "username"/>
                    {renderErrorMessage("username")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="text"
                           value={customerRegistration.password}
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
            <div className="login-form">
                <div className="title">Sign Up</div>
                {isSubmittedSC ?
                    <div>
                        <div>
                            Account created successfully
                        </div>
                        <span>&nbsp;&nbsp;</span>
                        <Link to="/CustomerActions">
                            <span>&nbsp;&nbsp;</span>
                            <Button as={Col} variant="primary">Go to customer page</Button>
                        </Link>
                    </div>
                    : renderForm}
                <Outlet />
            </div>
        </div>
    );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<LogInCustomer />, rootElement);
export default SignUpCustomer;