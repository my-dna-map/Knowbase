import React from 'react';
import './App.css';
import Menu from './Components/Menu';
import { Provider } from "react-redux";
import store from "../src/Store";



function App() {
  return (
    
    <div className="App">
      <Provider store={store}>
      <Menu></Menu>
      </Provider>
     
    </div>
    
  );
}

export default App;
