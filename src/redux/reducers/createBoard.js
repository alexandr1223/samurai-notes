const initialState = {
    boardItem: [
        {
            title: '1'
        }
    ]
}

const boards = (state = initialState, action) => {
    switch(action.type) {
        case 'CREATE_BOARD': {
            return {
                ...state,
                boardItem: [...state.boardItem, action.payload.new]
            }
        }
        default:
            return state;
    }
}

export default boards;