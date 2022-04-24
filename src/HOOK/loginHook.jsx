import React from 'react'

import { InputGroup, FormControl, Button, Modal } from 'react-bootstrap'
import { Link} from 'react-router-dom'
import './LoginHook.css'
import { connect, useSelector } from 'react-redux'
import { login, errLoginfalse } from '../redux/action/userAction'
import { useState} from 'react'


function LoginPage () {

    const [visibility, setVisibility] = useState(false)
    const [error, setError] = useState(false)

    // const {errorLogin} = useSelector((state)=>{
    //     return {
    //         errorLogin : state.userReducer.errorLogin
    //         // dataUser : state.userReducer,
    //         // userName : state.userReducer.username
    //     }
    // })
    const errorLogin = useSelector((state)=>state.userReducer.errorLogin)
    console.log(errorLogin)
    function onLogin () {
        let username = document.getElementById("usernameValue").value
        let password = document.getElementById("passwordValue").value
        console.log(username,password)
        //ambil data dari username dan password
        // let username = username1.current.focus()
        // let password = password1.current.focus()

        
        //Kalau ada input yang masih kosong, dikasih notif jika tidak boleh ada yang kosong
        if (!username || !password) {
            return setError(true)
        }
        //Cek apakah data username dan password yang di input user/diambil sudah ada didatabase 
        // this.props.login(username, password)
        //memanggil function di action
        

    }

    // console.log(this.props.dataUser)
    // if (this.props.userName) {
    //     return <Navigate to="/" />
    // }
    // const { visibility } = this.state
    return (
        <div className='bg'>
            <div className='contForm'>
                <h1 className='textHello'>HELLO</h1>
                <label className='textLabel'>Username</label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                        <div className='usernameIcon'>@</div>
                    </InputGroup.Text>
                    <FormControl
                        placeholder="Input Here"
                        type="text"
                        id="usernameValue"
                    />
                </InputGroup>
                <label className='textLabel'>Password</label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1" onClick={() => setVisibility({ visibility: !visibility })}>
                        {visibility ?
                            <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>
                        }

                    </InputGroup.Text>
                    <FormControl
                        placeholder="Input Here"
                        id="passwordValue"
                        type={visibility ? "text" : "password"}
                    />
                </InputGroup>
                <Button onClick={onLogin()} className='loginButton'>Login in</Button>
                <p className='textHaveAccount'>Do you have an account?
                    <Link to="/Register" className='textRegister'>Register
                    </Link></p>
                <Modal show={error}>
                    <Modal.Header>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Input your data before Login Please!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setError(false)} variant="secondary">Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={errorLogin}>
                    <Modal.Header>
                        <Modal.Title>Your login is failed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>This account doesn't exist!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={errLoginfalse} variant="secondary">Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )

}
// const mapStateToProps = (take) => {
//     return {
//         errorLogin: take.userReducer.errorLogin,
//         dataUser: take.userReducer,
//         userName: take.userReducer.username
//     }
// }
export default connect({ login, errLoginfalse })(LoginPage)