import Axios from 'axios'

export const cart = (id, data) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/users/${id}`)
            .then(res => {
                let tempCart = res.data.cart
                console.log(res.data.cart)
                tempCart.push(data)

                Axios.patch(`http://localhost:2000/users/${id}`, { cart: tempCart })
                    .then(res => {
                        Axios.get(`http://localhost:2000/users/${id}`)
                            .then(res => {
                                console.log(res.data)
                                return dispatch({
                                    type: 'CART',
                                    payload: res.data
                                })
                            })
                    })

            })
    }
}