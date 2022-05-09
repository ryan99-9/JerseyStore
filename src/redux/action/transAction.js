import Axios from 'axios'

export const cart = (id, data) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/users/${id}`)
            .then(res => {
                let tempCart = res.data.cart
                console.log(res.data.cart)
               
                let containCart = tempCart.map(item => {
                    return (
                        item.id
                    )
                })
                // let contCartFromData = tempCart.indexOf(data.id) //index ke brp didalam array, product seperti yang dikirim
                // console.log(containCart)
                // console.log(contCartFromData)
                console.log(containCart.includes(data.id)) // cek data di cart user
                if (containCart.includes(data.id)) {
                    return alert('sudah ada di keranjangmu')
                    // return tempCart.splice(tempCart.indexOf(data.id).quantity,(tempCart.indexOf(data.id).quantity+data.quantity) )
                } else {
                    tempCart.push(data)
                }

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
