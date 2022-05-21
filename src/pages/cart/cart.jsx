import React from 'react'
// import Axios from 'axios'
import { connect } from 'react-redux'
import './cart.css'
import { Button, FormControl, Modal, InputGroup } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { saveCart, delCart, checkout } from '../../redux/action'
import NavigationBar from '../../component/navigationBar'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            indexEdit: null,
            qty: null,
            emptyCart: false,
            askPas: false,
            visibility: false,
            checkpas: false,
            toHistory: false

        }
    }
    // componentDidMount() {
    //     this.setState({ cart: this.props.userCart })
    // }

    onShow = () => {
        // console.log(this.state.cart)
        // console.log(this.state.qty);
        const { qty } = this.state
        return (
            this.props.userCart.map((item, index) => {
                if (this.state.indexEdit === index) {
                    return (
                        <div className='layerDisplay'>
                            <div className='layerImg'>
                                <img className='contImg' src={item.image} alt="product" />
                            </div>
                            <div className='layerText'>
                                <p>Product Name : {item.name}</p>
                                <p>Brand : {item.brand}</p>
                                <p>item tersisa: {item.stock - item.quantity}</p>
                                <p>Quantity :
                                    <div className='inputEdit'>
                                        <Button variant="dark" onClick={this.onMinus} disabled={qty === 1 ? true : false}>
                                            <i className="fas fa-minus"></i>
                                        </Button>
                                        <FormControl
                                            style={{ width: '40%' }}
                                            value={this.state.qty}
                                            onChange={(e) => this.onChangeQty(e, item.stock)}
                                        />
                                        <Button variant="dark" onClick={this.onPlus} disabled={qty === item.stock ? true : false}>
                                            <i className="fas fa-plus"></i>
                                        </Button>
                                    </div>
                                </p>
                                <p>Price : Rp{(item.price * item.quantity).toLocaleString()} </p>
                            </div>
                            <div className='layerEdit'>
                                <Button variant="dark" onClick={() => this.onSave(index)}>Save</Button>

                            </div>
                        </div>
                    )
                }
                return (
                    <div className='layerDisplay'>
                        <div className='layerImg'>
                            <img className='contImg' src={item.image} alt="product" />
                        </div>
                        <div className='layerText'>
                            <p>Product Name : {item.name}</p>
                            <p>Brand : {item.brand}</p>
                            <p>Quantity : {item.quantity}</p>
                            <p>Price : Rp{(item.price * item.quantity).toLocaleString()} </p>
                        </div>
                        <div className='layerEdit'>
                            <Button className='mr2 mx-3' variant="dark" onClick={() => this.onEdit(index)}>Edit</Button>
                            <Button variant="dark" onClick={() => this.onDelete(index)}>Delete</Button>
                        </div>
                    </div>
                )
            })
        )
    }
    onDelete = (index) => {
        // alert('onDelete')
        this.props.delCart(this.props.id, index)
    }
    onEdit = (index) => {
        this.setState({ indexEdit: index, qty: this.props.userCart[index].quantity })
    }
    onMinus = () => {
        this.setState({ qty: this.state.qty - 1 })
    }

    onPlus = () => {
        this.setState({ qty: this.state.qty + 1 })
    }
    onChangeQty = (e, stockProd) => {
        let value = +e.target.value

        if (value <= 1) {
            this.setState({ qty: 1 })
        } else if (value > stockProd) {
            this.setState({ qty: stockProd })
        } else {
            this.setState({ qty: value })
        }
    }
    onSave = (index) => {
        this.props.saveCart(this.props.id, index, this.state.qty)
        // console.log(this.props.id, index, this.state.qty);
        this.setState({ indexEdit: null })
    }
    onCheckout = () => {
        if (this.props.userCart.length === 0) {
            this.setState({ emptyCart: true })

        }
        this.setState({ askPas: true })
    }
    onOkPas = () => {
        // alert('fungsi menuju history jalan')
        let pas = this.refs.passwordUser.value
        if (pas !== this.props.password) {
            return this.setState({ checkpas: true })
        }
        let data = {
            idUser: this.props.id,
            username: this.props.userName,
            time: new Date().toLocaleString(),
            products: this.props.userCart
        }
        this.props.checkout(this.props.id, data)
        this.setState({ askPass: false, toHistory: true })

    }
    render() {
        const { visibility, checkpas, toHistory } = this.state
        if (!this.props.userName) {
            return <Navigate to="/Login" />
        } else if (toHistory) {
            return <Navigate to="/History" />
        }
        // const { cart } = this.state
        // console.log(cart);

        return (
            <>
                <NavigationBar />
                <div className='cart'>Your Cart</div>
                <div className='alltrans'>Pilih Semua</div>
                <br />
                <Button variant="dark" onClick={this.onCheckout}>Checkout</Button>
                <br />
                {this.onShow()}
                <Modal show={this.state.emptyCart} onHide={() => this.setState({ emptyCart: false })}>
                    <Modal.Header closeButton>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Your Cart is Still Empty</p>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
                {/* modal for password */}
                <Modal show={this.state.askPas} onHide={() => this.setState({ askPas: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please Input your password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility: !visibility })}>
                                {visibility ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                            </InputGroup.Text>
                        </InputGroup>
                        <FormControl
                            placeholder='Input Here...'
                            type={visibility ? "text" : "password"}
                            style={{ width: '40%' }}
                            ref="passwordUser"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onOkPas} variant="secondary">Next</Button>
                        {/* <Button variant="primary">Save changes</Button> */}
                    </Modal.Footer>
                </Modal>
                {/* modal alert wrong password */}
                <Modal show={checkpas} onHide={() => this.setState({ checkpas: false })}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You Type Wrong Password</p>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="secondary">Close</Button>
                        <Button variant="primary">Save changes</Button> */}
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}


const mapStateToProps = (take) => {
    return {
        userCart: take.userReducer.cart,
        userName: take.userReducer.username,
        id: take.userReducer.id,
        password: take.userReducer.password,
    }
}
export default connect(mapStateToProps, { saveCart, delCart, checkout })(Cart)

// componentDidMount() {
    //     let id = this.props.userId
    //     console.log(this.props.userId)
    //     Axios.get(`${API}users/${id}`)
    //         .then(res => {
    //             console.log(res.data)
    //             console.log(res.data.cart)
    //             this.setState({ cart: res.data.cart })
    //         })
    // }