import Axios from 'axios'

export const login = (username, password) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/users?username=${username}&password=${password}`)
            .then(res => {
                //Jika inputan salah
                if (res.data.length === 0) {
                    return dispatch({
                        type: 'ERROR_LOGIN'
                    })
                }//jika inputan benar
                else {
                    return dispatch({
                        type: 'LOGIN',
                        payload: res.data[0]
                    })

                }
            })
    }
}

export const errLoginfalse = () => {
    return (dispatch) => {
        return dispatch({
            type: 'ERROR_LOGIN_FALSE'
        })
    }
}