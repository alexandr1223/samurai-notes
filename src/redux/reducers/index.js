import { combineReducers } from "redux";
import boards from './createBoard'
import updateBoard from './updateBoard'
import currentBoard from './currentBoard'
import createList from "./createList";

const rootReducer = combineReducers({
    boards: boards,
    updateBoard: updateBoard,
    currentBoard: currentBoard,
    createList: createList
});

export default rootReducer;