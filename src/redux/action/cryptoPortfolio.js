export const addCrypto = (id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol) => ({
    type: 'ADD_CRYPTO',
    payload: {
        new: {
            id: id,
            buyName: buyName,
            image: image, 
            buyPrice: buyPrice, 
            currentPrice: currentPrice, 
            priceChange: priceChange,
            coinCount: coinCount,
            coinValue: coinValue,
            symbol: symbol
        }
    }
})

export const sellCrypto = (id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol) => ({
    type: 'SELL_CRYPTO',
    payload: {
        id: id,
        buyName: buyName,
        image: image, 
        buyPrice: buyPrice, 
        currentPrice: currentPrice, 
        priceChange: priceChange,
        coinCount: coinCount,
        coinValue: coinValue,
        symbol: symbol
    }
})

export const updateCurrencies = (data) => ({
    type: 'UPDATE_CURRENCIES',
    payload: {
        data: data,
    }
})