import React from 'react'
import {
    Navbar,
    Container,
    Nav,
    Dropdown,
    Button,
    Image,
    InputGroup,
    FormControl,
    Badge

} from 'react-bootstrap'
import { LOGO } from '../asset'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../redux/action/userAction'
import './Navbar.css'
import Axios from 'axios'

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seacrh: false,
            prodWithWish: [],
            products: [],
        }
    }
    componentDidMount() {
        Axios.get(`http://localhost:2000/products?wishlist=true`)
            .then(res => {
                this.setState({ prodWithWish: res.data })
            })
        Axios.get('http://localhost:2000/products')
            .then(res => {
                this.setState({ products: res.data })
                console.log(res.data);
            })
        // this.onFilter()
    }
    onFilter = () => {
        let inputFilter = this.refs.filter.value
        // let allProduct = this.state.products.map(item=>{
        //     return (
        //         item.name
        //         )
        // })
        // console.log(allProduct);
        // const res = this.state.products[0].name.filter(inputFilter)
        // console.log(res);


    }
    render() {
        // console.log(this.props.role)
        if (this.props.role === "admin") {
            return (
                <Navbar fixed="top" className="navBg" >
                    <div className='logo_name'>
                        <Image src={LOGO} className="logo" />
                        <h3 class="nameStore">RedStore</h3>
                    </div>
                    <Container className='cont'>
                        <div className="search">
                            <InputGroup className="mb-3">
                                <FormControl className="formControl"
                                    placeholder="Manchester United"
                                    ref="filter"
                                />
                                {/* <InputGroup.Text id="basic-addon1" className="formControl" onClick={() => this.setState({ search: true })} >
                                    {this.state.search ? "cari" : "find"}
                                </InputGroup.Text> */}
                                <Button onClick={this.onFilter}>filter</Button>
                            </InputGroup>
                        </div>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="navbarText" as={Link} to="/">Home</Nav.Link>
                            </Nav>
                            <Nav className="mr3">
                                <Nav.Link className="navbarText" as={Link} to="/HistoryAdmin">History Cart</Nav.Link>
                            </Nav>
                            <Dropdown >
                                <Dropdown.Toggle style={{ backgroundColor: '#e8e8e8', border: 'none', color: 'black' }}
                                    id="dropdown-basic"
                                >
                                    {/* {this.props.userNameShow ? `Hello ${this.props.userNameShow}` : "Username"} */}
                                    Hello {this.props.userNameShow}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={this.props.logOut}>Log Out </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )
        } else if (this.props.role === "user") {
            return (
                <Navbar fixed="top" className="navBg">
                    <div className='logo_name'>
                        <Image src={LOGO} className="logo" />
                        <h3 class="nameStore">RedStore</h3>
                    </div>
                    <Container className='cont'>
                        <div className="search">
                            <InputGroup className="mb-3">
                                <FormControl className="formControl"
                                    placeholder="Manchester United"
                                />
                                {/* <InputGroup.Text id="basic-addon1" className="formControl" onClick={this.onFilter} >
                                    find
                                </InputGroup.Text> */}
                                <Button onClick={this.onFilter}>Filter</Button>
                            </InputGroup>
                        </div>


                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="navbarText" as={Link} to="/">Home</Nav.Link>
                                <Nav.Link className="navbartext" onSelect={this.NavigationBar}>Kategori</Nav.Link>
                            </Nav>
                            <Button variant="outline-secondary"
                                as={Link} to="/Wishlist"
                                style={{ border: 'none' }}
                            >Wishlist <Badge bg="outline-light" text="dark">{this.state.prodWithWish.length}</Badge></Button>
                            <Button variant="outline-secondary"
                                as={Link} to="/Cart"
                                style={{ border: 'none' }}>
                                Cart <Badge bg="outline-light" text="dark">{this.props.cart.length}</Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Button>
                            <Dropdown >
                                <Dropdown.Toggle style={{ backgroundColor: '#e8e8e8', border: 'none', color: 'black' }}
                                    id="dropdown-basic"
                                >
                                    Hello {this.props.userNameShow}
                                    {/* {this.props.userNameShow ? `Hello ${this.props.userNameShow}` : "Username"} */}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Profile</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/History" >History</Dropdown.Item>
                                    <Dropdown.Item onClick={this.props.logOut}>Log Out </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )
        } else {
            return (
                <Navbar fixed="top" className="navBg">
                    <div className='logo_name'>
                        <Image src={LOGO} className="logo" />
                        <h3 class="nameStore">RedStore</h3>
                    </div>
                    <Container>
                        <div className="search">
                            <InputGroup className="mb-3">
                                <FormControl className="formControl"
                                    placeholder="Manchester United"
                                />
                                <InputGroup.Text id="basic-addon1" className="formControl" onClick={() => this.setState({ search: true })} >
                                    {this.state.search ? "cari" : "find"}
                                </InputGroup.Text>
                            </InputGroup>
                        </div>


                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className="navbarText" as={Link} to="/">Home</Nav.Link>
                                <Nav.Link className="navbartext" onSelect={this.NavigationBar}>Kategori</Nav.Link>
                            </Nav>
                            <Button variant="outline-secondary"
                                as={Link} to="/Wishlist"
                                style={{ border: 'none' }}
                            >Wishlist</Button>
                            <Button variant="outline-secondary"
                                as={Link} to="/Cart"
                                style={{ border: 'none' }}>
                                Cart <Badge bg="secondary">{this.props.cart.length}</Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Button>
                            <Dropdown >
                                <Dropdown.Toggle style={{ backgroundColor: '#e8e8e8', border: 'none', color: 'black' }}
                                    id="dropdown-basic"
                                >
                                    Username
                                    {/* {this.props.userNameShow ? `Hello ${this.props.userNameShow}` : "Username"} */}
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
}

const mapStateToProps = (take) => {
    return {
        userNameShow: take.userReducer.username,
        cart: take.userReducer.cart,
        role: take.userReducer.role
    }
}
export default connect(mapStateToProps, { logOut })(NavigationBar)

{/* {this.props.userNameShow ?
                                        <>
                                            <Dropdown.Item>Profile</Dropdown.Item>
                                            <Dropdown.Item onClick={this.props.logOut}>Log Out </Dropdown.Item>
                                        </>
                                        :
                                        <>
                                            <Dropdown.Item as={Link} to="/Login">Login</Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/Register">Register</Dropdown.Item>
                                        </>
                                    } */}