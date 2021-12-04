import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { MdClose } from "react-icons/md";
import BoardMenuTabs from './BoardMenuTabs'
import './BoardMenu.sass'

export default function BoardMenu({boardMenuStatus, setBoardMenuStatus}) {

    const [openBackgroundChange, setOpenBackgroundChange] = useState(false);

    const boardItem = useSelector(({boards}) => boards.boardItem);
    const currentBoardIndex = useSelector(({currentBoard}) => currentBoard.current);
    const currentBoard = boardItem[currentBoardIndex];

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

                {/* <div className="change-style" onClick={changeBackgroundOpen}>
                    {
                        currentBoard.boardImage[0].small === '' 
                        ? <div className="change-style__image change-style__image_square"></div>
                        : <img src={currentBoard.boardImage[0].small} alt="" className={"change-style__image"} />
                    }
                    <span>Сменить цвет карточек</span>
                </div> */}
            </div>
            
            <BoardMenuTabs backgroundChange={openBackgroundChange} setOpenBackgroundChange={setOpenBackgroundChange} />
        </div>
    )
}
