import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import CreateNewList from './CreateNewList';
import { cardDelete, listDelete, changeListTitle, createCard, openCardCreation } from '../../redux/action/createBoard';
import deleteBtn from '../../assets/img/delete-btn.svg'

function Board() {
    const dispatch = useDispatch();
    
    const boardItem = useSelector(({boards}) => boards.boardItem);
    const currentBoardIndex = useSelector(({currentBoard}) => currentBoard.current);
    const [cardCreationValue, setCardCreationValue] = useState('');
    
    const currentBoard = boardItem[currentBoardIndex];

    const listTitleChange = (value, listIndex) => {
        dispatch(changeListTitle(value, listIndex, boardItem[currentBoardIndex].id))
    }

    const createCardOpen = (value, listIndex, currentBoardIndex) => {
        dispatch(openCardCreation(value, listIndex, currentBoardIndex))
        setCardCreationValue('')
    }

    const cardCreationValueFunc = (evt) => {
        setCardCreationValue(evt.target.value)
    }

    const createCardSender = (listId, currentBoardIndex) => {
        if (cardCreationValue.length > 0) {
            dispatch(createCard(cardCreationValue, listId, currentBoardIndex));
            dispatch(openCardCreation(false, listId, currentBoardIndex));
            setCardCreationValue('')
        }         
    }
    
    const cardDeleteSender = (boardId, listId, cardId) => {
        dispatch(cardDelete(boardId, listId, cardId));
    }

    const listDeleteSender = (boardId, listId) => {
        dispatch(listDelete(boardId, listId));
    }

    return (
        <div className="board">
            <h1 className="board__title">
                {currentBoard.title}
            </h1>
            <h2 className="board__subtitle">
                Нажмите на <span>Новый список</span> чтобы создать новый список
            </h2>
            <h2 className="board__subtitle">
                Нажмите на <span>+</span> чтобы создать новую заметку
            </h2>
            <div className="board-list">
                {
                    currentBoard.list.map((item, listIndex) => (
                        <div className="board-list__item" key={listIndex}>             
                            <input type="text" className="board-list__title" value={item.listTitle} onChange={(e) => {listTitleChange(e.target.value, listIndex)}}  />
                            <div className="board-list__delete-list" onClick={() => listDeleteSender(currentBoardIndex, listIndex)}>
                                <img src={deleteBtn} alt="" />
                            </div>           
                            {
                                item.listItem.map((card, cardIndex) => (
                                    <div className="board-list__card" key={cardIndex}>
                                        {card.cardName}
                                        <div className="board-list__delete-card" onClick={() => cardDeleteSender(currentBoardIndex, listIndex, cardIndex)}>
                                            <img src={deleteBtn} alt="" />
                                        </div>
                                    </div>
                                ))
                            }
                            <div className={item.openCardCreation === true ? 'board-list__cardCreate board-list__cardCreate--active' : 'board-list__cardCreate'}>
                                <input type="text" className="board-list__input" value={cardCreationValue} onChange={evt => cardCreationValueFunc(evt)} />
                                <div className="board-list__cardBtn" onClick={() => createCardSender(listIndex, currentBoardIndex)}>
                                    Создать
                                </div>
                            </div>
                            <div className="board-list__createCard" onClick={() => {createCardOpen(true, listIndex, currentBoardIndex)}}>
                                +
                            </div>
                        </div>
                    ))
                }
                <CreateNewList />
                <div className="board-list__back">
                    <Link to="/Notes">Назад к заметкам</Link>
                </div>
            </div>
        </div>
    )
}

export default Board;
