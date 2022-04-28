import React from 'react'
// import { background } from '../../asset/index'
import NavigationBar from '../../component/navigationBar'
import Axios from 'axios'
import { Carousel } from 'react-bootstrap'
import './home.css'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carousels: [],
            products: []
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
        console.log(this.state.products)

    }
    render() {
        console.log(this.state.carousels)

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
                                        className="d-block w-100 imgCarousel"
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