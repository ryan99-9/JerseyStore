import React from 'react'
import {
    Navbar,
    Container,
    Nav,
    Dropdown,
    Button,
    Image

} from 'react-bootstrap'
import { LOGO } from '../asset'
import {Link} from 'react-router-dom'

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar fixed="top" style={style.navbar}>
                <Container>
                    <Navbar.Brand href="#home">
                        <Image src={LOGO} style={style.image}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link style={style.navLink} as={Link} to="/">Home</Nav.Link>
                            <Nav.Link style={style.navLink} href="#link">Product</Nav.Link>
                            <Nav.Link style={style.navLink} href="#link">Contact Us</Nav.Link>
                        </Nav>
                        <h6 style={{color:'white',marginRight:'20px',marginTop:'10px'}}>MANCHESTER UNITED PERFUME</h6>
                        <Button style={style.button} >
                            <div>
                                <img style={{height:'25px'}}
                                src='https://cdn0.iconfinder.com/data/icons/typicons-2/24/shopping-cart-256.png'/>
                            </div>
                            </Button>
                        <Dropdown style={{marginLeft : '10px'}}>
                            <Dropdown.Toggle style={style.button} id="dropdown-basic">
                                Username
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/Login">Login</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/Register">Register</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}
const style = {
    navbar : {
        backgroundColor : 'rgba(60,88,103,.3)'    
    },
    image : {
        height : '50px',
        width : '75px'
    },
    navLink : {
        color :'white',
    },
    button : {
        backgroundColor: '#ad9a8c',
        border:'none'
    }
}
export default NavigationBar