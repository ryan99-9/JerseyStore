import React from 'react'

import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './register.css'
import { register } from '../../redux/action'
import { connect } from 'react-redux'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            visibility2: false,
            errRegist: [false, "onChange blm jalan"]

        }
    }
    onRegister() {
        let username = document.getElementById("username").value
        let password = document.getElementById("password").value
        let email = document.getElementById("email").value

        let addingData = {
            username: username,
            password: password,
            email: email,
            role: "user",
            cart: []
        }
        this.props.register(addingData)
    }

    ruleOfUsername(a) {
        // let user = document.getElementById("username").value

        // if (symbol.test.user) {
        //     this.setState.errRegist([true, "Hilangkan symbol"])
        // }
        // console.log(eE.target.value)
        let teksUser = a.target.value
        console.log(teksUser)
        // let symbol = /[!@#$%^&*]/
        if (teksUser.length === 1 && teksUser.length <= 3) {
            this.setState({ errRegist: [true, "onChange sudah jalan"] })
        } else this.setState({errRegist: [false, "onChange blm jalan"]})
    }

    render() {
        const { visibility, visibility2 } = this.state
        return (
            <div className='bg'>
                <div className='contForm1'>
                    <h3 className='textSignUpFree'>SIGN UP FOR FREE</h3>
                    <label className='textLabel'>Username</label>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl
                            onChange={(a) => this.ruleOfUsername(a)}
                            placeholder="Input Here"
                            id="username"
                        />
                    </InputGroup>

                    <p style={{ color: "red" }}>
                        {this.state.errRegist[1]}
                    </p>

                    <label className='textLabel'>E-mail</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i class="far fa-envelope"></i></InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                            id="email"
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
                            id="password"
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
                        <Button className='registerButton' onClick={this.onRegister}>Register</Button>
                    </div>
                    <p className='textHaveAccount'>Have an account
                        <Link to="/Login" className='linkLogin'>Login in
                        </Link></p>
                </div>
            </div>
        )
    }
}

export default connect(null, { register })(Register)