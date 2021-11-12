import React from 'react';
import {IoIosAddCircle} from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import {buyTopCoin, buyBottomCoin} from '../../../redux/action/changeCoinOnSidebar';
import './search.sass';

export default function Coin({panelStatusFromCoin, name, image, symbol, currentPrice, marketCap, priceChange}) {

    const dispatch = useDispatch();
    const currentLine = useSelector(({changeSidebarCoin}) => changeSidebarCoin.currentLine)

    const changeCoinOnSidebar = (name) => {
        panelStatusFromCoin(false)
        if (currentLine === 0) {
            dispatch(buyTopCoin(name))
        } else if (currentLine === 1) {
            dispatch(buyBottomCoin(name))
        }
    }

    return (
        <div className="coin" onClick={() => {changeCoinOnSidebar(name)}}>
            <img className="coin__image" src={image} alt="" />
            <span className="coin__name">
                {name}
            </span>
            <p className="coin__symbol">
                {symbol}
            </p>
            <p className="coin__price">
                ${currentPrice.toLocaleString()}
            </p>
            <p className={priceChange > 0 ? "coin__change-percent coin__change-percent_green" : "coin__change-percent coin__change-percent_red"}>
                {priceChange.toFixed(2)}%
            </p>                
            <p className="coin__market-cap">
                Cap: ${marketCap.toLocaleString()}
            </p>
            <IoIosAddCircle className="coin__add" onClick={() => {changeCoinOnSidebar(name)}} />
            
        </div>
    )
}
