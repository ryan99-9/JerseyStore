import React from 'react'

import { InputGroup, FormControl, Button,Modal } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import './register.css'
import { register } from '../../redux/action'
import { connect } from 'react-redux'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            visibility2: false,
            errUsername: [false, ""],
            errEmail: [false, ""],
            errPass: [false, ""],
            errRegist: [false, ""],
        }
    }

    ruleOfUsername(e) {
        let inputUser = e.target.value
        console.log(inputUser);
        // let symb = /^[a-z0-9_.]+$/
        if (inputUser.length > 0 && inputUser.length < 3) {
            this.setState({ errUsername: [true, "Username must be 3 characters or more"] })
        } this.setState({ errUsername: [false, ""] })
    }
    ruleOfEmail(e) {
        let inputEmail = e.target.value
        // let regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let format = ["@",".com"]
        if (inputEmail.includes(format[0],format[1]) && inputEmail.length > 0) {
            this.setState({ errEmail: [true, "Emai isn't valid, please type correctly"] })
        }
        this.setState({ errEmail: [false, ""] })
    }
    ruleOfPassword(e) {
        let inputPass = e.target.value
        if (inputPass.length < 6 && inputPass.length > 0) {
            return this.setState({ errPass: [true, "Password must be 6 characters"] })
        }
        this.setState({ errPass: [false, ""] })

    }

    onRegister = () => {
        let username = this.refs.username.value
        console.log(username)
        let password = this.refs.password.value
        let confpass = this.refs.confpass.value
        let email = this.refs.email.value

        let addingData = {
            username: username,
            password: password,
            email: email,
            role: "user",
            cart: []
        }
        // console.log(addingData)
        const { errUsername, errEmail, errPass } = this.state
        if (errUsername[0] || errEmail[0] || errPass[0]) {
            return this.setState({ errRegist: [true, "Make Sure all of data is valid"] })
        }
        if (!username || !email || !password) {
            return this.setState({ errRegist: [true, "Please input all of data"] })
        }
        if (confpass !== password) {
            return this.setState({ errRegist: [true, "Please type confirm password correctly"] })
        }

        //addingData ditambahkan ke DataBase
        this.props.register(username, email, addingData)

        if (this.props.errorRegister) {
            this.setState({ errRegist: [true, "Data has been exist"] })
        }

    }

    render() {
        const { visibility, visibility2 } = this.state
        //Register sudah sukses
        if (this.props.succesRegister) {
            return <Navigate to="/Login" />
        }
        // console.log(this.props.succesRegister)
        return (
            <div className='bg'>
                <div className='contForm1'>
                    <h3 className='textSignUpFree'>SIGN UP FOR FREE</h3>
                    <label className='textLabel'>Username</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl
                            onChange={(e) => this.ruleOfUsername(e)}
                            placeholder="Input Here"
                            ref="username"
                        />
                    </InputGroup>
                    <p style={{ color: "red" }}>
                        {this.state.errUsername[1]}
                    </p>
                    <label className='textLabel'>E-mail</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i class="far fa-envelope"></i></InputGroup.Text>
                        <FormControl
                            placeholder="example@exam.com"
                            ref="email"
                            type="text"
                            onChange={(e) => this.ruleOfEmail(e)}
                        />
                    </InputGroup>
                    <p style={{ color: "red" }}>
                        {this.state.errEmail[1]}
                    </p>

                    <label className='textLabel'>Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility: !visibility })}>
                            {visibility ? <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>}
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                            type={visibility ? "text" : "password"}
                            onChange={(e) => this.ruleOfPassword(e)}
                            ref="password"
                        />
                    </InputGroup>
                    <p style={{ color: "red" }}>
                        {this.state.errPass[1]}
                    </p>
                    <label className='textLabel'>Confirm Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility2: !visibility2 })}>
                            {visibility2 ? <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>}
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                            type={visibility2 ? "text" : "password"}
                            ref="confPass"
                        />
                    </InputGroup>
                    <div className='register'>
                        <Button className='registerButton' onClick={this.onRegister}
                        >Register</Button>
                    </div>
                    <p className='textHaveAccount'>Have an account
                        <Link to="/Login" className='linkLogin'>Login in
                        </Link></p>
                </div>
                <Modal.Dialog show={this.state.errRegist[0]}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.state.errRegist[1]}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary">Close</Button>
                        <Button variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}
function mapStateToProps(take) {
    return {
        succesRegister: take.userReducer.suksesRegist,
        errorRegister: take.userReducer.errorRegist
    }
}

export default connect(mapStateToProps, { register })(Register)