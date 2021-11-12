import { combineReducers } from "redux";
import boards from './createBoard'
import updateBoard from './updateBoard'
import currentBoard from './currentBoard'
import createList from "./createList";
import cryptoPortfolio from "./cryptoPortfolio";
import cryptoData from "./cryptoData"
import changeSidebarCoin from "./changeCoinOnSidebar";
import transactions from "./transactions";

const rootReducer = combineReducers({
    boards: boards,
    updateBoard: updateBoard,
    currentBoard: currentBoard,
    createList: createList,
    crypto: cryptoPortfolio,
    cryptoData: cryptoData,
    changeSidebarCoin: changeSidebarCoin,
    transactions: transactions
});

export default rootReducer;