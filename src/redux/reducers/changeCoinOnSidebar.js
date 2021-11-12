const initialState = {
    buyTopCoin: 'Bitcoin',
    buyBottomCoin: 'Tether',
    currentLine: [],
    addedCoin: [],
    sellCoinInfo: []
}

const changeSidebarCoin = (state = initialState, action) => {

    switch(action.type) {
        case 'BUY_TOP_COIN': {
            return {
                ...state,
                buyTopCoin: action.payload.coin
            }
        }
        case 'BUY_BOTTOM_COIN': {
            return {
                ...state,
                buyBottomCoin: action.payload.coin
            }
        }
        case 'SET_LINE': {
            return {
                ...state,
                currentLine: action.payload.line
            }
        }
        case 'ADD_COIN': {
            return {
                ...state,
                addedCoin: action.payload.coin
            }
        }
        case 'SELL_COIN_INFO': {
            return {
                ...state,
                sellCoinInfo: action.payload.coin
            }
        }
        default:
            return state
    }
}

export default changeSidebarCoin;