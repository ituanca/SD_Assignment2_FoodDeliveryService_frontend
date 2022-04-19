import React from 'react';
import ReactDOM, {render} from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Router, Routes, Switch} from "react-router-dom";
import LogInAdmin from "./components/LogInAdmin";
import LogInCustomer from "./components/LogInCustomer";
import SignUpCustomer from "./components/SignUpCustomer";
import SignUpAdmin from "./components/SignUpAdmin";
import CreateRestaurant from "./components/CreateRestaurant";
import CreateMenu from "./components/CreateMenu";
import AdminActions from "./components/AdminActions";
import ViewMenu from "./components/ViewMenu";
import CustomerActions from "./components/CustomerActions";
import ViewRestaurants from "./components/ViewRestaurants";
import ViewMenuCustomer from "./components/ViewMenuCustomer";


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const rootElement = document.getElementById("root");


render(

    <BrowserRouter>
        <Routes>
                <Route path="/" element={<App />} />
                <Route path="/LogInAdmin" element={<LogInAdmin />} />
                <Route path="/SignUpAdmin" element={<SignUpAdmin />} />
                <Route path="/CreateRestaurant" element={<CreateRestaurant />} />
                <Route path="/AdminActions" element={<AdminActions />} />
                <Route path="/CreateMenu" element={<CreateMenu />} />
                <Route path="/ViewMenu" element={<ViewMenu />} />
                <Route path="/LogInCustomer" element={<LogInCustomer />} />
                <Route path="/SignUpCustomer" element={<SignUpCustomer />} />
                <Route path="/CustomerActions" element={<CustomerActions />} />
                <Route path="/ViewRestaurants" element={<ViewRestaurants />} />
                <Route path="/ViewMenuCustomer" element={<ViewMenuCustomer />} />
        </Routes>
        {/*<App />*/}
    </BrowserRouter>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
