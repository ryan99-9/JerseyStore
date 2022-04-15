import React from 'react'

class Login extends React.Component {
    render () {
        return (
            <div style={style.bg}>
                <h1>Login Page</h1>
            </div>
        )
    }
}

const style = {
    bg:{
backgroundImage : "url(https://images.unsplash.com/photo-1598634222670-87c5f558119c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
backgroundSize : 'cover',
height : '100vh',
backgroundPosition : 'center',
backgroundRepeat : 'no-repeat' 
}
}
export default Login