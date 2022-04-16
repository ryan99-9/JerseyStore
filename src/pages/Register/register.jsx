import React from 'react'

import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './register.css'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            visibility2: false
        }
    }
    render() {
        const { visibility,visibility2 } = this.state
        return (
            <div className='bg'>
                <div className='contForm1'>
                    <h3 className='textSignUpFree'>SIGN UP FOR FREE</h3>
                    <label className='textLabel'>Username</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                        />
                    </InputGroup>
                    <label className='textLabel'>E-mail</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i class="far fa-envelope"></i></InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                        />
                    </InputGroup>
                    <label className='textLabel'>Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility: !visibility })}>
                        {visibility ? <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>}
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                            type={visibility ? "text" : "password"}
                        />
                    </InputGroup>
                    <label className='textLabel'>Confirm Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility2: !visibility2 })}>
                            {visibility2 ? <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>}
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                            type={visibility2 ? "text" : "password"}
                        />
                    </InputGroup>
                    <div className='register'>
                        <Button className='registerButton'>Register</Button>
                    </div>
                    <p className='textHaveAccount'>Have an account
                        <Link to="/Login" className='linkLogin'>Login in
                        </Link></p>
                </div>
            </div>
        )
    }
}

export default Register