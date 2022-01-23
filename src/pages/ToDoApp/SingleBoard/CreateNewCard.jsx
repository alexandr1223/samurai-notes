import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {createCard, openCardCreation} from '../../../redux/action/createBoard'

export default function CreateNewCard({item, slug, listIndex}) {

    const dispatch = useDispatch();
    const [cardCreationValue, setCardCreationValue] = useState('');

    // Определение текущей нажатой кнопки добавления карточки
    const [currentAddBtn, setCurrentAddBtn] = useState('');

    const createCardOpen = (value, listIndex, slug, elem) => {
        console.log(slug)
        dispatch(openCardCreation(true, listIndex, slug));
        setCardCreationValue('');
        setCurrentAddBtn(elem.target);
        elem.target.style.display = 'none';
    }
    
    const createCardSender = (listId, slug) => {
        if (cardCreationValue.length > 0) {
            dispatch(createCard(cardCreationValue, listId, slug));
            dispatch(openCardCreation(false, listId, slug));
            setCardCreationValue('')
            currentAddBtn.style.display = 'block';
        }         
    }

    const cardCreationValueFunc = (text) => {
        setCardCreationValue(text)
    }

    return (
        <div className="board-list__newCard">
            <div className={item.openCardCreation === true ? 'board-list__cardCreate board-list__cardCreate--active' : 'board-list__cardCreate'}>
                <input type="text" className="board-list__input" value={cardCreationValue} onChange={e => cardCreationValueFunc(e.target.value)} />
                <button className="board-list__cardBtn" onClick={() => createCardSender(listIndex, slug)}>
                    Создать
                </button>
            </div>
            <button className="board-list__addCard" onClick={(e) => {createCardOpen(true, listIndex, slug, e)}}>
                +
            </button>
        </div>
    )
}
