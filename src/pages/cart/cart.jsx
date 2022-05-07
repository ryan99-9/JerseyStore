import React from 'react'
// import Axios from 'axios'
import { connect } from 'react-redux'
import './cart.css'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
        }
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
        // const { cart } = this.state
        // console.log(cart);
        const {userCart} = this.props
        return (
            <>
            <div className='cart'>Your Cart</div>
            <div className='alltrans'>Pilih Semua</div>

            {userCart.map(item=>{
                return(
                     <div className='layerDisplay'>
                    <div className='layerImg'>
                        <img 
                        className='contImg'
                        src={item.image} 
                        alt='product' />
                    </div>
                    <div className='layerText'>
                        <p>Product Name : {item.name}</p>
                        <p>Brand : {item.brand}</p>
                        <p>Quantity : {item.quantity}</p>
                        <p>Price : Rp{(item.price*item.quantity).toLocaleString()} </p>
                    </div>
                </div>
                )
            })}

          
               
            </>
        )
    }
}
const mapStateToProps = (take) => {
    return {
        userCart: take.userReducer.cart
    }
}
export default connect(mapStateToProps)(Cart)