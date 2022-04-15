import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import axios from "axios";


function SignUpAdmin(){
    const [errorMessagesAS, setErrorMessagesAS] = useState({});
    const [isSubmittedAS, setIsSubmittedAS] = useState(false);
    const [existentAdmins, setExistentAdmins] = useState( [] );
    const [adminRegistration, setAdminRegistration] = useState({
        username: "",
        password: ""
    });

    useEffect(() => {
        fetch('http://localhost:8080/assignment2/admin/index')
            .then((response) => response.json())
            .then((jsonAS) => {
                setExistentAdmins(jsonAS);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const errors = {
        username: "username already exists",
    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAdminRegistration({ ...adminRegistration, [name] : value});
    }

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
        var {username} = document.forms[0];

        const userByUsername = existentAdmins.find((user) => user.username === adminRegistration.username);

        if (userByUsername) {
            setErrorMessagesAS({name: "username", message: errors.username});
        } else {
            setIsSubmittedAS(true);
            console.log(JSON.parse(JSON.stringify(adminRegistration.username)));
            console.log(JSON.parse(JSON.stringify(adminRegistration.password)));

            axios.post('http://localhost:8080/assignment2/admin/create', adminRegistration)
                .then(response => setAdminRegistration(response.data.id));
        }
    };

    const renderErrorMessage = (name) =>
        name === errorMessagesAS.name && (
            <div className="error">{errorMessagesAS.message}</div>
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
                    {renderErrorMessage("username")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password"
                           value={adminRegistration.password}
                           onChange={handleInput}
                           name="password" required id = "password"/>
                    {renderErrorMessage("password")}
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
                <div className="title">Sign Up</div>
                {isSubmittedAS ? <div>Admin account was created successfully</div> : renderForm}
                <nav>
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/"><Button as={Col} variant="outline-dark">Go back</Button></Link>
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

            {/*<div>*/}
            {/*    {*/}
            {/*        records.map((curEl) =>{*/}
            {/*            const {id, username, password} = curEl;*/}
            {/*            return (*/}
            {/*                <div className="showDataStyle" key ={curEl.id}>*/}
            {/*                    <p>{curEl.username}</p>*/}
            {/*                    <p>{curEl.password}</p>*/}
            {/*                </div>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<LogInCustomer />, rootElement);
export default SignUpAdmin;