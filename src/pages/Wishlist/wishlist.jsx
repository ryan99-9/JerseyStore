import React from 'react'
import Axios from 'axios'

class Wishlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prodWithWish: [],
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:2000/products?wishlist=true`)
            .then(res => {
                this.setState({ prodWithWish: res.data })
            })
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign:'center'}}>Your Wishlist {this.state.prodWithWish.length}</h1>
                {this.state.prodWithWish.map(item => {
                return (
                <div className='layerDisplay'>
                    <div className='layerImg'>
                        <img className='contImg' src={item.images[0]} alt="product" />
                    </div>
                    <div className='layerText'>
                        <p>Product Name : {item.name}</p>
                        <p>Brand : {item.brand}</p>
                        <p>Quantity : {item.quantity}</p>
                        <p>Price : Rp{item.price.toLocaleString()} </p>
                    </div>
                    {/* <div className='layerEdit'>
                        <Button className='mr2 mx-3' variant="dark" onClick={() => this.onEdit(index)}>Edit</Button>
                        <Button variant="dark" onClick={() => this.onDelete(index)}>Delete</Button>
                    </div> */}
                </div>
                )
            })}
            </div>
        )
    }
}
export default Wishlist