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
                    //Menyimpan data idUser ke local storage
                    localStorage.setItem('idUser', res.data[0].id)
                    //Mengirim data ke userReducer
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

export const logOut = () => {
    return (dispatch) => {
        //menghapus data di storage
        localStorage.removeItem('idUser')
        //Kirim perintah ke userReducer
        return dispatch({
            type: 'LOG_OUT'
        })
    }
}

export const keepLogin = (id) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/users/${id}`)
            .then(res => {
                return dispatch({
                    type: 'LOGIN',
                    payload: res.data
                })
            })

    }
}