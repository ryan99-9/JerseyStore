import React from 'react'
import {background} from '../../asset/index'

class Home extends React.Component {
    render () {
        return (
            <div style={style.backGround}>
                <img style={style.img}
                src={background} alt='background'/>
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
        backgroundColor : 'white',
        display :'flex',
        justifyContent:'center'
    }
}
export default Home