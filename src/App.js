import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Greet from './components/Greet'
import Welcome from './components/Welcome'
import Hello from './components/Hello'
import Message from './components/Message'
import Login from './components/Login.js'
import Axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap'
import styles from './styles/modal.module.css'
import io from 'socket.io-client'

function App() {


  return (
    
    <div className="App">
      {/* <Message/> */}
      {/* <Greet name = "Nelson" food = "steak">
        <p>This is children props</p>
      </Greet> */}
      {/* <Greet name = {initialData.username} food = "ice cream"/> */}
      {/* <Welcome name = "Nelson" food = "steak"/>  */}
      {/* <Welcome name = "Mario" food = "ice cream"/>  */}
      {/* <Hello /> */}
      <Login/>
    </div>
  );
}

export default App;
