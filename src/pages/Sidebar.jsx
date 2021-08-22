import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { currentBoard } from '../redux/action/currentBoard';

function Sidebar({createElement}) {

    const dispatch = useDispatch();
    const board = useSelector(({boards}) => boards.boardItem)
    const [openCreateBlock, setOpenCreateBlock] = useState(false);

    const openBlock = (value) => {
        setOpenCreateBlock(value);
    }

    const createBoard = (element) => {
        let id = 0;
        board.map((item, index) => {
            id = index+1;
        })
        createElement(element, id);
        document.querySelector('.create-board__input').value = '';
        setOpenCreateBlock(false);
    }

    const openBoard = (index) => {
        dispatch(currentBoard(index));
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <ul className="sidebarMenu">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>
                <div className="sidebar-board-list">
                    {
                        board.map((item, index) => (
                            <Link to={`/board/${item.id}`} className="sidebar-board-item" onClick={() => {openBoard(index)}} key={index}>
                                {item.title}
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className="create-board" className={openCreateBlock === true ? 'create-board__active' : 'create-board'}>
                <label className="create-board__label">
                    Имя доски
                </label>
                <input type="text" className="create-board__input" />
                <div className="create-board__btn" onClick={() => createBoard(document.querySelector('.create-board__input').value)}>
                    Create
                </div>
            </div>
            <div className="createBoard" onClick={() => openBlock(true)}>
                Create Board
            </div>
        </div>
    )
}

export default Sidebar;
