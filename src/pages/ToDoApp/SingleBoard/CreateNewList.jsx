import React, {useState} from "react"
import { useSelector,useDispatch} from 'react-redux';
import {useParams} from "react-router-dom";
import { createList } from '../../../redux/action/createBoard';
import './board.sass'


function CreateNewList() {
    const dispatch = useDispatch();
    const slug = useParams();
    const boardItem = useSelector(({boards}) => boards.boardItem);
    const [listTitle, setListTitle] = useState('');
    const [listCreationBlock, setListCreationBlock] = useState(false);

    const listCreationValueFunc = (evt) => {
        setListTitle(evt.target.value)
    }
    
    // Открытие формы с созданием нового списка
    const openListCreation = () => {
        setListCreationBlock(true)
    }
    
    // Определение текущей доски
    const currentBoard = boardItem.map(item => {
        if (item.id == slug.id) {
            return item
        }
    })
    
    const createNewList = () => {
        dispatch(createList(listTitle,  currentBoard[0].id));
        setListTitle('');
        setListCreationBlock(false);
    }

    return (
        <div className="board-list__createList">
            <span onClick={() => {openListCreation()}}>Новый список</span>
            <div className={listCreationBlock === true ? "create-list create-list--active" : "create-list"}>
                <input type="text" className="board-list__input" value={listTitle} onChange={evt => listCreationValueFunc(evt)}  />
                <button className="board-list__cardBtn" onClick={() => createNewList()}>
                    Создать
                </button>
            </div>
        </div>
    )
    
}
export default CreateNewList;