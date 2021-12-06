import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import {useParams} from "react-router-dom";
import { MdClose } from "react-icons/md";
import BoardMenuTabs from './BoardMenuTabs'
import './BoardMenu.sass'

export default function BoardMenu({boardMenuStatus, setBoardMenuStatus}) {

    const [openBackgroundChange, setOpenBackgroundChange] = useState(false);

    const slug = useParams();
    const boardItem = useSelector(({boards}) => boards.boardItem);
    let currentBoard = '';
    boardItem.map(item => {
        if (item.id == Number(slug.id)) {
            return currentBoard = item
        }
        return currentBoard;
    })

    const changeBackgroundOpen = () => {
        setOpenBackgroundChange(!openBackgroundChange);
    }
    
    const closeBoardMenu = () => {
        setBoardMenuStatus(!boardMenuStatus);
    }
    return (
        <div className={boardMenuStatus ? "board-menu board-menu_open" : "board-menu"}>
            <div className="board-menu__block">
                <MdClose className="board-menu__close" onClick={closeBoardMenu} />
                <h2 className="board-menu__title">
                    Меню
                </h2>
                <div className="change-bg" onClick={changeBackgroundOpen}>
                    {
                        currentBoard.boardImage[0].small === '' 
                        ? <div className="change-bg__image change-bg__image_square"></div>
                        : <img src={currentBoard.boardImage[0].small} alt="" className={"change-bg__image"} />
                    }
                    <span>Сменить фон стола</span>
                </div>
            </div>
            
            <BoardMenuTabs backgroundChange={openBackgroundChange} setOpenBackgroundChange={setOpenBackgroundChange} />
        </div>
    )
}
