import React, {useState} from 'react';
import './App.css';
import {Col, Container, Row} from 'reactstrap';
import { Button, Navbar } from 'react-bootstrap'
import { PLACES } from './shared/places';

import StartPage from "./components/startPage";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import axios from 'axios';


// function Appp() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
//
// class App extends React.Component {
//
//   state = {
//     customers: []
//   };
//
//   async componentDidMount() {
//     const response = await fetch('http://localhost:8080/assignment2/customer/index');
//     if (!response.ok) {
//       const message = `An error has occured: ${response.status}`;
//       throw new Error(message);
//     }
//     const body = await response.json();
//     this.setState({customers: body});
//   }
//
//   render() { // the API that draws a component on the screen
//     const {customers} = this.state;
//     return (
//         <div className="App">
//           <header className="App-header">
//             <img src={logo} className="App-logo" alt="logo" />
//             <div className="App-intro">
//               <h2>Customers</h2>
//               {customers.map(customer =>
//                   <div key={customer.id}>
//                     {customer.username} {customer.password} {customer.name} ({customer.email})
//                   </div>
//               )}
//             </div>
//           </header>
//         </div>
//     );
//   }
// }
//
// export default StartPage;

// class App extends React.Component {
//
//   constructor(props){
//     super(props);
//     this.state = {
//       places: PLACES
//     };
//   }
//
//   render(){
//
//       const navbarInstance = (
//           <Navbar bg="light" expand="lg">
//           <Container>
//               <Row className="mx-0">
//                   <Button as={Col} variant="outline-primary">Create admin account</Button>
//                   <Button as={Col} variant="outline-primary" className="mx-2">Log in as admin</Button>
//               </Row>
//               <Row className="mx-0">
//                   <Button as={Col} variant="outline-success">Create customer account</Button>
//                   <Button as={Col} variant="outline-success" className="mx-2">Log in as customer</Button>
//               </Row>
//               <Row className="mx-0">
//                  <Button as={Col} variant="outline-dark" className="mx-2">Go back</Button>
//               </Row>
//           </Container>
//       </Navbar>);
//
//     return (
//         <div>
//             {navbarInstance}
//             <div className='App'>
//                 <span>&nbsp;&nbsp;</span>
//                 <h1 class = "text-center">Welcome to Foodpanda!</h1>
//                 {/*<StartPage />*/}
//                 {/*<Menu places={this.state.places} />*/}
//             </div>
//         }}
//         </div>
//
//     );
//   }
// }
//
// export default App;


class App extends React.Component {

    state = {customers: []};

    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    render(){

        // fetch('http://localhost:8080/assignment2/customer/search/mihaiStan', )
        //         .then(async response => {
        //             const data = await response.json();
        //
        //             //check for error response
        //             if(!response.ok){
        //                 const error = (data && data.message) || response.statusText;
        //                 return Promise.reject(error);
        //             }
        //             console.log(data.username + " " + data.password + " " + data.email);
        //         })
        //         .catch(error => {
        //             this.setState({errorMessage: error.toString()});
        //             console.error('There was an error!', error);
        //         });

        return (
            <div>
                {/*{navbarInstance}*/}
                <span>&nbsp;&nbsp;</span>
                <div className='App'>
                    <StartPage />
                </div>
            </div>
        );
  }
}

export default App;