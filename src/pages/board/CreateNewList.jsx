import React, {useState} from "react"
import { useSelector,useDispatch} from 'react-redux';
import { createList } from '../../redux/action/createBoard';


function CreateNewList() {
    const dispatch = useDispatch();

    const boardItem = useSelector(({boards}) => boards.boardItem);
    const currentBoardIndex = useSelector(({currentBoard}) => currentBoard.current);
    const [listCreationValue, setListCreationValue] = useState('');
    const [listCreationBlock, setListCreationBlock] = useState(false);

    const listCreationValueFunc = (evt) => {
        setListCreationValue(evt.target.value)
    }
    
    const openListCreation = () => {
        setListCreationBlock(true)
    }
    
    const createNewList = () => {
        dispatch(createList(listCreationValue,  boardItem[currentBoardIndex].id));
        setListCreationValue('');
        setListCreationBlock(false);
    }

    return (
        <div className="board-list__createList">
            <span onClick={() => {openListCreation()}}>Новый список</span>
            <div className={listCreationBlock === true ? "create-list create-list--active" : "create-list"}>
                <input type="text" className="create-list__input" value={listCreationValue} onChange={evt => listCreationValueFunc(evt)}  />
                <button className="create-list__btn" onClick={() => createNewList()}>
                    Создать
                </button>
            </div>
        </div>
    )
    
}
export default CreateNewList;