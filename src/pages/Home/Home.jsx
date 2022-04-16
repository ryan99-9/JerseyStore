import React from 'react'

class Home extends React.Component {
    render () {
        return (
            <div style={style.backGround}>
                <img style={style.img}
                src='https://images.unsplash.com/photo-1590736704728-f4730bb30770?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=474&q=80'/>
            </div>
        )
    }
}
const style = {
    img :{
        width : '40vw',
        height :'100vh',
        marginTop:'50px'

    },
    backGround :{
        backgroundColor : 'black',
        display :'flex',
        justifyContent:'center'
    }
}
export default Home