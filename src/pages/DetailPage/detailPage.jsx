import React from 'react'
import Axios from 'axios'
import './detailPage.css'
import { Carousel, FormControl, Button } from 'react-bootstrap'
import NavigationBar from '../../component/navigationBar'
import { connect } from 'react-redux'
import { cart } from '../../redux/action'
import { Navigate } from 'react-router-dom'


class DetailPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [],
            qty: 1,
            toLogin: false
        }
    }

    componentDidMount() {
        let idUrl = document.location.href.substring(29, 30)
        console.log(idUrl)
        Axios.get(`http://localhost:2000/products/${idUrl}`)
            .then(res => {
                this.setState({ product: res.data })
            })
    }

    onPlus = () => {
        this.setState({ qty: this.state.qty + 1 })
        if (this.state.qty >= this.state.product.stock) {
            this.setState({ qty: this.state.product.stock })
        }
    }

    onMinus = () => {
        this.setState({ qty: this.state.qty - 1 })
        if (this.state.qty <= 1) {
            this.setState({ qty: 1 })
        }
    }
    onChange = (e) => {
        // this.setState({ qty: +e.target.value })
        // this.onPlus()
        // this.onMinus()
        let input = +e.target.value
        if (input >= this.state.product.stock) {
            this.setState({ qty: this.state.product.stock })
        } else if (input <= 1) {
            this.setState({ qty: 1 })
        } else {
            this.setState({ qty: input })
        }
    }

    onCart = () => {
        const { product, qty } = this.state
        let cart = {
            name: product.name,
            brand: product.brand,
            price: product.price,
            quantity: qty
        }
        console.log(cart);
        if (!this.props.userName) {
            // console.log(typeof this.props.userName);
            this.setState({ toLogin: true })
        }
        this.props.cart(this.props.userId, cart)


    }
    render() {
        const { product, qty, toLogin } = this.state
        if (toLogin) {
            return <Navigate to="/Login" />
        }
        return (
            <div>
                <NavigationBar />
                <div style={{ marginTop: '70px', textAlign: 'right', padding: '5px' }}>
                    <Button onClick={this.onCart} >Add to Cart</Button>
                </div>
                <div className='layer'>
                    <div className='contImg'>
                        {/* <img src={product.images} alt='product' /> */}
                        {/* <Carousel >
                            {(product.images ? product.images : []).map(item => {
                                return (
                                    <Carousel.Item>
                                        <img
                                            className="d-block img"
                                            src={item}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel> */}
                    </div>
                    <div className='detail'>
                        <p className='name'>{product.name}</p>
                        <p>Brand : {product.brand}</p>
                        <p>Category : {product.category}</p>
                        <p>Description : {product.description}</p>
                        <p>IDR {product.price} </p>
                        <p>Stock : {product.stock} </p>
                        <p>{product.wishlist ?
                            <i class="fas fa-heart" style={{ color: "black", border: "none" }}></i> :
                            <i class="fas fa-heart" style={{ color: "grey", border: "none" }}></i>}</p>
                        <p>Quantity</p>
                        <div style={{ display: 'flex', backgroundColor: 'red' }}>
                            <Button onClick={this.onMinus}>-</Button>
                            <FormControl
                                value={qty}
                                onChange={(e) => this.onChange(e)}
                            />
                            <Button onClick={this.onPlus} >+</Button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}
const mapStateToProps = (take) => {
    return {
        userName: take.userReducer.username,
        userId: take.userReducer.id
    }
}
export default connect(mapStateToProps, { cart })(DetailPage)