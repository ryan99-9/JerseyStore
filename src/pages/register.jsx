import React from 'react'

import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Register extends React.Component {
    render() {
        return (
            <div style={style.bg}>
                <div style={style.contForm}>
                    <h3 style={{ textAlign: 'center', color: '#ffffff' }}>SIGN UP FOR FREE</h3>
                    <label style={style.labelStyle}>Username</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                        />
                    </InputGroup>
                    <label style={style.labelStyle}>E-mail</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                        />
                    </InputGroup>
                    <label style={style.labelStyle}>Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                        />
                    </InputGroup>
                    <label style={style.labelStyle}>Confirm Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                        />
                    </InputGroup>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <Button style={style.registerButton}>Register</Button>
                    </div>
                    <p style={{ color: 'white', fontSize: '13px',textAlign:'center'}}>Have an account
                        <Link to="/Register" style={{ color: 'white', fontSize: '14px', marginLeft: '6px' }}>Login in
                        </Link></p>
                </div>
            </div>
        )
    }
}

const style = {
    bg: {
        backgroundImage: "url(https://images.unsplash.com/photo-1598634222670-87c5f558119c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
        backgroundSize: 'cover',
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center'
    },
    contForm: {
        width: '30vw',
        height: '72vh',
        marginTop: '18vh',
        border: '',
        backgroundColor: 'rgba(136,153,167, .3)',
        padding: '2%',
        borderRadius: '20px',
        backdropFilter: 'blur(2px)'


    },
    labelStyle: {
        color: '#ffffff'
    },
    registerButton: {
        marginBottom: '5px',
        marginTop: '15px',
        backgroundColor: '#e2a397',
        border: 'none',
    }
}
export default Register