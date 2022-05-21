import React from 'react'
// import { background } from '../../asset/index'
import NavigationBar from '../../component/navigationBar'
import Axios from 'axios'
import { Carousel, Card, Button } from 'react-bootstrap'
import './home.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { BRI, BCA, LINKAJA, GOPAY, SHOPEE } from '../../asset'
const API = 'https://database-jersey.herokuapp.com/'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carousels: [],
            products: [],
            wishlist: false,
            page: 1,
            prodPerPage: 4,
            max: 0
        }
    }
    componentDidMount() {
        Axios.get(`${API}slider`)
            .then(res => {
                this.setState({ carousels: res.data })
            })
        Axios.get(`${API}products`)
            .then(res => {
                this.setState({ products: res.data, max: Math.ceil(res.data.length / this.state.prodPerPage) })
            })
    }
    wishlist = (id) => {
        Axios.patch(`${API}products/${id}`, { wishlist: true })
            .then(res => {
                Axios.get(`${API}products`)
                    .then(res => {
                        this.setState({ products: res.data })
                        console.log(res.data)
                    })
            })
        this.setState({ wishlist: !this.state.wishlist })
        if (this.state.wishlist) {
            Axios.patch(`${API}products/${id}`, { wishlist: false })
                .then(res => {
                    Axios.get(`${API}products`)
                        .then(res => {
                            this.setState({ products: res.data })
                        })
                })
        }
    }
    // unWishlist = (id) => {
    //     Axios.patch(`${API}products/${id}` { wishlist: false })
    //         .then(res => {
    //             Axios.get('${API}products')
    //                 .then(res => {
    //                     this.setState({ products: res.data })
    //                 })
    //         })
    // }
    onNextPage = () => {
        this.setState({ page: this.state.page + 1 })

    }
    onPrevPage = () => {
        this.setState({ page: this.state.page - 1 })
    }
    onShowProduct = () => {
        let beginningIndex = (this.state.page - 1) * this.state.prodPerPage
        let currentProd = this.state.products.slice(beginningIndex, beginningIndex + this.state.prodPerPage)
        console.log(currentProd)
        return (
            currentProd.map(item => {
                return (
                    <Card style={{ width: '18rem', marginBottom: '30px' }}>
                        <Card.Img variant="top" src={item.images[0]} />
                        <Card.Body>
                            <Card.Title className='cardText'>{item.brand} {item.name}</Card.Title>
                            <Card.Text className='cardText'>
                                {item.colour}
                            </Card.Text>
                            <Card.Text className='cardText'>
                                IDR {item.price.toLocaleString()}
                            </Card.Text>
                            <Card.Text className='cardText'>
                                Stock {item.stock}
                            </Card.Text>
                            <div className='cardButton'>
                                <Button
                                    variant="light"
                                    onClick={() => this.wishlist(item.id)}
                                    // as={Link} to={`/?${item.id}`}
                                    style={{ backgroundColor: 'white', border: 'none', color: 'black', marginRight: '3px' }}
                                >{item.wishlist ?
                                    <i class="fas fa-heart" style={{ color: 'red' }}></i>
                                    :
                                    <i class="far fa-heart"></i>
                                    }
                                </Button>
                                <Button
                                    variant="light"
                                    style={{ backgroundColor: 'white', border: 'none', color: 'black' }}
                                    as={Link} to={`/detail?${item.id}`}
                                    target='_blank'
                                ><i class="fal fa-shopping-cart"></i></Button>
                            </div>
                        </Card.Body>
                    </Card>
                )
            })
        )
    }
    render() {
        return (
            <div className='mainLayer w-100'>
                <NavigationBar />
                {/* <div className='second_layer'> */}
                <div className='carousel'>
                    <Carousel className='car'>
                        {this.state.carousels.map(item => {
                            return (
                                <Carousel.Item interval={1000} className='carItem'>
                                    <img
                                        className="d-block imgCarousel"
                                        src={item.image}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </div>
                <div className='titleLayer' >
                    <h2>Special Product</h2>
                </div>
                <div className='pagination'>
                    <Button
                        disabled={this.state.page <= 1 ? true : false}
                        onClick={this.onPrevPage}
                        variant="light"><i class="fad fa-angle-double-left"></i></Button>
                    <p style={{ marginBottom: '0px' }}>page {this.state.page} of {this.state.max}</p>
                    <Button
                        disabled={this.state.page >= this.state.max ? true : false}
                        onClick={this.onNextPage}
                        variant="light"><i class="fad fa-angle-double-right"></i></Button>
                </div>
                <div className='product'>
                    {this.onShowProduct()}
                </div>
                {/* </div> */}
                <div className='thirdLayer'>
                    <div className='paymentLayer'>
                        <div className='payment'>Payment</div>
                        <div className='imagePayment' >
                            <a className='mr2 mx-3'
                            ><img
                                    // className='shopee'
                                    style={{height:'6rem'}}
                                    src={SHOPEE}
                                    alt="payment" /></a>
                            <a ><img
                                style={{ height: '4rem', marginTop: '1rem' }}
                                src={LINKAJA}
                                alt="payment" /></a>
                            <a className='mr2 mx-1'
                                style={{}} ><img
                                    style={{ height: '6rem', marginTop: '0.2rem', marginLeft: '0.5rem' }}
                                    src={GOPAY}
                                    alt="payment" /></a>
                            <a className='mr1 mx-1'
                                style={{}} ><img
                                    style={{ height: '2.5rem', marginLeft: '0.5rem', marginTop: '1.8rem' }}
                                    src={BRI}
                                    alt="payment" /></a>
                            <a><img
                                className='bca'
                                src={BCA}
                                alt="payment" /></a>
                        </div>
                    </div>
                    <div className='setContact'>
                        <h1 id='contactus'>Contact Us</h1>
                        <p>RedStore Official adalah akun resmi dari RedStore.</p>
                        <p>Redstore membantu konsumen merasa mudah untuk mendapatkan jersey resmi dari brand terkenal dan juga dari official resmi klub yang bersangkutan</p>
                        <div className='.contItemContact'>
                            <a style={{ padding: '10px' }} href="http://wa.me/6285731040552"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                            <a style={{ padding: '10px' }} href="https://www.linkedin.com/in/nurul-hidayati-khusnia-fatatik-212646190/" ><i class="fab fa-linkedin"></i> Linkedin</a>
                            <a style={{ padding: '10px' }} href="http://instagram.com/conannia17?utm_source=qr"><i class="fab fa-instagram"></i> Instagram</a>
                            <a style={{ padding: '10px' }} href="https://twitter.com/khusniafh"><i class="fab fa-twitter"></i> Twitter</a>
                            <a style={{ padding: '10px' }} href="mailto:conannia17@gmail.com"><i class="fas fa-envelope-open-text"></i>  edoafrian90@gmail.com</a>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer
    }
}
export default connect(mapStateToProps)(Home)


