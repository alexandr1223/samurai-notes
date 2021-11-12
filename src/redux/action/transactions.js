export const addTransaction = (id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol, transactionType) => ({
    type: 'ADD_TRANSACTION',
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
            symbol: symbol,
            transactionType: transactionType
        }
    }
})