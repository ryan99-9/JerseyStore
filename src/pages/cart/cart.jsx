import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
        }
    }
    componentDidMount() {
        let id = this.props.userId
        console.log(this.props.userId)
        Axios.get(`http://localhost:2000/products/users/${id}`)
            .then(res => {
                console.log(res.data)
                console.log(res.data.cart)
                this.setState({ cart: res.data.cart })
            })
    }
    render() {
        const { cart } = this.state
        return (
            <>
                <div style={{ display: 'flex' }}>
                    <div>
                        <img src={ cart.image? cart.image : ""} />
                    </div>
                    <div>
                        <p>{cart.name}</p>
                        <p>{cart.brand}</p>
                        <p>{cart.quantity}</p>
                        <p>Total price for this product : </p>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (take) => {
    return {
        userId: take.userReducer.id
    }
}
export default connect(mapStateToProps)(Cart)