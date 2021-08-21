export const createBoard = (boardItem, index) => ({
    type: 'CREATE_BOARD',
    payload: {
        new: {
            id: index,
            title: boardItem,
            list: {
                listItem: [
                    {
                        listTitle: '',
                        card: ''
                    }
                ],
            }
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