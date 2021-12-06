import {React, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { boardDelete } from '../../redux/action/createBoard';
import { Link } from 'react-router-dom';
import deleteBtn from '../../assets/img/delete-btn.svg'
import './notes.sass'

function Notes({createElement}) {

    const dispatch = useDispatch();
    const board = useSelector(({boards}) => boards.boardItem)
    const [openCreateBlock, setOpenCreateBlock] = useState(false);
    const [boardTitle, setBoardTitle] = useState('');
    const [boardError, setBoardError] = useState(false);

    const openBlock = (value) => {
        setOpenCreateBlock(value);
    }

    const changeBoardTitle = (evt) => {
        setBoardTitle(evt.target.value)
    }

    const createBoard = () => {
        let id = board.map((item, index) => {
            console.log(item)
            return item.id;
        })
        if (id.length === 0) {
            id = [-1]
        }
        if (boardTitle.length > 0) {
            createElement(boardTitle, id.pop() + 1);
            setBoardTitle('');
            setBoardError(false);
            setOpenCreateBlock(false);
        } else {
            setBoardError(true);
        }
        
    }

    const boardDeleteSender = (boardId) => {
        dispatch(boardDelete(boardId));
    }
    
    return (
        <div className="notes">
            <h1 className="notes__title">
                Заметки
            </h1>
            <div className="notes__list">
                {
                    board.map((item, index) => (
                        <Link className="notes__item" key={index} to={`/notes/board/${item.id}`} >
                            {
                                item.boardImage[0].small ?
                                <img src={item.boardImage[0].small} alt="" /> :
                                ''
                            }
                            <div className={item.boardImage[0].small ? "notes__itemTitle notes__itemTitle_back" : "notes__itemTitle" }>
                                {item.title}  
                            </div> 
                            <div className="notes__delete-board" onClick={() => boardDeleteSender(index)}>
                                <img src={deleteBtn} alt="" />
                            </div> 
                        </Link>
                    ))
                }
                <div className="createBoard__button" onClick={() => openBlock(true)}>
                    Создать доску
                </div>
            </div>

            <div className={openCreateBlock === true ? 'create-board__active' : 'create-board'}>
                <label className="create-board__label">
                    Название доски
                </label>
                <div className={boardError === true ? "create-board__error create-board__error--active" : "create-board__error"}>
                    Поле не может быть пустым
                </div>
                <input type="text" className="create-board__input" value={boardTitle} onChange={evt => changeBoardTitle(evt)} />
                <div className="create-board__btn" onClick={() => createBoard()}>
                    Создать
                </div>
            </div>
        
        </div>
    )
}

export default Notes