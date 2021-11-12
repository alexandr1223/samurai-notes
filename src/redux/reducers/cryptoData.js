const initialState = {
    data: [
    ]
}

const cryptoData = (state = initialState, action) => {

    switch(action.type) {
        case 'CRYPTO_DATA': {
            return {
                ...state,
                data: action.payload.data
            }
        }
        default:
            return state
    }
}

export default cryptoData;