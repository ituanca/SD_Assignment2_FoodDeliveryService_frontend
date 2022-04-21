import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import "@reach/combobox/styles.css";


function AdminActions(){

    return (
        <div className="app">
            <span>&nbsp;&nbsp;</span>
            <div className="login-form" style={{backgroundColor: 'lightblue',}}>
                <div className="title">Admin</div>
                <div>
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/CreateMenu">
                        <Button as={Col} variant="primary">Add food to menu</Button>
                    </Link>
                    <span>&nbsp;&nbsp;</span>

                    <span>&nbsp;&nbsp;</span>
                    <Link to="/ViewMenu">
                        <Button as={Col} variant="primary">View menu</Button>
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

export default AdminActions;