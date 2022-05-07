import React from 'react'
// import { background } from '../../asset/index'
import NavigationBar from '../../component/navigationBar'
import Axios from 'axios'
import { Carousel, Card, Button } from 'react-bootstrap'
import './home.css'
import { Link } from 'react-router-dom'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carousels: [],
            products: [],
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:2000/slider')
            .then(res => {
                this.setState({ carousels: res.data })
            })

        Axios.get('http://localhost:2000/products')
            .then(res => {
                this.setState({ products: res.data })
            })

        //mengaktifkan wishlit. menambahkan properti : false. manual ? lewat function?
        // Axios.get('http://localhost:2000/products')
        //     .then(res => {
        //         res.data.map(item => {
        //             console.log(res.data)
        //             return (
        //                 Axios.post(`http://localhost:2000/products/${item.id}`, `wishlist:${false}`)
        //                     .then(result => {
        //                         console.log(result.data)
        //                         Axios.get('http://localhost:2000/products')
        //                             .then(ress => {
        //                                 this.setState({ products: ress.data })
        //                             })
        //                     })
        //             )
        //         })
        //     })

        // this.state.products.map(item => {
        //     return (
        //         Axios.post(`http://localhost:2000/products/${item.id}`,{wishlist: false})
        //     )
        // })

        // console.log(this.state.products)
        // console.log(this.state.productWithWish)
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

        // let idProduct = document.location.href.substring(23, 24)
        // console.log(idProduct)
        // this.setState({ id: idProcut })
        // this.setState({ wishlist: true })
    }

    unWishlist = (id) => {
        Axios.patch(`http://localhost:2000/products/${id}`, { wishlist: false })
            .then(res => {
                Axios.get('http://localhost:2000/products')
                    .then(res => {
                        this.setState({ products: res.data })

                    })
            })
    }
    render() {
        // console.log(this.state.carousels)
        // console.log(document.location.href)
        console.log(this.state.products);

        return (
            <div>
                {/* <img style={style.img}
                    src={background} alt='background' /> */}
                <NavigationBar />
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
                <div style={{ marginTop: '220px', padding: '40px', marginBottom: '20px' }}>
                    <h2>Special Product</h2>
                </div>
                <div className='product'>
                    {this.state.products.map(item => {
                        return (
                            <Card style={{ width: '18rem', marginBottom: '30px' }}>
                                <Card.Img variant="top" src={item.images[0]} />
                                <Card.Body>
                                    <Card.Title className='cardText'>{item.brand} {item.name}</Card.Title>
                                    <Card.Text className='cardText'>
                                        {item.colour} {item.id}
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
                                            onClick={() => this.unWishlist(item.id)}
                                            style={{ backgroundColor: 'white', border: 'none', color: 'black', marginRight: '3px' }}>
                                            {item.wishlist ?
                                                <i class="far fa-trash-undo"></i>
                                                :
                                                <i class="fad fa-trash-undo-alt"></i>
                                            }
                                        </Button>

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
                                        {/* <p style={{marginLeft:'20px'}} as={Link} to="/detail"></p> */}
                                        {/* <Button  
                                        style={{backgroundColor:'white',border:'none',color:'black'}}>
                                            </Button> */}
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
                    })}
                </div>
                <div className='payment'>Payment</div>
                <div style={{ display: 'flex',marginLeft:'3rem',marginRight:'40rem',marginTop:'2rem'}} >
                    <div style={{ flexBasis: '50%' }}><img
                        style={{height:'5rem'}}
                        src="https://1.bp.blogspot.com/-8aj5-2xrgbA/X30_86ndgPI/AAAAAAAAHPA/7LrHzutC85w5iVT_WtYYb3dmGvo5arjUwCLcBGAsYHQ/w640-h320/logo-shopee-pay.png"
                        alt="payment" /></div>
                    <div style={{ flexBasis: '50%' }} ><img
                        style={{height:'5rem'}}
                        src='https://1.bp.blogspot.com/-GjCpjdW8Hrs/XkXUvE0RseI/AAAAAAAABmk/u5e1zr7RGHQN2TFwPu1IoN8QJBtwXLH5QCLcBGAsYHQ/s400/Logo%2BLink%2BAja%2521.png'
                        alt="payment" /></div>
                    <div style={{ flexBasis: '50%'}} ><img
                        style={{height:'5rem'}}
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Logo_Indomaret.png/800px-Logo_Indomaret.png'
                        alt="payment" /></div>
                </div>
                <div style={{ display: 'flex',marginLeft:'3rem',marginRight:'40rem',marginTop:'2rem' }} >
                    <div style={{ flexBasis: '50%'}} ><img
                        style={{ height: '4rem' }}
                        src='https://www.freepnglogos.com/uploads/logo-bca-png/bank-bca-solutions-agate-26.png'
                        alt="payment" /></div>
                    <div style={{ flexBasis: '50%' }} ><img
                        style={{ height: '4rem', marginLeft:'2rem' }}
                        src='https://www.freepnglogos.com/uploads/logo-bca-png/bank-bca-file-bank-bri-logo-svg-wikimedia-commons-8.png'
                        alt="payment" /></div>
                    <div style={{ flexBasis: '50%' }} ><img
                        style={{ height: '5rem', marginLeft:'2rem' }}
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/MasterCard_early_1990s_logo.png/800px-MasterCard_early_1990s_logo.png?20170118155024'
                        alt="payment" /></div>
                </div>
            </div>
        )
    }
}
// const style = {
//     img: {
//         width: '40vw',
//         height: '100vh',
//         marginTop: '50px'

//     },
//     backGround: {
//         backgroundColor: 'blue',
//         display: 'flex',
//         justifyContent: 'center'
//     }
// }
export default Home