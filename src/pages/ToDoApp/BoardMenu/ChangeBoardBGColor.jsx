import React, {useState, useEffect} from 'react';
import { changeBoardBG } from '../../../redux/action/createBoard';
import { useDispatch, useSelector } from 'react-redux';

export default function ChangeBoardBGColor() {

    const dispatch = useDispatch()

    const currentBoardIndex = useSelector(({currentBoard}) => currentBoard.current);
    const [gradients, setGradients] = useState('');

    useEffect(() => {
        let url = "http://uigradients.com/gradients.json"
        fetch(url)
            .then(function(data) {
                return data.json();
            })
            .then(function(data){
                setGradients(data)
            })
    }, []);
    
    const newBoardColor = (currentBoardIndex, color) => {
        dispatch(changeBoardBG(currentBoardIndex, '', '', color))
    }

    console.log(gradients)

    return (
        <div className="board-color">
            <div className="board-color__block">
                <div className="board-color__search">
                    <span>Поиск фото</span>
                    {/* <input type="text" onChange={(e) => changeSearchText(e.target.value)} /> */}
                </div>
                <div className="board-color__list">
                    <div className="board-color__item" onClick={() => newBoardColor(currentBoardIndex, '#F2F2F2')} style={{background:'#F2F2F2'}}></div>
                    <div className="board-color__item" onClick={() => newBoardColor(currentBoardIndex, 'rgb(137, 96, 158)')} style={{background:'rgb(137, 96, 158)'}}></div>
                    <div className="board-color__item" onClick={() => newBoardColor(currentBoardIndex, 'rgb(0, 174, 204)')} style={{background:'rgb(0, 174, 204)'}}></div>
                    <div className="board-color__item" onClick={() => newBoardColor(currentBoardIndex, 'rgb(205, 90, 145)')} style={{background:'rgb(205, 90, 145)'}}></div>
                    <div className="board-color__item" onClick={() => newBoardColor(currentBoardIndex, 'rgb(176, 70, 50)')} style={{background:'rgb(176, 70, 50)'}}></div>
                    <div className="board-color__item" onClick={() => newBoardColor(currentBoardIndex, 'rgb(81, 152, 57)')} style={{background:'rgb(81, 152, 57)'}}></div>
                    <div className="board-color__item" onClick={() => newBoardColor(currentBoardIndex, 'rgb(210, 144, 52)')} style={{background:'rgb(210, 144, 52)'}}></div>
                    <div className="board-color__item" onClick={() => newBoardColor(currentBoardIndex, 'rgb(131, 140, 145)')} style={{background:'rgb(131, 140, 145)'}}></div>
                    { gradients ?
                        gradients.map((item, index) => (
                            item.colors.length === 3 ?
                            <div className="board-color__item" style={{background: `linear-gradient(to right, ${item.colors[0]}, ${item.colors[1]}, ${item.colors[2]})`}} key={index} 
                            onClick={() => newBoardColor(currentBoardIndex, item.colors)}></div>
                            :
                            <div className="board-color__item" style={{background: `linear-gradient(to right, ${item.colors[0]}, ${item.colors[1]})`}} key={index} 
                            onClick={() => newBoardColor(currentBoardIndex, item.colors)}></div>
                        ))
                        : ''
                    }
                    
                </div>
            </div>
        </div>
    )
}
