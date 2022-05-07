const INITIAL_STATE = {
    id: null,
    username: "",
    password: "",
    role: "",
    cart:[],
    errorLogin: false,
    suksesRegist: false,
    errorRegist: false,
}
if(!INITIAL_STATE.id == null){
  console.log(INITIAL_STATE)  
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                password: action.payload.password,
                role: action.payload.role,
                cart: action.payload.cart
            }
        case 'ERROR_LOGIN':
            
            return {
                ...state,
                errorLogin: true
            }
        case 'ERROR_LOGIN_FALSE':
            return {
                ...state,
                errorLogin: false
            }
        case 'LOG_OUT':
            return {
                ...state,
                username: ""
            }
        case 'SUCCESS_REGIST':
            return {
                ...state,
                suksesRegist: true
            }
        case 'USERNAME_EMAIL_EXIST':
            return {
                ...state,
                errorRegist: true
            }
            case 'CART':
                return {
                    ...state,
                    cart:action.payload.cart
                }
        default:
            return state
    } 
} 

export default userReducer

