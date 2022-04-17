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
    const [foodRegistration, setFoodRegistration] = useState({
        restaurant: [],
        admin: []
    });
    const [categories, setCategories] = useState( [] );
    const [selectedCategory, setSelectedCategory] = useState( "" );


    // const [itemRegistration, setItemRegistration] = useState(
    //     {
    //         name: "",
    //         ingredients: "",
    //         price: 0,
    //         category: "",
    //     });


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
        const listOfFood = JSON.parse(localStorage.getItem("listOfFood"));
        console.log(listOfFood);

        axios
            .post("http://localhost:8080/assignment2/food/add", listOfFood)
            .then((response) => {
                console.info(response);
                setIsSubmittedM(true);
                localStorage.setItem("menu", JSON.stringify(foodRegistration));
            })
            .catch((error) => {
                console.error("There was an error!", error.response.data.message)
            });
        localStorage.removeItem("listOfFood");
    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFoodRegistration({ ...foodRegistration, [name] : value,
            restaurant: JSON.parse(localStorage.getItem('restaurant'))});
    }

    const handleOnChange = (event) => {
        setSelectedCategory(event.target.name);
        console.log(event.target.value)

    }

    const saveCategory = () =>  {
        localStorage.setItem("category", JSON.stringify(selectedCategory));
        console.log(localStorage.getItem("category"))
    }

    const renderErrorMessage = (name) =>
        name === errorMessagesM.name && (
            <div className="error">{errorMessagesM.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <span>&nbsp;&nbsp;</span>
                <div>Choose category:</div>
                <div className="radio">
                    <div className="row">
                        { categories.map(({ id, category }, index) => {
                            return (
                                <div>
                                    <div className="col">
                                        <div key={index}>
                                            <div onChange={handleOnChange}>
                                                <input
                                                    type="radio"
                                                    name={category}
                                                    value={id}
                                                    checked={selectedCategory === {category}}
                                                />
                                                <label htmlFor={`custom-checkbox-${index}`}>{category}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        Selected category  : <dt>{selectedCategory}</dt>
                        {(selectedCategory!=="") ?
                            <div>
                                <TableOfFoods />
                                {saveCategory()}
                            </div> : null}
                    </div>
                </div>
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
                <div> You can add multiple items belonging to the same category.</div>
                {isSubmittedM ? <div>Menu successfully created</div> : renderForm}
                <nav>
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/AdminActions">
                        <Button as={Col} variant="outline-dark">Go back</Button>
                    </Link>
                </nav>
                <Outlet />
            </div>
        </div>
    );
}

export default CreateMenu;