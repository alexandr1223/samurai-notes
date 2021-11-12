export const createBoard = (boardItem, index) => ({
    type: 'CREATE_BOARD',
    payload: {
        new: {
            id: index,
            title: boardItem,
            list: [
                {
                    listId: 0,
                    listTitle: 'First title',
                    openCardCreation: false,
                    listItem: [
                    ],
                },
            ]
        }
    }
})

export const openCardCreation = (value, listIndex, boardIndex) => ({
    type: 'OPEN_CARD_CREATION',
    payload: {
        openCardCreation: value,
        listIndex: listIndex,
        boardIndex: boardIndex
    }
})

export const changeListTitle = (newListTitle, listIndex, boardId) => ({
    type: 'CHANGE_LIST_TITLE',
    payload: {
        id: boardId,
        listId: listIndex,
        listTitle: newListTitle,
    }
})

export const createList = (listTitle, boardId) => ({
    type: 'CREATE_LIST',
    payload: {
        id: boardId,
        listTitle: listTitle,
    }
})

export const createCard = (cardName, listId, boardIndex) => ({
    type: 'CREATE_CARD',
    payload: {
        listId: listId,
        cardName: cardName,
        boardIndex: boardIndex
    }
})

export const cardDelete = (boardId, listId, cardId) => ({
    type: 'DELETE_CARD',
    payload: {
        listId: listId,
        cardId: cardId,
        boardId: boardId
    }
})

export const listDelete = (boardId, listId) => ({
    type: 'DELETE_LIST',
    payload: {
        listId: listId,
        boardId: boardId
    }
})

export const boardDelete = (boardId) => ({
    type: 'DELETE_BOARD',
    payload: {
        boardId: boardId
    }
})