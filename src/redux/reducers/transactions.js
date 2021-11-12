const initialState = {
    transactionList: []
}

const transactions = (state = initialState, action) => {
   
    switch(action.type) {
        case 'ADD_TRANSACTION': {
            return {
                ...state,
                transactionList: [...state.transactionList, action.payload.new]
            }
        }
        default:
            return state;
    }
}

export default transactions;