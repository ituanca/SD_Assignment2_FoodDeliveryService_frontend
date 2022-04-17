import React, {useState} from 'react';
import './App.css';

import StartPage from "./components/startPage";


class App extends React.Component {

    state = {customers: []};

    render(){

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