const initialState = {
    boardItem: [
        {
            id: 0,
            title: '1',
            boardImage: [{
                regular: '',
                small: '',
                colors: ''
            }],
            list: [
                {
                    listId: 0,
                    listTitle: 'List 1',
                    openCardCreation: false,
                    listItem: [
                        {
                            cardId: 0,
                            cardName: 'Complete all task'
                        },
                        {
                            cardId: 1,
                            cardName: '23232'
                        }
                    ]
                },
                {
                    listId: 1,
                    listTitle: 'List 2',
                    openCardCreation: false,
                    listItem: [
                        {
                            cardId: 0,
                            cardName: 'Change color'
                        }
                    ]
                }
            ]
        }
    ]
}

const boards = (state = initialState, action) => {
   
    switch(action.type) {
        case 'OPEN_CARD_CREATION': {
            return {
                ...state,
                boardItem: state.boardItem.map((item) => {
                    if (item.id === action.payload.boardIndex) {
                        return {
                            ...item,
                            list: item.list.map((listItem) => {
                                if (listItem.listId === action.payload.listIndex) {
                                    return {
                                        ...listItem,
                                        openCardCreation: action.payload.openCardCreation
                                    }
                                } else {
                                    return {
                                        ...listItem,
                                        openCardCreation: false
                                    }
                                }
                            })
                        }
                    }
                    return item;
                })
            }
        }
        case 'CREATE_CARD': {
            return {
                ...state,
                boardItem: state.boardItem.map((item, index) => {
                    if (item.id === action.payload.boardIndex) {
                        return {
                            ...item,
                            list: item.list.map((listArray) => {
                                
                                if (listArray.listId === action.payload.listId) {
                                    let cardId = [0];
                                    if (listArray.listItem.length > 0) {
                                        cardId = listArray.listItem.map(list => {
                                            return list.cardId
                                        })
                                    }
                                    let newCardName = {
                                        cardId: cardId.pop() + 1,
                                        cardName: action.payload.cardName
                                    }
                                    return {
                                        ...listArray,
                                        listItem: [...listArray.listItem, newCardName]
                                    }
                                }
                                return listArray;
                            })
                        }
                    }
                    return item;
                })
            }
        }
        case 'CREATE_CARD_IN_POSITION': {
            return {
                ...state,
                boardItem: state.boardItem.map((item, index) => {
                    if (item.id === action.payload.boardIndex) {
                        console.log(action.payload.insertAfter)
                        return {
                            ...item,
                            list: item.list.map((listArray) => {
                                
                                if (listArray.listId === action.payload.listId) {
                                    let cardId = [0];
                                    if (listArray.listItem.length > 0) {
                                        cardId = listArray.listItem.map(list => {
                                            return list.cardId
                                        })
                                    }
                                    console.log(cardId)
                                    let newCardName = {
                                        cardId: cardId.pop() + 1,
                                        cardName: action.payload.cardName
                                    }
                                    return {
                                        ...listArray,
                                        listItem: [...listArray.listItem.slice(0, action.payload.insertAfter + 1), newCardName, ...listArray.listItem.slice(action.payload.insertAfter + 1)]
                                    }
                                }
                                return listArray;
                            })
                        }
                    }
                    return item;
                })
            }
        }
        case 'CREATE_LIST': {
            return {
                ...state,
                boardItem: state.boardItem.map((item) => {
                    console.log(action.payload.id)
                    if (item.id === action.payload.id) {
                        let newId = item.list.map(list => {
                            return list.listId
                        })
                        if (newId.length === 0) {
                            newId = [-1]
                        }
                        const newList = {
                            listId: newId.pop() + 1,
                            listTitle: action.payload.listTitle,
                            openCardCreation: false,
                            listItem: []
                        }
                        return {
                            ...item,
                            list: [...item.list, newList]
                        }
                    }
                    return item
                })
            }
        }
        case 'CREATE_BOARD': {
            return {
                ...state,
                boardItem: [...state.boardItem, action.payload.new]
            }
        }
        case 'CHANGE_LIST_TITLE': {
            return {
                ...state,
                boardItem: state.boardItem.map((item, index) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            list: item.list.map((listItem) => {
                                if (listItem.listId === action.payload.listId) {
                                    return {
                                        ...listItem,
                                        listTitle: action.payload.listTitle
                                    }
                                }
                                return listItem;
                            })
                        }
                    }
                    return item;
                })
            }
        }
        case 'DELETE_CARD': {
            return {
                ...state,
                boardItem: state.boardItem.map((item) => {
                    if (item.id === action.payload.boardId) {
                        return {
                            ...item,
                            list: item.list.map((listItem) => {
                                if (listItem.listId === action.payload.listId) {
                                    return {
                                        ...listItem,
                                        listItem: [...listItem.listItem.slice(0, action.payload.cardId), ...listItem.listItem.slice(action.payload.cardId + 1)]
                                    }
                                }
                                return listItem
                            })
                        }
                    }
                    return item;
                })
            }
        }
        case 'DELETE_LIST': {
            return {
                ...state,
                boardItem: state.boardItem.map((item) => {
                    console.log(item.id)
                    console.log(action.payload.boardId)
                    if (item.id === action.payload.boardId) {
                        return {
                            ...item,
                            list: [...item.list.slice(0, action.payload.listId), ...item.list.slice(action.payload.listId + 1)]
                        }
                    }
                    return item;
                })
            }
        }
        case 'DELETE_BOARD': {
            return {
                ...state,
                boardItem: [...state.boardItem.slice(0, action.payload.boardId), ...state.boardItem.slice(action.payload.boardId + 1)]
            }
        }
        case 'CHANGE_BOARD_BG': {
            return {
                ...state,
                boardItem: state.boardItem.map(item => {
                    if (item.id === action.payload.boardId) {
                        return {
                            ...item,
                            boardImage: item.boardImage.map(image => {
                                return {
                                    ...image,
                                    regular: action.payload.regularImage,
                                    small: action.payload.smallImage,
                                    colors: action.payload.color
                                }
                            })
                        }
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