import React from 'react'

import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { Link,Navigate } from 'react-router-dom'
import './register.css'
import { register } from '../../redux/action'
import { connect } from 'react-redux'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            visibility2: false,
            errRegist: [false, "kondisi state awal - onChange blm jalan"],
            email: [false, "kondisi state awal - onChange blm jalan"]

        }
    }

    onRegister=()=> {     
        let username = this.refs.username.value
        console.log(username)
        let password = this.refs.password.value
        let email = this.refs.email.value
        
        let addingData = {
            username: username,
            password: password,
            email: email,
            role: "user",
            cart: []
        }
        console.log(addingData)
        
        //addingData ditambahkan ke DataBase
        this.props.register(username,email,addingData)
        
        if(this.props.errorRegister){
            alert('data sudah ada')
        }

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
        if (teksUser.length >= 1 && teksUser.length <= 3) {
            this.setState({ errRegist: [true, "Terlalu pendek namanya"] })
        } else this.setState({ errRegist: [false, ""] })
    }

    ruleOfEmail(a) {
        let b = a.target.value
        let c = '.com'
        let d = '@'
        if (!b.includes(c, d) && b.length !==0) {
            this.setState({ email: [true, "format: example@exam.com"] })
        } 
        else this.setState({ email: [false, ""] })
    }
    render() {
        const { visibility, visibility2 } = this.state
        //Register sudah sukses
        if(this.props.succesRegister){
            return <Navigate to="/Login" />
        }
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
                            ref="username"
                        />
                    </InputGroup>

                    <p style={{ color: "red" }}>
                        {this.state.errRegist[1]}
                    </p>

                    <label className='textLabel'>E-mail</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i class="far fa-envelope"></i></InputGroup.Text>
                        <FormControl
                            placeholder="example@exam.com"
                            ref="email"
                            type="text"
                            onChange={(a) => this.ruleOfEmail(a)}
                        />
                    </InputGroup>
                    <p style={{ color: "red" }}>
                        {this.state.email[1]}
                    </p>

                    <label className='textLabel'>Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility: !visibility })}>
                            {visibility ? <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>}
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                            type={visibility ? "text" : "password"}
                            ref="password"
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
function mapStateToProps (take){
return{
    succesRegister : take.userReducer.succesRegist,
    errorRegister : take.userReducer.errorRegist
}
}

export default connect(mapStateToProps, { register })(Register)