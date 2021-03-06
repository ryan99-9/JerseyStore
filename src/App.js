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
import History from './pages/history/history.jsx';
import HistoryAdmin from './pages/historyAdmin/historyAdmin.jsx'
import NotFound from './pages/notFound.jsx';

//import Action
import { keepLogin } from './redux/action';

import { connect } from 'react-redux'




class App extends React.Component {
  componentDidMount() {
    let id = localStorage.getItem('idUser')
    this.props.keepLogin(id)
  }
  render() {
    if (this.props.role === "admin") {
      return (
        <div>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/Login' element={<LoginPage />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/detail' element={<DetailPage />} />
            <Route path='/HistoryAdmin' element={<HistoryAdmin />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      );
    } else if(this.props.role === "user") {
      return (
        <div>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/Login' element={<LoginPage />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/detail' element={<DetailPage />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Wishlist' element={<Wishlist />} />
            <Route path='/History' element={<History />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      );
    } else {
      return (
        <div>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/Login' element={<LoginPage />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/detail' element={<DetailPage />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Wishlist' element={<Wishlist />} />
            <Route path='/History' element={<History />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      );
    }

  }
}
const mapStateToProps = (state) => {
  return {
    role: state.userReducer.role
  }
}
export default connect(mapStateToProps, { keepLogin })(App);
