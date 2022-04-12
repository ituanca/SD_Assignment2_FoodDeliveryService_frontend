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
                <Route path="/LogInCustomer" element={<LogInCustomer />} />
                <Route path="/SignUpCustomer" element={<SignUpCustomer />} />
        </Routes>
        {/*<App />*/}
    </BrowserRouter>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
