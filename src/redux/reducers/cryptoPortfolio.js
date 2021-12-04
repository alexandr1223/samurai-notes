const initialState = {
    portfolio: [
    ]
}

const cryptoPortfolio = (state = initialState, action) => {
   
    switch(action.type) {
        case 'ADD_CRYPTO': {
            let equal = false;
            state.portfolio.some((item) => {
                if (item.id === action.payload.new.id) {
                    return (
                        equal = true
                    )
                } else {
                    return (
                        equal = false
                    )
                }
            })
            if (state.portfolio.length !== 0 && equal === true) {
                return {
                    ...state,
                    portfolio: state.portfolio.map((item) => {
                        if (item.id === action.payload.new.id) {
                            const newCount = item.coinCount + action.payload.new.coinCount;
                            const newValue = (item.coinValue + parseInt(action.payload.new.coinValue)) / 2; 
                            const newBuyPrice = (item.buyPrice + parseInt(action.payload.new.buyPrice)) / 2; 
                            return {
                                ...item,
                                coinCount: newCount,
                                coinValue: newValue,
                                buyPrice: newBuyPrice
                            }
                        } 
                        return item;
                    })
                }
            } else if (state.portfolio.length === 0 || equal === false) {
                return {
                    ...state,
                    portfolio: [...state.portfolio, action.payload.new]
                }
            }
        }
        break;
        case 'SELL_CRYPTO': {
            let deleteIndex = -1;
            state.portfolio.map((item, index) => {
                if (item.id === action.payload.id) {
                    return (
                        deleteIndex = index
                    ) 
                } 
                return deleteIndex
            })
            return {
                ...state,
                portfolio: state.portfolio.map((item, index) => {
                    console.log(deleteIndex)
                    if (index === deleteIndex) {
                        console.log(item)
                        const newCount = item.coinCount - action.payload.coinCount;
                        return {
                            ...item,
                            coinCount: newCount,
                        }
                    }
                    return item
                })
                // portfolio: [...state.portfolio.slice(0, deleteIndex), ...state.portfolio.slice(deleteIndex + 1)]
            }
        }
        case 'UPDATE_CURRENCIES': {
            return {
                ...state,
                portfolio: state.portfolio.map((item) => {
                    let newPrice = {};
                    
                    action.payload.data.map((coin) => {
                        if (item.buyName === coin.name) {
                            return newPrice = coin;
                        }
                        return coin;
                    })
                    
                    if (newPrice.name === item.buyName) {
                        return {
                            ...item,
                            currentPrice: newPrice.price
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

export default cryptoPortfolio;