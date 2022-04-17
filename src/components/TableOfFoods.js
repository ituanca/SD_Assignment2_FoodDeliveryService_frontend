import React, { useState } from "react";
import "./tableOfFoods.css";


const TableOfFoods = () => {

    const [items, setItems] = useState([]);

    const handleItemsChange = event => {
        const tempFoods = [...items];
        tempFoods[event.target.dataset.id][event.target.name] = event.target.value;
        setItems(tempFoods);
    };

    const addNewItem = () => {
        setItems(prevItems => [...prevItems, { name: "", ingredients: "", price: 0 }]);
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
                    </div>
                </div>
                <div className="table-body">
                    {items.map(({name, ingredients, price}, index) => (
                        <div className="table-row" key={index}>
                            <div className="table-data">
                                <input
                                    name="name"
                                    data-id={index}
                                    type="text"
                                    value={name}
                                    onChange={handleItemsChange}
                                />
                            </div>
                            <div className="table-data">
                                <input
                                    name="ingredients"
                                    data-id={index}
                                    type="text"
                                    value={ingredients}
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