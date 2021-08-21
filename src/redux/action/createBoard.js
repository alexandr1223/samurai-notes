export const createBoard = (boardItem) => ({
    type: 'CREATE_BOARD',
    payload: {
        new: {title: boardItem}
    }
})