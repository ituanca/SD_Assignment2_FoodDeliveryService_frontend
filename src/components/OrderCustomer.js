import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import React, {useState} from "react";
import axios from "axios";

function OrderCustomer(){

    const [isSubmittedO, setIsSubmittedO] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        customer: [],
        items: {},
        totalPrice: 0,
        deliveryAddress: "",
        details: "",
        restaurant: ""
    });

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        axios
            .post('http://localhost:8080/assignment2/order/create', orderDetails)
            .then((response) => {
                console.info(response);
                if (response.data === false) {
                    localStorage.removeItem("order");
                } else {
                    setIsSubmittedO(true);
                    localStorage.setItem("order", JSON.stringify(orderDetails));
                }
            })
            .catch((error) => {
                console.error("There was an error!", error.response.data.message)
            });
    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setOrderDetails({ ...orderDetails, [name] : value,
            customer: JSON.parse(localStorage.getItem('customer')),
            items: JSON.parse(localStorage.getItem('cart')),
            totalPrice: JSON.parse(localStorage.getItem('totalPrice')),
            restaurant: JSON.parse(localStorage.getItem('restaurant'))
        });
        console.log(orderDetails)
    }

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div>
                    <div>
                        You ordered:
                        {JSON.parse(localStorage.getItem("items")).map(function({id, food, price}) {
                                return (
                                    <div>
                                        {(JSON.parse(localStorage.getItem("cart")).includes(food)) ?
                                            <div>
                                                <li key={id}> {food} {price} $ </li>
                                            </div>
                                            : null}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <span>&nbsp;&nbsp;</span>
                        <div>
                            Delivery address:
                            <input
                                type="address"
                                value={orderDetails.deliveryAddress}
                                onChange={handleInput}
                                name="deliveryAddress" required
                            />
                        </div>
                        <span>&nbsp;&nbsp;</span>
                        <div>
                            Special details that you want to add:
                            <input
                                type="textarea"
                                value={orderDetails.details}
                                onChange={handleInput}
                                name="details" required
                            />
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <input
                        type="submit"
                        value="Place order"/>
                </div>
            </form>
        </div>
    );


    return (
        <div className="app">
            <span>&nbsp;&nbsp;</span>
            <div className="login-form" style={{backgroundColor: 'lightgreen',}}>
                <h4 className="text-center">Order details</h4><span>&nbsp;&nbsp;</span>
                {isSubmittedO ?
                    <div>
                        <h5 className="text-center">
                            Your order was registered!
                            <span>&nbsp;&nbsp;</span>
                        </h5>
                        {/*<span>&nbsp;&nbsp;</span>*/}
                        {/*<Link to="/OrderOptionsCustomer">*/}
                        {/*    <span>&nbsp;&nbsp;</span>*/}
                        {/*    <Button as={Col} variant="success">Go to admin page</Button>*/}
                        {/*</Link>*/}

                        {/*<span>&nbsp;&nbsp;</span>*/}
                        {/*<Link to="/ViewOrderStatus">*/}
                        {/*    <Button as={Col} variant="success">See the status of your order</Button>*/}
                        {/*</Link>*/}
                        {/*<span>&nbsp;&nbsp;</span>*/}

                        {/*<span>&nbsp;&nbsp;</span>*/}
                        {/*<Link to="/OrdersHistory">*/}
                        {/*    <Button as={Col} variant="success">See history of your orders</Button>*/}
                        {/*</Link>*/}
                        {/*<span>&nbsp;&nbsp;</span>*/}

                    </div>: renderForm}
                <span>&nbsp;&nbsp;</span>
                <Link to="/ViewMenuCustomer">
                    <Button as={Col} variant="outline-dark">Go back</Button>
                </Link>
                <span>&nbsp;&nbsp;</span>
                <Outlet />
            </div>
        </div>
    );
}

export default OrderCustomer;