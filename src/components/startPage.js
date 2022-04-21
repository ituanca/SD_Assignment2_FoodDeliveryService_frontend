import React from "react";
import {Link, BrowserRouter, Route, Outlet, Router} from "react-router-dom";
import {Button} from "react-bootstrap";
import ReactDOM from "react-dom";
import {Col} from "reactstrap";
import LogInAdmin from "./LogInAdmin";
import LogInCustomer from "./LogInCustomer";
import background from "../img/background2.jpg"

function StartPage(){
        return (
            <div className="app">
                <div style={{ backgroundImage: `url(${background})` }}>
                    <span>&nbsp;&nbsp;</span>
                    <div className='App'>

                        <span>&nbsp;&nbsp;</span>
                        <h1 className="text-center"><strong>Welcome to Foodpanda!</strong></h1>
                        <span>&nbsp;&nbsp;</span>
                        <nav>
                            <span>&nbsp;&nbsp;</span>

                            <h2 className="text-center"><strong>Restaurant administrators</strong></h2>
                            <h3 className="text-center">Are you the admin of a restaurant or do you want to become one?</h3>

                            <Link to="/LogInAdmin">
                                <Button as={Col} variant="primary">Log in </Button>
                            </Link>

                            <span>&nbsp;&nbsp;</span>

                            <Link to="/SignUpAdmin">
                                <Button as={Col} variant="primary">Create an account</Button>
                            </Link>

                            <span>&nbsp;&nbsp;</span>

                            <h2 className="text-center"><strong>Customers</strong></h2>
                            <h3 className="text-center">Do you have an account or do you want to create one?</h3>

                            <Link to="/LogInCustomer">
                                <Button as={Col} variant="success">Log in</Button>
                            </Link>

                            <span>&nbsp;&nbsp;</span>

                            <Link to="/SignUpCustomer">
                                <Button as={Col} variant="success">Create an account</Button>
                            </Link>

                            <span>&nbsp;&nbsp;</span><span>&nbsp;&nbsp;</span>
                        </nav>
                        <Outlet />
                    </div>
                </div>
            </div>
        );
}

export default StartPage;