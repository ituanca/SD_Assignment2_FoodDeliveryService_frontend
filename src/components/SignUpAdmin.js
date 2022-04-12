import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";


function SignUpAdmin(){
    const [errorMessagesAS, setErrorMessagesAS] = useState({});
    const [isSubmittedAS, setIsSubmittedAS] = useState(false);
    const [existentAdmins, setExistentAdmins] = useState( [] );
    const [newUsername, setNewUsername] = useState( {} );
    const [newPassword, setNewPassword] = useState( {} );
    const [newRestaurant, setNewRestaurant] = useState( {} );

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
        uname: "username already exists",
    };

    const getUsername = (event) => {
        const userValue = event.target.value;
        setNewUsername(userValue);
    }

    const getPassword = (event) => {
        const passwordValue = event.target.value;
        setNewPassword(passwordValue);
    }

    // const getRestaurant = (event) => {
    //     const resValue = event.target.value;
    //     console.log(resValue);
    //     setNewPassword(resValue);
    // }

    // const data = {
    //     username: newUsername,
    //     password: newPassword
    // }
    //
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
        var {uname} = document.forms[0];

        const newUser = {newUsername, newPassword};
        console.log(newUser);
        console.log(JSON.stringify(newUser));

        // Find out if username exists
        const userByUsername = existentAdmins.find((user) => user.username === uname.value);

        // Compare user info
        if (userByUsername) {
            // existent username
            setErrorMessagesAS({name: "uname", message: errors.uname});
        } else {
            // ok
            setIsSubmittedAS(true);
            console.log(newUsername);
            console.log(newPassword);
            fetch('http://localhost:8080/assignment2/admin/create',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            })  .then(response => response.json())
                .then(res => console.log(res));
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
                    <input type="text" onChange={getUsername} name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" onChange={getPassword} name="pass" required/>
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
                <div className="title">Sign Up</div>
                {isSubmittedAS ? <div>Admin account was created successfully</div> : renderForm}
                <nav>
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/"><Button as={Col} variant="outline-dark">Go back</Button></Link>
                </nav>
                <Outlet />
            </div>
        </div>
    );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<LogInCustomer />, rootElement);
export default SignUpAdmin;