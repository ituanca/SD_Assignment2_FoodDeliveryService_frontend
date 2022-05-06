import React, {useState} from 'react';
import './App.css';

import StartPage from "./components/startPage";
import background from "./img/background2.jpg"

class App extends React.Component {

    state = {customers: []};

    render(){

        return (
            <div>
                {/*{navbarInstance}*/}
                <div className='App'>
                    <StartPage />
                </div>
            </div>
        );
  }
}

export default App;