export const addCryptoCurrencies = (data) => ({
    type: 'CRYPTO_DATA',
    payload: {
        data: data
    }
})