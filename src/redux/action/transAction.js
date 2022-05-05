import Axios from 'axios'

export const cart = (id, data) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/users/${id}`)
            .then(res => {
                let tempCart = res.data.cart
                console.log(res.data)
                tempCart.push(data)
                Axios.patch(`http://localhost:2000/users/${id}`, { cart: tempCart })

            })
    }
}