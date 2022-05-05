import React from 'react'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: [],
        }
    }
    
    render() {
        return (
            <>
                <h1>Hello Cart</h1>
            </>
        )
    }
}

export default Cart