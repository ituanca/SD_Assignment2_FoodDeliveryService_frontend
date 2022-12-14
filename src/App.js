import React, {useState} from 'react';
import './App.css';

import StartPage from "./components/startPage";
import background from "./img/background2.jpg";

class App extends React.Component {
    render(){
        return (
            <div>
                <div className='App'>
                    <StartPage />
                </div>
            </div>
        );
  }
}

export default App;