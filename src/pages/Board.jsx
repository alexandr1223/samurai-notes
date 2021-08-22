import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router';
import { createList } from '../redux/action/createBoard';

function Board() {
    let {id} = useParams();
    console.log(id)
    const dispatch = useDispatch();
    const boardItem = useSelector(({boards}) => boards.boardItem)
    const currentIndex = useSelector(({currentBoard}) => currentBoard.current)
    
    const currentItem = boardItem[currentIndex];

    const listCreateon = (value) => {
        console.log()
        dispatch(createList(value, boardItem[currentIndex].id))
        // setOpenCreateList(false);        
    }


    console.log(currentItem.list);
    return (
        <div className="board">
            <h1 className="board__title">
                {
                    currentItem.title
                }
            </h1>
            <h2 className="board__subtitle">
                Click <span>+ New list</span> to create new list.
            </h2>
            <div className="board-list">
                {
                    currentItem.list.map((item, index) => (
                        <div className="board-list__item" key={index}>
                            <input type="text" className="board-list__title" value={item.listTitle} onChange={(e) => {listCreateon(e.target.value)}}  />
                            <div className="board-list__createCard">
                                +
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* <div>
                <label className="create-item__label">
                    Текст карточки
                </label>
                <input type="text" className="create-item__input" />
                <div className="create-item__btn" onClick={() => listCreateon(document.querySelector('.create-item__input').value, 0)}>
                    Create
                </div>
                
            </div> */}
        </div>
    )
}

export default Board;
