import React from 'react'

import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false
        }
    }
    render() {
        const {visibility} = this.state
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
                            type={visibility ? "text" : "password"}
                        />
                    </InputGroup>
                    <Button className='loginButton'>Login in</Button>
                    <p className='textHaveAccount'>Do you have an account?
                        <Link to="/Register" className='textRegister'>Register
                        </Link></p>
                </div>
            </div>
        )
    }
}

export default Login