const INITIAL_STATE = {
    id : null,
    username: "",
    password: "",
    role:""

}

const userReducer = (state=INITIAL_STATE,action) => {
switch(action.type){
    case 'LOGIN' :
        return {
            ...state,
            id: action.payload.id,
            username: action.payload.username,
            password: action.payload.password,
            role: action.payload.role
        }
        default:
            return state
}
}

export default userReducer

