const initialState = {
    current: 0
}

const currentBoard = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_BOARD': {
            return {
                ...state,
                current: action.payload
            }
        }
        default:
            return state;
    }
}

export default currentBoard;