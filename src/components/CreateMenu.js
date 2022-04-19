import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import axios from "axios";
import "@reach/combobox/styles.css";
import logInCustomer from "./LogInCustomer";


function CreateMenu(){

    const [errorMessagesM, setErrorMessagesM] = useState({});
    const [isSubmittedM, setIsSubmittedM] = useState(false);
    const [categories, setCategories] = useState( [] );
    const [selectedCategory, setSelectedCategory] = useState( "" );
    const [item, setItem] = useState({
        food: "",
        listOfIngredients: "",
        price: 0,
        category: {
            id: 0,
            category: ""
        },
        restaurant: ""
    });

    useEffect(() => {
        // fetch('http://localhost:8080/assignment2/category/index')
        //     .then((response) => response.json())
        //     .then((json) => {
        //         setCategories(json);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        axios
            .get("http://localhost:8080/assignment2/category/index")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        const admin = JSON.parse(localStorage.getItem('admin'));
        console.log(admin);

        axios
            .get("http://localhost:8080/assignment2/restaurant/findByAdmin", {
                params:{
                    admin: admin.username
                }
            })
            .then((response) => {
                if(response.data === ""){
                    console.log("There was an error!")
                }else{
                    console.log(response.data);
                    localStorage.setItem("restaurant", JSON.stringify(response.data));
                    console.log(localStorage.getItem('restaurant'))
                }
            })
            .catch((error) =>
                console.error("There was an error!", error.response.data.message)
            );
    }, []);

    const errors = {
        name: "invalid name",
        price: "invalid price"
    };

    const renderErrorMessage = (name) =>
        name === errorMessagesM.name && (
            <div className="error">{errorMessagesM.message}</div>
        );

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        console.log(item);

        axios
            .post("http://localhost:8080/assignment2/food/add", item)
            .then((response) => {
                console.info(response);
                if (response.data === "name_error") {
                    setErrorMessagesM({name: "name", message: errors.name});
                } else if (response.data === "price_error"){
                    setErrorMessagesM({name: "price", message: errors.price});
                } else{
                    setIsSubmittedM(true);
                }
            })
            .catch((error) => {
                console.error("There was an error!", error.response.data.message)
            });
    };

    const handleInput = event => {
        const name = event.target.name;
        const value = event.target.value;
        setItem({ ...item, [name] : value,
            category: JSON.parse(localStorage.getItem('category')),
            restaurant: JSON.parse(localStorage.getItem('restaurant'))});
        localStorage.setItem("foodItem", JSON.stringify(item));
        console.log(item);
    }

    const handleOnChange = (event) => {
        setSelectedCategory(event.target.name);
        localStorage.setItem("category", JSON.stringify(selectedCategory));
        setItem({ ...item, category: JSON.parse(localStorage.getItem('category'))});
    }

    const saveCategory = () =>  {
        localStorage.setItem("category", JSON.stringify(selectedCategory));
    }

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
                                                    checked={selectedCategory === category}
                                                />
                                                <label htmlFor={`custom-checkbox-${index}`}>{category}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {saveCategory()}
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div>
                        Insert new food for the {selectedCategory} category:
                        {(selectedCategory!=="") ?
                            <div>
                                <div>
                                    <div className="input-container">
                                        <label>Item </label>
                                        <input type="text"
                                               value={item.food}
                                               onChange={handleInput}
                                               name="food" required
                                               id = "food"/>
                                        {renderErrorMessage("name")}
                                    </div>
                                    <div className="input-container">
                                        <label>List of ingredients </label>
                                        <input type="text"
                                               value={item.listOfIngredients}
                                               onChange={handleInput}
                                               name="listOfIngredients" required
                                               id = "listOfIngredients"/>
                                    </div>
                                    <div className="input-container">
                                        <label>Price </label>
                                        <input type="number"
                                               value={item.price}
                                               onChange={handleInput}
                                               name="price" required
                                               id = "price"/>
                                        {renderErrorMessage("price")}
                                    </div>
                                    <div className="input-container">
                                        <label>Category </label>
                                        <input name="category"
                                               id="category"
                                               type="text"
                                               value={JSON.parse(localStorage.getItem('category')).name}
                                               placeholder={localStorage.getItem('category')}
                                               readOnly = {true}
                                               onChange={handleInput}/>
                                    </div>
                                </div>
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
                {isSubmittedM ? <div>Food was successfully added to the menu</div> : renderForm}
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