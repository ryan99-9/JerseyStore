import React from 'react'
import Axios from 'axios'
import NavigationBar from '../../component/navigationBar'
import {Accordion} from 'react-bootstrap'
const API = 'https://database-jersey.herokuapp.com/'

class HistoryAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allHistory: []
        }
    }

    componentDidMount() {
        Axios.get(`${API}history`)
            .then(res => {
                this.setState({ allHistory: res.data })
            })

    }
    render() {
        return (
            <div>
                <NavigationBar />
                {this.state.allHistory.reverse().map((item, index) => {
                    return (
                        <div style={{ marginTop: '4rem' }}>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header> {item.username} activity in {item.time}</Accordion.Header>
                                    <Accordion.Body>
                                        {item.products.map(thing => {
                                            return (
                                                <div style={{ display: 'flex' }} className='mr2 mx-3'>
                                                    <div style={{ paddingRight: '2rem' }}>
                                                        <img src={thing.image} style={{ height: '11rem' }} />
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
            </div>
        )
    }
}

export default HistoryAdmin