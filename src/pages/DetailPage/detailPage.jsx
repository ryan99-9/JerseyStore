import React from 'react'
import Axios from 'axios'
import './detailPage.css'
import { Carousel } from 'react-bootstrap'
import navigationBar from '../../component/navigationBar'


class DetailPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [],
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

    render() {
        const { product } = this.state
        return (
            <div>
               <navigationBar/> 
                <div>

                </div>
               <div className='layer'>
                <div>
                    <img src={product.images} alt='product' />
                    {/* <Carousel>
                       {(product.images? product.images:"").map(item => {
                        return (
                            <Carousel.Item>
                                <img
                                    className="d-block"
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
                    <p>{product.wishlist? 
                    <i class="fas fa-heart" style={{color:"red", border:"none"}}></i>:
                    <i class="fas fa-heart" style={{color:"grey", border:"none"}}></i> }</p>
                </div>
            </div> 
            </div>
            
        )
    }

}

export default DetailPage