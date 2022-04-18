import React from 'react'
import NavigationBar from './component/navigationBar';

//import komponen dari react router DOM
import { Routes, Route } from 'react-router-dom'
//import component
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/login';
import Register from './pages/Register/register';

//import Action
import { keepLogin } from './redux/action';

import {connect} from 'react-redux'




class App extends React.Component {
  componentDidMount(){
    let id = localStorage.getItem('idUser')
    this.props.keepLogin(id)
  }
  render() {
    return (
      <div>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
        </Routes>
      </div>
    );
  }
}

export default connect(null, {keepLogin}) (App);
