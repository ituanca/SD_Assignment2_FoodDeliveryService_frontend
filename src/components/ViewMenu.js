import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import axios from "axios";
import "@reach/combobox/styles.css";


function ViewMenu(){

    const [categories, setCategories] = useState( [] );
    const [selectedCategory, setSelectedCategory] = useState( "" );
    const [items, setItems] = useState([]);
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
            .get("http://localhost:8080/assignment2/restaurant/findMenuByAdmin", {
                params:{
                    admin: admin.username
                }
            })
            .then((response) => {
                if(response.data === ""){
                    console.log("There was an error!")
                }else{
                    console.log(response.data);
                    localStorage.setItem("menu", JSON.stringify(response.data));
                    console.log(localStorage.getItem('menu'))
                }
            })
            .catch((error) =>
                console.error("There was an error!", error.response.data.message)
            );

        const menu = JSON.parse(localStorage.getItem('menu'));
        console.log(menu);

        // axios
        //     .get("http://localhost:8080/assignment2/food/findByMenu")
        //     .then((response) => {
        //         setItems(response.data);
        //         console.log(items);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });


    }, []);

    const errors = {
        name: "invalid name",
    };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        console.log(item);

    };


    const handleOnChange = (event) => {
        setSelectedCategory(event.target.name);
        localStorage.setItem("category", JSON.stringify(selectedCategory));
    }

    const saveCategory = () =>  {
        localStorage.setItem("category", JSON.stringify(selectedCategory));
    }


    const renderForm = (
        <div className="form">
            <form>
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
                        You selected: {selectedCategory}
                        {(selectedCategory!=="") ?
                            <div>
                                <div>
                                    {/*<div>*/}
                                    {/*    <div className="input-container">*/}
                                    {/*        <label>Item </label>*/}
                                    {/*        <input type="text"*/}
                                    {/*               value={item.food}*/}
                                    {/*               onChange={handleInput}*/}
                                    {/*               name="food" required*/}
                                    {/*               id = "food"/>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="input-container">*/}
                                    {/*        <label>List of ingredients </label>*/}
                                    {/*        <input type="text"*/}
                                    {/*               value={item.listOfIngredients}*/}
                                    {/*               onChange={handleInput}*/}
                                    {/*               name="listOfIngredients" required*/}
                                    {/*               id = "listOfIngredients"/>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="input-container">*/}
                                    {/*        <label>Price </label>*/}
                                    {/*        <input type="number"*/}
                                    {/*               value={item.price}*/}
                                    {/*               onChange={handleInput}*/}
                                    {/*               name="price" required*/}
                                    {/*               id = "price"/>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="input-container">*/}
                                    {/*        <label>Category </label>*/}
                                    {/*        <input name="category"*/}
                                    {/*               id="category"*/}
                                    {/*               type="text"*/}
                                    {/*               value={JSON.parse(localStorage.getItem('category')).name}*/}
                                    {/*               placeholder={localStorage.getItem('category')}*/}
                                    {/*               readOnly = {true}*/}
                                    {/*               onChange={handleInput}/>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="table">
                                        <div className="table-title">Menu for the selected category</div>
                                        <div className="table-content">
                                            <div className="table-header">
                                                <div className="table-row">
                                                    <div className="table-data">
                                                        <div>Item</div>
                                                    </div>
                                                    <div className="table-data">
                                                        <div>List of ingredients</div>
                                                    </div>
                                                    <div className="table-data">
                                                        <div>Price</div>
                                                    </div>
                                                    <div className="table-data">
                                                        <div>Category</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-body">
                                                {items.map(({food, listOfIngredients, price, category}, index) => (
                                                    <div className="table-row" key={index}>
                                                        <div className="table-data">
                                                            <input
                                                                name="food"
                                                                data-id={index}
                                                                type="text"
                                                                value={food}
                                                                placeholder={food}
                                                                readOnly = {true}
                                                            />
                                                        </div>
                                                        <div className="table-data">
                                                            <input
                                                                name="listOfIngredients"
                                                                data-id={index}
                                                                type="text"
                                                                value={listOfIngredients}
                                                                placeholder={listOfIngredients}
                                                                readOnly = {true}
                                                            />
                                                        </div>
                                                        <div className="table-data">
                                                            <input
                                                                name="price"
                                                                data-id={index}
                                                                type="number"
                                                                value={price}
                                                                placeholder={price}
                                                                readOnly = {true}
                                                            />
                                                        </div>
                                                        <div className="table-data">
                                                            <input
                                                                name="category"
                                                                data-id={index}
                                                                type="text"
                                                                value={category}
                                                                placeholder={category}
                                                                readOnly = {true}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : null}
                    </div>
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
                <nav>
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/AdminActions">
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
                <div className="title">View menu</div>
                {renderForm}
                <Outlet />
            </div>
        </div>
    );
}

export default ViewMenu;