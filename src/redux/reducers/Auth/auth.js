const initialState = {
    isLoaded: false,
    token: '',
    authData: {}
}

const auth = (state = initialState, action) => {
    
    switch(action.type) {
        case 'AUTH': {
            return {
                ...state,
                token: action.payload.token,
                authData: action.payload.authData
            }
        }
        case 'IS_LOADED': {
            return {
                ...state,
                isLoaded: action.payload.isLoaded
            }
        }
        default:
            return state
    }

}
export default auth;