import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from "react-router-dom";
import { changeBoardBG } from '../../../redux/action/createBoard';

export default function ChangeBoardBGImage() {
    
    const slug = useParams();

    const [backgrounds, setBackgrounds] = useState('');
    const [backgroundSearch, setBackgroundSearch] = useState('abstract')
    const dispatch = useDispatch();

    useEffect(() => {
        let clientId = 'wCcT1rchu94wC7v-SOkXYFVHZesXcYqvJGEjG8oQjcM';
        let url = 
        "https://api.unsplash.com/search/photos/?client_id=" +
        clientId + 
        `&query=${backgroundSearch}` +
        "&per_page=20";
        fetch(url)
            .then(function(data) {
                return data.json();
            })
            .then(function(data){
                setBackgrounds(data)
            })
    }, [backgroundSearch]);

    const newBoardImage = (slug, regualarImage, smallImage) => {
        dispatch(changeBoardBG(slug, regualarImage, smallImage, ''))
    }

    const changeSearchText = (text) => {
        setBackgroundSearch(text)
    }

    return (
        <div className="background">
            <div className="background__block">
                <div className="background__search">
                    <span>Поиск фото</span>
                    <input type="text" onChange={(e) => changeSearchText(e.target.value)} />
                </div>
                <div className="background__list">
                    { backgrounds.results ?
                        backgrounds.results.map((item, index) => (
                            <div className="background__item" key={index} onClick={(e) => newBoardImage(slug, item.urls.regular, item.urls.small )}>
                                <img src={item.urls.small} alt="" />
                            </div>
                        ))
                        : ''
                    }
                    
                </div>
            </div>
        </div>
    )
}
