import React from 'react'


//import komponen dari react router DOM
import { Routes, Route } from 'react-router-dom'
//import component
import Home from './pages/Home/Home.jsx';
import LoginPage from './pages/Login/login.jsx'
import Register from './pages/Register/register';
import DetailPage from './pages/DetailPage/detailPage.jsx'
import Cart from './pages/cart/cart.jsx'
import Wishlist from './pages/Wishlist/wishlist.jsx'

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
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/Login' element={<LoginPage />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/detail' element={<DetailPage />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Wishlist' element={<Wishlist />} />
        </Routes>
      </div>
    );
  }
}

export default connect(null, {keepLogin}) (App);
