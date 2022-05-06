import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import axios from "axios";
import "@reach/combobox/styles.css";
import "./tableOfFoods.css";


function ViewMenu(){

    const [categories, setCategories] = useState( [] );
    const [selectedCategory, setSelectedCategory] = useState( "" );
    const [items, setItems] = useState([]);
    const [clickedViewAll, setClickedViewAll] = useState( false );
    const [successfulPdfGeneration, setSuccessfulPdfGeneration] = useState( "" );
    const [disable, setDisable] = React.useState(false);


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
                }
            })
            .catch((error) =>
                console.error("There was an error!", error.response.data.message)
            );

    }, []);

    const menu = localStorage.getItem('menu');
    console.log(menu)

    useEffect(() => {
        axios
            .get("http://localhost:8080/assignment2/food/findByMenu",{
                params:{
                    menu: menu
                }
            })
            .then((response) => {
                console.log(response.data);
                setItems(response.data);
                localStorage.setItem("items", JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    },[menu]);


    const errors = {
        name: "invalid name",
    };

    const handleClick = (event) => {
        setClickedViewAll(true);
        setSelectedCategory("");
    }

    const handleOnChange = (event) => {
        setSelectedCategory(event.target.name);
        setClickedViewAll(false);
        localStorage.setItem("category", JSON.stringify(selectedCategory));
    }

    const saveCategory = () =>  {
        localStorage.setItem("category", JSON.stringify(selectedCategory));
        //console.log(localStorage.getItem("category"))
    }

    const handleClickPDF = (event) => {
        event.preventDefault();
            axios
                .get("http://localhost:8080/assignment2/restaurant/generatePdf", {
                    params:{
                        menu: menu
                    }
                })
                .then((response) => {
                    if(response.data===true){
                        setSuccessfulPdfGeneration('PDF was successfully generated!')
                        console.log(successfulPdfGeneration.toString())
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
    }

    const renderForm = (
        <div className="form">
            <form>
                <div>
                    <Button as={Col} variant="primary" onClick={handleClick}>View the entire menu</Button>
                </div>
                <span>&nbsp;&nbsp;</span>
                <h5>Or choose one category:</h5>
                <span>&nbsp;&nbsp;</span>
                <div className="radio">
                    <div className="row">
                        { categories.map(({ category }, index) => {
                            return (
                                <div>
                                    <div className="col">
                                        <div key={index}>
                                            <div onChange={handleOnChange}>
                                                <input
                                                    type="radio"
                                                    name={category}
                                                    value={category}
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
                        {(clickedViewAll===true) ?
                            <div>
                                <div className="table">
                                    <div className="table-title">Menu</div>
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
                                                            value={category.category}
                                                            placeholder={category.category}
                                                            readOnly = {true}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button as={Col} variant="primary" onClick={handleClickPDF}>Generate PDF</Button>
                                </div>
                                <div>
                                    {(successfulPdfGeneration!=="") ?
                                        <div>
                                            {successfulPdfGeneration}
                                        </div> : null}
                                </div>
                            </div> : null}
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div>
                        {(selectedCategory!=="") ?
                            <div>
                                You selected: {selectedCategory}
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
                                                        (selectedCategory===category.category) ?
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
                                                                        value={category.category}
                                                                        placeholder={category.category}
                                                                        readOnly = {true}
                                                                    />
                                                                </div>
                                                            </div>
                                                            : null
                                                        ))}
                                            </div>
                                        </div>
                                    </div>
                            </div> : null}
                    </div>
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
            <div className="login-form" style={{backgroundColor: 'lightblue',}}>
                <div className="title">View menu</div>
                {renderForm}
                <Outlet />
            </div>
        </div>
    );
}

export default ViewMenu;