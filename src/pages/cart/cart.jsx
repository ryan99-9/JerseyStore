import React from 'react'
// import Axios from 'axios'
import { connect } from 'react-redux'
import './cart.css'
import { Button, Table } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],

        }
    }
    showTHead = () => {
        return (
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
        )
    }
    showTBody = () => {
        const { userCart } = this.props
        return (
            <tbody>
                {userCart.map((item, index) => {
                    return (
                        <tr>
                            <td>
                                {/* <div className='layerImg'> */}
                                <img
                                    className='contImg'
                                    src={item.image}
                                    alt='product' />
                            {/* </div> */}
                            </td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>Rp {item.price.toLocaleString()}</td>
                            <td>edit , delete</td>
                        </tr>
                    )
                })}
            </tbody>
            // <div className='layerDisplay'>

            //     <div className='layerText'>
            //         <p>Product Name : {item.name}</p>
            //         <p>Brand : {item.brand}</p>
            //         <div style={{ display: 'flex' }}>
            //             <p>Quantity : {item.quantity}</p>
            //             <Button onClick={() => this.onEdit}>Edit</Button>
            //         </div>
            //         <p>Price : Rp{(item.price * item.quantity).toLocaleString()} </p>
            //     </div>
            // </div>     

        )

    }
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
                <Table striped bordered hover>
                    {this.showTHead()}
                    {this.showTBody()}
                </Table>
            </>
        )
    }
}


const mapStateToProps = (take) => {
    return {
        userCart: take.userReducer.cart,
        userName: take.userReducer.username,
    }
}
export default connect(mapStateToProps)(Cart)