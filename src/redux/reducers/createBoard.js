const initialState = {
    boardItem: [
        {
            id: 0,
            title: '1',
            list: [
                {
                    listId: 0,
                    listTitle: 'List 1',
                    listItem: [
                        {
                            cardName: ''
                        }
                    ]
                },
                {
                    listId: 1,
                    listTitle: 'List 2',
                    listItem: [
                        {
                            cardName: ''
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
                        console.log(item)
                        return {
                            ...item,
                            list: [
                                {
                                    listTitle: action.payload.listTitle,
                                    listItem: {
                                        cardName: ''
                                    }
                                }
                            ]
                        }
                    }
                    return item
                })
            }
        }
        case 'CREATE_CARD': {
            return {
                ...state,
                boardItem: state.boardItem.map((item, index) => {
                    console.log()
                    if (item) {
                        console.log(item)
                        item.list.map((list, listIndex) => {
                            if (list.listId === action.payload.listId) {
                                list.listItem.map((card, cardIndex) => {
                                    // console.log(card)
                                    // console.log(action.payload.cardName)
                                    return {
                                        ...list,
                                        cardName: action.payload.cardName
                                    }
                                })
                            }
                            
                        })
                    }
                    return item;
                })
            }
        }
        default:
            return state;
    }
}

export default boards;