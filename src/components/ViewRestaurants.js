import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import axios from "axios";
import "@reach/combobox/styles.css";
import "./tableOfFoods.css";
import { List, Datagrid, TextField, DateField, BooleanField } from 'react-admin';

function ViewRestaurants(){

    const [selectedRestaurant, setSelectedRestaurant] = useState( "" );
    const [restaurants, setRestaurants] = useState([]);
    const [disable, setDisable] = React.useState(true);


    useEffect(() => {
        axios
            .get("http://localhost:8080/assignment2/restaurant/index")
            .then((response) => {
                console.log(response.data)
                setRestaurants(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        const customer = JSON.parse(localStorage.getItem('customer'));
        console.log(customer);

    }, []);

    const handleClick = (event) => {
        setSelectedRestaurant(event.target.name);
        //setDisable(false)
        //console.log(selectedRestaurant)
        localStorage.setItem("restaurant", JSON.stringify(event.target.name));
        // console.log(localStorage.getItem("restaurant"))
    }

    useEffect( () => {
        //console.log(selectedRestaurant)
        if(selectedRestaurant){
            setDisable(false)
        }
    },[selectedRestaurant])

    const section = Math.ceil(restaurants.length / 5);
    const firstSection = restaurants.slice(0, section)
    const secondSection = restaurants.slice(section, 2*section)
    const thirdSection = restaurants.slice(2*section,3*section)
    const forthSection = restaurants.slice(3*section,4*section)
    const fifthSection = restaurants.slice(4*section,5*section)

    const renderForm = (
        <div className="form">
            <form>
                <span>&nbsp;&nbsp;</span>
                <h5>Select a restaurant:</h5>
                <span>&nbsp;&nbsp;</span>
                <div className="radio">
                    <div className="row">
                        <div className="row-cols-1">
                            {/*{ firstSection.map(({ id, name }, index) => {*/}
                            {/*    return (*/}
                            {/*        <div className="col">*/}
                            {/*            <span>&nbsp;&nbsp;</span>*/}
                            {/*            <Link to="/ViewMenuCustomer">*/}
                            {/*                <Button*/}
                            {/*                    as={Col}*/}
                            {/*                    value={name}*/}
                            {/*                    name={name}*/}
                            {/*                    variant="outline-success"*/}
                            {/*                    onClick={handleClick}>{name}*/}
                            {/*                </Button>*/}
                            {/*            </Link>*/}
                            {/*        </div>*/}
                            {/*    );*/}
                            {/*})}*/}
                            <div>
                                    { firstSection.map(({ id, name }, index) => {
                                        return (
                                            <div>
                                                <div className="col">
                                                    <div key={index}>
                                                        <div onChange={handleClick}>
                                                            <input
                                                                type="radio"
                                                                name={name}
                                                                value={id}
                                                                checked={selectedRestaurant === name}
                                                            />
                                                            <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="row-cols-1">
                            <div>
                                { secondSection.map(({ id, name }, index) => {
                                    return (
                                        <div>
                                            <div className="col">
                                                <div key={index}>
                                                    <div onChange={handleClick}>
                                                        <input
                                                            type="radio"
                                                            name={name}
                                                            value={id}
                                                            checked={selectedRestaurant === name}
                                                        />
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="row-cols-1">
                            <div>
                                { thirdSection.map(({ id, name }, index) => {
                                    return (
                                        <div>
                                            <div className="col">
                                                <div key={index}>
                                                    <div onChange={handleClick}>
                                                        <input
                                                            type="radio"
                                                            name={name}
                                                            value={id}
                                                            checked={selectedRestaurant === name}
                                                        />
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="row-cols-1">
                            <div>
                                { forthSection.map(({ id, name }, index) => {
                                    return (
                                        <div>
                                            <div className="col">
                                                <div key={index}>
                                                    <div onChange={handleClick}>
                                                        <input
                                                            type="radio"
                                                            name={name}
                                                            value={id}
                                                            checked={selectedRestaurant === name}
                                                        />
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="row-cols-1">
                            <div>
                                { fifthSection.map(({ id, name }, index) => {
                                    return (
                                        <div>
                                            <div className="col">
                                                <div key={index}>
                                                    <div onChange={handleClick}>
                                                        <input
                                                            type="radio"
                                                            name={name}
                                                            value={id}
                                                            checked={selectedRestaurant === name}
                                                        />
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                </div>
                <nav>
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/ViewMenuCustomer">
                        <Button as={Col} variant="success" disabled={disable}>View menu for the selected restaurant</Button>
                    </Link>
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/CustomerActions">
                        <Button as={Col} variant="outline-dark">Go back</Button>
                    </Link>
                </nav>
            </form>
        </div>
    );

    return (
        <div className="app">
            <span>&nbsp;&nbsp;</span>
            <div className="login-form">
                <div className="title">View restaurants</div>
                {renderForm}
                <Outlet />
            </div>
        </div>
    );
}

export default ViewRestaurants;