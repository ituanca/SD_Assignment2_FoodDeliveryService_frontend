import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import "@reach/combobox/styles.css";


function CustomerActions(){

    return (
        <div className="app">
            <span>&nbsp;&nbsp;</span>
            <div className="login-form">
                <div className="title">Customer</div>
                <div>

                    <span>&nbsp;&nbsp;</span>
                    <Link to="/ViewRestaurants">
                        <Button as={Col} variant="success">View restaurants</Button>
                    </Link>
                    <span>&nbsp;&nbsp;</span>

                    <span>&nbsp;&nbsp;</span>
                    <Link to="/">
                        <Button as={Col} variant="outline-dark">Go back</Button>
                    </Link>
                    <span>&nbsp;&nbsp;</span>

                </div>
                <Outlet />
            </div>
        </div>
    );

}

export default CustomerActions;