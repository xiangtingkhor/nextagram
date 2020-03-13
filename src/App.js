import React from 'react';
import './App.css';
import HomePage from './page/HomePage';
import UserProfilePage from './page/UserProfilePage';
import { Route } from "react-router-dom";
import Navibar from './component/Navibar';
import {ToastContainer} from 'react-toastify';
import MyProfilePage from './page/MyProfilePage';



function App() {

  return (
  <div>
      <Navibar/>
      <ToastContainer/>
      <switch>
      <Route exact path="/homepage" component={HomePage} />
      <Route exact path="/users/:id" component={UserProfilePage} /> 
      <Route exact path="/myprofile" component={MyProfilePage} />
      </switch>
 

  </div>
  );
}

export default App;