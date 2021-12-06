import { combineReducers } from "redux";
import boards from './createBoard';
import updateBoard from './updateBoard';
import createList from "./createList";
import cryptoPortfolio from "./cryptoPortfolio";
import cryptoData from "./cryptoData";
import changeSidebarCoin from "./changeCoinOnSidebar";
import transactions from "./transactions";

const rootReducer = combineReducers({
    boards: boards,
    updateBoard: updateBoard,
    createList: createList,
    crypto: cryptoPortfolio,
    cryptoData: cryptoData,
    changeSidebarCoin: changeSidebarCoin,
    transactions: transactions
});

export default rootReducer;