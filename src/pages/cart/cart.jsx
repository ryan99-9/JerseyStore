import React from 'react'
// import Axios from 'axios'
import { connect } from 'react-redux'
import './cart.css'
import { Button, FormControl } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import {saveCart,delCart} from '../../redux/action'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            indexEdit: null,
            qty: null,

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
                                <p>item tersisa: {item.stock-item.quantity}</p>
                                <p>Quantity :
                                    <div className='inputEdit'>
                                        <Button variant="danger" onClick={this.onMinus} disabled={qty === 1 ? true : false}>
                                            <i className="fas fa-minus"></i>
                                        </Button>
                                        <FormControl
                                            style={{ width: '40%' }}
                                            value={this.state.qty}
                                            onChange={(e) => this.onChangeQty(e, item.stock)}
                                        />
                                        <Button variant="success" onClick={this.onPlus} disabled={qty === item.stock ? true : false}>
                                            <i className="fas fa-plus"></i>
                                        </Button>
                                    </div>
                                </p>
                                <p>Price : Rp{(item.price * item.quantity).toLocaleString()} </p>
                            </div>
                            <div className='layerEdit'>
                                <Button onClick={() => this.onSave(index)}>Save</Button>
                                
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
                            <p>Price : Rp{(item.price*item.quantity).toLocaleString()} </p>
                        </div>
                        <div className='layerEdit'>
                            <Button onClick={() => this.onEdit(index)}>Edit</Button>
                            <Button onClick={() =>this.onDelete(index)}>Delete</Button>
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

    render() {
        if (!this.props.userName) {
            return <Navigate to="/Login" />
        } 
        // const { cart } = this.state
        // console.log(cart);
        return (
            <>
                <div className='cart'>Your Cart</div>
                <div className='alltrans'>Pilih Semua</div>
                <br />
                {this.onShow()}

            </>
        )
    }
}


const mapStateToProps = (take) => {
    return {
        userCart: take.userReducer.cart,
        userName: take.userReducer.username,
        id:take.userReducer.id
    }
}
export default connect(mapStateToProps,{saveCart,delCart})(Cart)

// componentDidMount() {
    //     let id = this.props.userId
    //     console.log(this.props.userId)
    //     Axios.get(`http://localhost:2000/users/${id}`)
    //         .then(res => {
    //             console.log(res.data)
    //             console.log(res.data.cart)
    //             this.setState({ cart: res.data.cart })
    //         })
    // }