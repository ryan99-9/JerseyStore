import axios from 'axios'
import React from 'react'

import { InputGroup, FormControl, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Login.css'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            error: false,
            errorLogin: false
        }
    }
    onLogin = () => {
        //ambil data dari username dan password
        let username = this.refs.username.value
        let password = this.refs.password.value

        //Kalau ada input yang masih kosong, dikasih notif jika tidak boleh ada yang kosong
        if (!username || !password) {
            return this.setState({error:true})
        }
        //Cek apakah data username dan password yang di input user/diambil sudah ada didatabase 
        axios.get(`http://localhost:2000/users?username=${username}&password=${password}`)
        .then(res=>{
            //Jika inputan salah
            if(res.data.length === 0) {
                return this.setState({errorLogin:true})
            }//jika inputan benar
            else{
                return this.state.res.data
                
            }
        })

    }
    render() {
        const { visibility } = this.state
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
                            ref="username"
                        />
                    </InputGroup>
                    <label className='textLabel'>Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility: !visibility })}>
                            {visibility ?
                                <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>
                            }

                        </InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                            ref="password"
                            type={visibility ? "text" : "password"}
                        />
                    </InputGroup>
                    <Button onClick={this.onLogin} className='loginButton'>Login in</Button>
                    <p className='textHaveAccount'>Do you have an account?
                        <Link to="/Register" className='textRegister'>Register
                        </Link></p>
                    <Modal show={this.state.error}>
                        <Modal.Header>
                            <Modal.Title>Error</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Input your data before Login Please!</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=> this.setState({error:false})} variant="secondary">Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.errorLogin}>
                        <Modal.Header>
                            <Modal.Title>Your login is failed</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>This account doesn't exist!</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=> this.setState({errorLogin:false})} variant="secondary">Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Login