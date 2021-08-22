const initialState = {
    boardItem: [
        {
            id: 0,
            title: '1',
            list: [
                {
                    listTitle: '111',
                    listItem: [
                        {
                            card: ''
                        }
                    ]
                }
            ]
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
        case 'CREATE_LIST': {
            
            return {
                ...state,
                boardItem: state.boardItem.map((item, index) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            list: [
                                {
                                    listTitle: action.payload.listTitle,
                                    listItem: {
                                        card: ''
                                    }
                                }
                            ]
                        }
                    }
                    return item
                })
            }
        }
        default:
            return state;
    }
}

export default boards;