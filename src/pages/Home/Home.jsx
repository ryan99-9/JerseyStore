import React from 'react'
// import { background } from '../../asset/index'
import NavigationBar from '../../component/navigationBar'
import Axios from 'axios'
import { Carousel, Card, Button } from 'react-bootstrap'
import './home.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {BRI,BCA,LINKAJA,GOPAY,SHOPEE} from '../../asset'

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
        Axios.get('http://localhost:2000/slider')
            .then(res => {
                this.setState({ carousels: res.data })
            })
        Axios.get('http://localhost:2000/products')
            .then(res => {
                this.setState({ products: res.data, max: Math.ceil(res.data.length / this.state.prodPerPage) })
            })
    }
    wishlist = (id) => {
        Axios.patch(`http://localhost:2000/products/${id}`, { wishlist: true })
            .then(res => {
                Axios.get('http://localhost:2000/products')
                    .then(res => {
                        this.setState({ products: res.data })
                        console.log(res.data)
                    })
            })
        this.setState({ wishlist: !this.state.wishlist })
        if (this.state.wishlist) {
            Axios.patch(`http://localhost:2000/products/${id}`, { wishlist: false })
                .then(res => {
                    Axios.get('http://localhost:2000/products')
                        .then(res => {
                            this.setState({ products: res.data })
                        })
                })
        }
    }
    // unWishlist = (id) => {
    //     Axios.patch(`http://localhost:2000/products/${id}`, { wishlist: false })
    //         .then(res => {
    //             Axios.get('http://localhost:2000/products')
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
                                {/* <Button
                                    variant="light"
                                    onClick={() => this.unWishlist(item.id)}
                                    style={{ backgroundColor: 'white', border: 'none', color: 'black', marginRight: '3px' }}>
                                    {item.wishlist ?
                                        <i class="far fa-trash-undo"></i>
                                        :
                                        <i class="fad fa-trash-undo-alt"></i>
                                    }
                                </Button> */}
                                <Button
                                    variant="light"
                                    onClick={() => this.wishlist(item.id)}
                                    // as={Link} to={`/?${item.id}`}
                                    style={{ backgroundColor: 'white', border: 'none', color: 'black', marginRight: '3px' }}
                                >{item.wishlist ?
                                    <i class="fas fa-heart"></i>
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
            <div className='w-100'>
                <NavigationBar />
                <div className='second_layer'>
                    <div className='carousel'>
                        <Carousel>
                            {this.state.carousels.map(item => {
                                return (
                                    <Carousel.Item interval={1000}>
                                        <img
                                            className="d-block imgCarousel"
                                            src={item.image}
                                            alt="First slide"
                                        />
                                        {/* <Carousel.Caption className='captionCar'>
                                        <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption> */}
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </div>
                    <div style={{ marginTop: '14rem', padding: '1rem', marginLeft: '4rem' }}>
                        <h2>Special Product</h2>
                    </div>
                    <div style={{ display: 'flex', marginTop: '1rem', width: '13rem', justifyContent: 'space-between', alignItems: 'center', marginLeft: '4rem' }}>
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
                </div>
                <div>
                    <div className='payment'>Payment</div>
                    <div style={{ display: 'flex', marginLeft: '3rem', marginRight: '20rem', marginTop: '2rem', marginBottom: '4rem' }} >
                        <div className='mr2 mx-3'
                            style={{}}><img
                                style={{ height: '6rem' }}
                                src={SHOPEE}
                                alt="payment" /></div>
                        <div style={{}} ><img
                            style={{ height: '4rem' }}
                            src={LINKAJA}
                            alt="payment" /></div>
                        {/* <div style={{ marginRight: '1rem' }} ><img
                            style={{ height: '4rem' }}
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Logo_Indomaret.png/800px-Logo_Indomaret.png'
                            alt="payment" /></div> */}
                        <div className='mr2 mx-1'
                            style={{}} ><img
                                style={{ height: '6rem' }}
                                src={GOPAY}
                                alt="payment" /></div>
                        <div className='mr1 mx-1'
                            style={{}} ><img
                                style={{ height: '3rem', marginLeft: '2rem' }}
                                src={BRI}
                                alt="payment" /></div>
                        <a><img
                            style={{ height: '3rem', marginLeft: '2rem' }}
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
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer
    }
}
export default connect(mapStateToProps)(Home)


