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
            toLogin: false,
            toCart: false,
            cart:[]
        }
    }

    componentDidMount() {
        // console.log(document.location.href);
        let idUrl = document.location.href.substring(29, 31)
        // console.log(idUrl)
        Axios.get(`http://localhost:2000/products/${idUrl}`)
            .then(res => {
                // console.log(res.data)
                this.setState({ product: res.data })
            })
            this.setState({cart:this.props.userCart})
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
            image: product.images[0],
            quantity: qty,
            id: product.id
        }
        console.log(this.props.userName);
        if (!this.props.userName) {
            // console.log(typeof this.props.userName);
            this.setState({ toLogin: true })
        } 
        this.props.cart(this.props.userId, cart)
        this.setState({ toCart: true })
        
    }
    render() {
        console.log(typeof this.state.product.price);
        const { product, qty, toLogin, toCart } = this.state
        console.log(product);
        if (toLogin) {
            return <Navigate to="/Login" />
        } else if (toCart) {
            return <Navigate to="/Cart" />
        }
        return (
            <div>
                <NavigationBar />
                <div className='layer'>
                    <div className='contImg'>
                        {/* <img src={product.images} alt='product' /> */}
                        <Carousel
                            style={{ width: '40vw', marginTop: '20px',}}>
                            {(product.images ? product.images : []).map((item, index) => {
                                return (
                                    <Carousel.Item key={index}
                                        style={{marginTop: '0vh',backgroundColor:'none' }}>
                                        <img
                                            className="d-block"
                                            src={item}
                                            alt="First slide"
                                            style={{
                                                marginRight: 'auto',
                                                marginLeft: 'auto',
                                                marginTop: '0vh',
                                                marginBottom: '100px',
                                                height: '40vh',
                                                backgroundColor: 'purple'

                                            }}
                                        />
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </div>
                    <div className='detail'>
                        <p className='name'>{product.name}</p>
                        <p className='brand'>Brand : {product.brand}</p>
                        <p className='price'
                        >Rp {product.price ? product.price.toLocaleString() : ""} </p>
                        <p style={{ marginBottom: '5px' }}>Category : {product.category}</p>
                        <p>Description : {product.description}</p>
                        <p>Stock : {product.stock} </p>
                        <p>{product.wishlist ?
                            <i class="fas fa-heart"
                                style={{ color: "black", border: "none" }}></i> :
                            <i class="fas fa-heart"
                                style={{ color: "grey", border: "none" }}></i>}</p>
                        <p>Quantity</p>
                        <div style={{ display: 'flex', width: '30%', textAlign: 'center' }}>
                            <Button
                                variant="dark"
                                onClick={this.onMinus}
                            >-</Button>
                            <FormControl
                                value={qty}
                                onChange={(e) => this.onChange(e)}
                                style={{ textAlign: 'center' }}
                            />
                            <Button
                                variant="dark"
                                onClick={this.onPlus}
                            >+</Button>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ backgroundColor: 'none', flexBasis: '40%' }}> </div>
                    <div className='addCart'>
                        <Button
                            variant="outline-dark"
                            style={{ marginRight: '10px' }}>
                            <i class="fal fa-comment-alt-dots"></i> Chat</Button>
                        <Button
                            variant="outline-dark"
                            onClick={this.onCart}
                            style={{ marginLeft: '10px' }}>
                            <i class="fal fa-cart-plus"></i> Add to Cart</Button>
                    </div>
                </div>
            </div>

        )

    }

}
const mapStateToProps = (take) => {
    return {
        userName: take.userReducer.username,
        userId: take.userReducer.id,
        userCart: take.userReducer.cart,
    }
}
export default connect(mapStateToProps, { cart })(DetailPage)