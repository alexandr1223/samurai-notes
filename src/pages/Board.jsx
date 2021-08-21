import React from 'react'
import {useSelector} from 'react-redux'

function Board() {
    const boardItem = useSelector(({boards}) => boards.boardItem)
    const currentIndex = useSelector(({currentBoard}) => currentBoard.current)
    
    const currentItem = boardItem[currentIndex];
    
    return (
        <div className="board">
            <h1 className="board__title">
                {
                    currentItem.title
                }
            </h1>
        </div>
    )
}

export default Board;
