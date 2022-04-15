import React from 'react'

import { InputGroup, FormControl,Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'

class Login extends React.Component {
    render() {
        return (
            <div style={style.bg}>
                <div style={style.contForm}>
                    <h1 style={{textAlign:'center', color:'#ffffff'}}>HELLO</h1>
                    <label style={style.text1}>Username</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                        />
                    </InputGroup>
                    <label style={style.text1}>Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                        />
                    </InputGroup>
                    <Button  style={style.loginButton}>Login in</Button>
                    <p style={{color :'white',fontSize:'13px'}}>Do you have an account? 
                    <Link to="/Register" style={{color:'white',fontSize:'14px',marginLeft:'6px'}}>Register
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
        display : 'flex',
        justifyContent : 'center'
    },
    contForm :{
        width :'30vw',
        height : '60vh',
        marginTop : '20vh',
        border : '',
        backgroundColor: 'rgba(136,153,167, .3)',
        padding : '2%',
        borderRadius : '20px',
        backdropFilter : 'blur(2px)' 
    

    },
    text1 : {
        color :'#ffffff'
    },
    loginButton : {
        marginBottom:'5px',
        backgroundColor: '#e2a397',
        border :'none'
    }
}
export default Login