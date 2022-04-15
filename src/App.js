import React from 'react'
import NavigationBar from './component/navigationBar';

//import komponen dari react router DOM
import { Routes , Route } from 'react-router-dom'

//import component
import Home from './pages/Home'
import Login from './pages/login'
import Register from './pages/register'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home/>} exact />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Register' element={<Register/>} />
        </Routes>
      </div>
    );
  }
}

export default App;
