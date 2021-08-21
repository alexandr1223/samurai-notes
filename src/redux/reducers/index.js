import { combineReducers } from "redux";
import boards from './createBoard'
import updateBoard from './updateBoard'
import currentBoard from './currentBoard'

const rootReducer = combineReducers({
    boards: boards,
    updateBoard: updateBoard,
    currentBoard: currentBoard
});

export default rootReducer;