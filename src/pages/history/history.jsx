import React from 'react'
import NavigationBar from '../../component/navigationBar'
import { connect } from 'react-redux'
import './history.css'
import { Accordion } from 'react-bootstrap'
import { getHistory } from '../../redux/action'
import {Navigate }from 'react-router-dom'
import Axios from 'axios'

class History extends React.Component {
    componentDidMount() {
        this.props.getHistory()
    }

    render() {
        if (!this.props.userName) {
            return <Navigate to="/Login" />
        }
        const { history } = this.props
        console.log(history);
        console.log(typeof history);
        // console.log(history.reverse())
        return (
            <>
                <NavigationBar />
                {history.reverse().map((item,index) => {
                    return (
                      <div style={{ marginTop: '4rem' }}>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>hallo {item.username}, your activity in {item.time}</Accordion.Header>
                                <Accordion.Body>
                                   {item.products.map(thing=>{
                                       return(
                                           <div style={{display:'flex'}} className='mr2 mx-3'>
                                               <div style={{paddingRight:'2rem'}}>
                                                   <img src={thing.image} style={{height:'11rem'}} />
                                               </div>
                                              <div>
                                               <p>{thing.name}</p>
                                               <p>brand : {thing.brand}</p>
                                               <p>quantity : {thing.quantity} pcs</p>
                                               <p>Rp {thing.price.toLocaleString()}</p>
                                           </div> 
                                           </div>
                                       )
                                   })}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>  
                    )
                })}




            </>
        )
    }
}
const mapStateToProps = (take) => {
    return {
        history: take.historyReducer.history,
        userName: take.userReducer.username,
    }
}

export default connect(mapStateToProps, { getHistory })(History)




 // productShow = () => {
    //     console.log(this.props.product);
    //     console.log(this.props.time);
    //     this.props.product.map(item => {
    //         return (
    //             <div className='layerDisplay'>
    //                 <div className='layerImg'>
    //                     <img className='contImg' src={item.image} alt="product" />
    //                 </div>
    //                 <div className='layerText'>
    //                     <p>Product Name : {item.name}</p>
    //                     <p>Brand : {item.brand}</p>
    //                     <p>Quantity : {item.quantity}</p>
    //                     <p>Price : Rp {(item.price * item.quantity).toLocaleString()} </p>
    //                 </div>
    //             </div>
    //         )
    //     })
    // }