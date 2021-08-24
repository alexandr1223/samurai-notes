export const createBoard = (boardItem, index) => ({
    type: 'CREATE_BOARD',
    payload: {
        new: {
            id: index,
            title: boardItem,
            list: [
                {
                    listTitle: '',
                    listItem: [
                        {
                            cardName: ''
                        }
                    ],
                },
            ]
        }
    }
})

export const createList = (newListTitle, index) => ({
    type: 'CREATE_LIST',
    payload: {
        id: index,
        listTitle: newListTitle,
    }
})

export const createCard = (cardName, listId, index) => ({
    type: 'CREATE_CARD',
    payload: {
        id: index,
        listId: listId,
        cardName: cardName,
    }
})