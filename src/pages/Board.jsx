import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { createList } from '../redux/action/createBoard';

function Board() {
    const dispatch = useDispatch();
    const boardItem = useSelector(({boards}) => boards.boardItem)
    const currentIndex = useSelector(({currentBoard}) => currentBoard.current)
    const [openCreateList, setOpenCreateList] = useState(false);
    
    const currentItem = boardItem[currentIndex];

    const openListCreation = () => {
        setOpenCreateList(true)
    }
    
    const listCreateon = (value, index) => {
        console.log()
        dispatch(createList(value, boardItem[currentIndex].id))
        setOpenCreateList(false);
    }

    return (
        <div className="board">
            <h1 className="board__title">
                {
                    currentItem.title
                }
            </h1>
            <h2 className="board__subtitle">
                Click <span>+ New</span> to create new list.
            </h2>
            <div className="board-list">
                <div className="board__create" onClick={() => openListCreation()}>
                    New
                </div>
            </div>
            <div className={openCreateList === true ? 'create-board__active' : 'create-board'}>
                <label className="create-item__label">
                    Текст карточки
                </label>
                <input type="text" className="create-item__input" />
                <div className="create-item__btn" onClick={() => listCreateon(document.querySelector('.create-item__input').value, 0)}>
                    Create
                </div>
                
            </div>
        </div>
    )
}

export default Board;
