import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import axios from "axios";
import "@reach/combobox/styles.css";
import {useForm} from "react-hook-form";
import TableOfFoods from "./TableOfFoods.js";


function CreateMenu(){

    const [errorMessagesM, setErrorMessagesM] = useState({});
    const [isSubmittedM, setIsSubmittedM] = useState(false);
    const [menuRegistration, setMenuRegistration] = useState({
        restaurant: [],
        categories: {},
        admin: []
    });
    const [categories, setCategories] = useState( [] );
    const [selectedCategories, setSelectedCategories] = useState( [] );
    const [checkedState, setCheckedState] = useState(
        new Array(categories.length).fill(false)
    );

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/assignment2/category/index')
            .then((response) => response.json())
            .then((json) => {
                setCategories(json);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const errors = {
        name: "invalid name",
    };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        // axios
        //     .post('http://localhost:8080/assignment2/menu/createBoolean', menuRegistration)
        //     .then((response) => {
        //         console.info(response);
        //         if (response.data === false) {
        //             setErrorMessagesM({name: "name", message: errors.name});
        //             localStorage.removeItem("menu");
        //         } else {
        //             setIsSubmittedM(true);
        //             localStorage.setItem("menu", JSON.stringify(menuRegistration));
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("There was an error!", error.response.data.message)
        //     });

    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setMenuRegistration({ ...menuRegistration, [name] : value,
            restaurant: JSON.parse(localStorage.getItem('restaurant'))});
    }

    const renderErrorMessage = (name) =>
        name === errorMessagesM.name && (
            <div className="error">{errorMessagesM.message}</div>
        );

    console.log(menuRegistration);

    const openTableForAddingItems = () => {
        <TableOfFoods />
    }

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <span>&nbsp;&nbsp;</span>
                {/*<div className="input-container">*/}
                {/*    <label>Name </label>*/}
                {/*    <input type="text"*/}
                {/*           value={menuRegistration.name}*/}
                {/*           onChange={handleInput}*/}
                {/*           name="name" required/>*/}
                {/*    {renderErrorMessage("name")}*/}
                {/*</div>*/}
                {/*<div className="input-container">*/}
                {/*    <label>Address </label>*/}
                {/*    <input type="address"*/}
                {/*           value={menuRegistration.address}*/}
                {/*           onChange={handleInput}*/}
                {/*           name="address" required/>*/}
                {/*</div>*/}
                <div className="input-container">
                    <div className="row">
                        { categories.map(({ id, category }, index) => {
                            return (
                                <div>
                                    <div className="col">
                                        <div key={index}>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-${index}`}
                                                    name={category}
                                                    value={id}
                                                    checked={checkedState[index]}
                                                    onChange={(event) => {
                                                        if(event.target.checked){
                                                            setSelectedCategories([...selectedCategories, id]);
                                                        }else{
                                                            setSelectedCategories(
                                                                selectedCategories.filter((selection) => selection.id !== id),
                                                            );
                                                        }
                                                        setMenuRegistration({ ...menuRegistration, categories: selectedCategories});
                                                    }}
                                                />
                                                <label htmlFor={`custom-checkbox-${index}`}>{category}</label>
                                                {/*<TableOfFoods />*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                { selectedCategories.map(({ id, category }, index) => {
                    return (
                        <div>
                            <TableOfFoods />
                            console.log({TableOfFoods.items})
                        </div>
                    );
                })}
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <span>&nbsp;&nbsp;</span>
            <div className="login-form">
                <div className="title">Create menu</div>
                {isSubmittedM ? <div>Menu successfully created</div> : renderForm}
                <nav>
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/">
                        <Button as={Col} variant="outline-dark">Go back</Button>
                    </Link>
                </nav>
                <Outlet />
            </div>
        </div>
    );
}

export default CreateMenu;