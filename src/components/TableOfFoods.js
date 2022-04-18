import React, { useState } from "react";
import "./tableOfFoods.css";


const TableOfFoods = () => {

    const [items, setItems] = useState([]);

    // const [itemsRegistration, setItemsRegistration] = useState(
    //     [
    //         {
    //             name: "",
    //             ingredients: "",
    //             price: 0,
    //             category: ""
    //         }
    //         ]);

   // const handleChangeOfRegistration = event => {
   //     const name = event.target.name;
   //     const value = event.target.value;
   //     setItemsRegistration({ ...itemsRegistration, [name] : value,
   //         category: JSON.parse(localStorage.getItem('category'))});
   //  }

    const chosenCategory = JSON.parse(localStorage.getItem("category"));

    const handleItemsChange = (event) => {
        const tempFoods = [...items];
        tempFoods[event.target.dataset.id][event.target.name] = event.target.value;
        setItems(tempFoods);
        console.log(items)
        localStorage.setItem("listOfFood", JSON.stringify(items));
        //console.log(items);
    };

    const addNewItem = () => {
        setItems(prevItems => [...prevItems, { food: "", listOfIngredients: "", price: 0, category: chosenCategory}]);
    };

    return (
        <div className="table">
            <div className="table-title">Add some items</div>
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
                                    onChange={handleItemsChange}
                                />
                            </div>
                            <div className="table-data">
                                <input
                                    name="listOfIngredients"
                                    data-id={index}
                                    type="text"
                                    value={listOfIngredients}
                                    onChange={handleItemsChange}
                                />
                            </div>
                            <div className="table-data">
                                <input
                                    name="price"
                                    data-id={index}
                                    type="number"
                                    value={price}
                                    onChange={handleItemsChange}
                                />
                            </div>
                            <div className="table-data">
                                <input
                                    name="category"
                                    data-id={index}
                                    type="text"
                                    value={category}
                                    placeholder={localStorage.getItem('category')}
                                    readOnly = {true}
                                    onChange={handleItemsChange}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="table-row">
                        <div className="table-data">
                            <button onClick={addNewItem}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableOfFoods;