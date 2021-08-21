import React from 'react'
import {useSelector} from 'react-redux'

function Board() {
    const boardItem = useSelector(({boards}) => boards.boardItem)
    const currentIndex = useSelector(({current}) => current)
    console.log(boardItem);
    console.log(currentIndex)
    
    return (
        <div className="board">
            <h1 className="board__title">
                {
                    boardItem.map((item,index) => (
                        item.title
                    ))
                }
            </h1>
        </div>
    )
}

export default Board;
