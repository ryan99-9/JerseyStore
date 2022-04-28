import React from 'react'
import {
    Navbar,
    Container,
    Nav,
    Dropdown,
    Button,
    Image,
    InputGroup,
    FormControl

} from 'react-bootstrap'
import { LOGO } from '../asset'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../redux/action/userAction'
import './Navbar.css'

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seacrh: false,
        }
    }
    render() {
        return (
            <Navbar fixed="top" className="navBg">
                <div className='logo_name'>
                    <Image src={LOGO} className="logo" />
                    <h3 class="nameStore">RedStore</h3>
                </div>
                <Container>
                    {/* <Navbar.Brand href="#home">
                        <Image src={LOGO} className="logo" />
                    </Navbar.Brand> */}
                    <div className="search">
                     <InputGroup className="mb-3">
                        <FormControl className="formControl"
                            placeholder="Manchester United"
                        />
                        <InputGroup.Text id="basic-addon1" className="formControl" onClick={()=>this.setState({search:true})} >
                            {this.state.search? "cari" : "find"}
                        </InputGroup.Text>
                    </InputGroup>   
                    </div>
                    

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className="navbarText" as={Link} to="/">Home</Nav.Link>
                            <Nav.Link className="navbartext" onSelect={this.NavigationBar}>Kategori</Nav.Link>
                        </Nav>
                        {/* <h6 style={{ color: 'white', marginRight: '20px', marginTop: '10px' }}>MANCHESTER UNITED PERFUME</h6> */}
                        {/* <Button> */}
                            {/* <i style={{ color: 'white' }} class="fas fa-shopping-cart"></i> */}
                        {/* </Button> */}
                        <Dropdown >
                            <Dropdown.Toggle style={{backgroundColor:'#e8e8e8',border:'none',color:'black'}} id="dropdown-basic">
                                {this.props.userNameShow ? `Hello ${this.props.userNameShow}` : "Username"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {this.props.userNameShow ?
                                    <>
                                        <Dropdown.Item>Profile</Dropdown.Item>
                                        <Dropdown.Item>History</Dropdown.Item>
                                        <Dropdown.Item onClick={this.props.logOut}>Log Out </Dropdown.Item>
                                    </>
                                    :
                                    <>
                                        <Dropdown.Item as={Link} to="/Login">Login</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/Register">Register</Dropdown.Item>
                                    </>
                                }

                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

const mapStateToProps = (take) => {
    return {
        userNameShow: take.userReducer.username
    }
}
export default connect(mapStateToProps, { logOut })(NavigationBar)