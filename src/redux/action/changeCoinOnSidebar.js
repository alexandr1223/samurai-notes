export const buyTopCoin = (coin) => ({
    type: 'BUY_TOP_COIN',
    payload: {
        coin: coin
    }
})

export const buyBottomCoin = (coin) => ({
    type: 'BUY_BOTTOM_COIN',
    payload: {
        coin: coin
    }
})

export const setNewLine = (line) => ({
    type: 'SET_LINE',
    payload: {
        line: line
    }
})

export const addNewCoinTransaction = (coin) => ({
    type: 'ADD_COIN',
    payload: {
        coin: coin
    }
})

export const sellCoinInfo = (coin) => ({
    type: 'SELL_COIN_INFO',
    payload: {
        coin: coin
    }
})