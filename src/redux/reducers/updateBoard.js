const initialState = () => ({
    title: ''
});

const updateBoard = ((state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_BOARD': {
            return {
                ...state,
                title: action.payload
            }
        }
        default: {
            return state;
        }
    }
})

export default updateBoard;