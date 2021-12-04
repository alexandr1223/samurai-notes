import React, {useEffect, useState} from 'react'
import { useDispatch} from 'react-redux';
import { addCrypto } from '../../../../redux/action/cryptoPortfolio';
import { useSelector } from 'react-redux';
import {setNewLine, addNewCoinTransaction, sellCoinInfo} from '../../../../redux/action/changeCoinOnSidebar';
import {AiFillCalculator} from "react-icons/ai";
import { addTransaction } from '../../../../redux/action/transactions';
import Calc from '../Calc/Calc';

export default function Transaction({searchPanelStatus, id}) {

    const dispatch = useDispatch();
    const coins = useSelector(({cryptoData}) => cryptoData.data);
    const sidebarCoin = useSelector(({changeSidebarCoin}) => changeSidebarCoin);

    
    const [buyCount, setBuyCount] = useState(0);
    const [sellCount, setSellCount] = useState(0);

    // Установка кастомной цены покупки
    const [showCustomPriceInput, setShowCustomPriceInput] = useState(false);
    const [customBuyPrice, setCustomBuyPrice] = useState('');

    // Отображение калькулятора
    const [calcVisibility, setCalcVisibility] = useState(false);
    const changeCalcVisibility = () => {
        setCalcVisibility(!calcVisibility);
    }

    useEffect(() => {
        console.count('render1')
    }, [])

    const addCryptoToPortfolio = (id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol) => {
        id = id.replace(/\s/g, '');
        let transactionType = 'buy';
        dispatch(addCrypto(id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol));
        dispatch(addTransaction(id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol, transactionType))
    }

    // Получение текущей суммы покупки
    const changeCoinAddCount = (value) => {
        if (!isNaN(value)) {
            setBuyCount(parseInt(value))
            
            const addCoin = coins.find(coin => coin.name === sidebarCoin.buyTopCoin)
            if (addCoin === undefined) {
                let btcCoin = coins.find(coin => coin.name === 'Bitcoin')
                dispatch(addNewCoinTransaction(btcCoin))
                setSellCount((value * btcCoin.current_price).toFixed(5))
            } else {
                dispatch(addNewCoinTransaction(addCoin))
                setSellCount((value * addCoin.current_price).toFixed(5))
            }
        }
    }

    // Подсчет суммы в $ по текущему курсу монеты
    const changeCoinSellCount = (value) => {
        if (!isNaN(value)) {
            setSellCount(parseInt(value))
            const addCoin = coins.find(coin => coin.name === sidebarCoin.buyTopCoin)
            if (addCoin === undefined) {
                let btcCoin = coins.find(coin => coin.name === 'Bitcoin')
                dispatch(sellCoinInfo(btcCoin))
                setBuyCount((value / btcCoin.current_price ).toFixed(5))
            } else {
                dispatch(sellCoinInfo(addCoin))
                setBuyCount((value / addCoin.current_price).toFixed(5))
            }
        } else {
            console.log('nan')
        }
    }

    const setLineBuy = () => {
        dispatch(setNewLine(0))
        searchPanelStatus();
    }

    // Пока отключена возможность выбора монеты за которую мы продаем
    // const setLineSell = () => {
    //     dispatch(setNewLine(1))
    //     searchPanelStatus();
    // }

    // Поиск монеты которую покупаем
    const findBuy = () => {
        if (sidebarCoin.buyTopCoin === 'Bitcoin') {
            return (
                coins.find(coin => coin.name === 'Bitcoin')
            )
        } else {
            return (
                coins.find(coin => coin.name === sidebarCoin.buyTopCoin)
            )
        }
    }

    const openCustomPriceField = () => {
        setShowCustomPriceInput(!showCustomPriceInput)
    }

    const changeCustomBuyPrice = (value) => {
        setCustomBuyPrice(value)
    }
    
    // Поиск монеты которую продаем
    const findSell = () => {
        if (sidebarCoin.buyBottomCoin === 'Tether') {
            return (
                coins.find(coin => coin.name === 'Tether')
            )
        } else {
            return (
                coins.find(coin => coin.name === sidebarCoin.buyBottomCoin)
            )
        }        
    }

    return (
        <div className="tabcontent__item">
            <Calc calcVisibilityProperty={calcVisibility} setCalcVisibilityProperty={setCalcVisibility} />
            <div className={!calcVisibility ? "transaction" : "transaction transaction_hide"} key={id}>
                <div className="transaction__title">
                    Купить криптовалюту
                </div>
                
                <div className="transaction__block">

                    <label htmlFor="quantity" className="transaction__label">Купить <AiFillCalculator onClick={changeCalcVisibility}  className="coin__add" /></label>
                    <div className="transaction__row transaction__buy-line">
                        <input id="quantity" type="text" className="transaction__input" placeholder="0.00" value={buyCount} onChange={e => changeCoinAddCount(e.target.value)} />
                        <div className="transaction__coin" onClick={setLineBuy}>
                            <img src={findBuy() ? findBuy().image : ''} alt="" className="transaction__image" />
                            <div className="transaction__name">
                                {findBuy() ? findBuy().symbol.toUpperCase() : ''}
                            </div>
                        </div>
                    </div>

                    <label htmlFor="quantity" className="transaction__label">Продать</label>
                    <div className={showCustomPriceInput ? "transaction__row transaction__row_custom" : "transaction__row"}>
                        <input id="price" type="text" className="transaction__input" value={sellCount} onChange={e => changeCoinSellCount(e.target.value)} placeholder="0.00" />
                        <div className="transaction__coin">
                            <img src={findSell() ? findSell().image : ''} alt="" className="transaction__image" />
                            <div className="transaction__name">
                                {findSell() ? findSell().symbol.toUpperCase() : ''}
                            </div>
                        </div>
                    </div>

                    <div className={!showCustomPriceInput ? "transaction__row transaction__row_custom" : "transaction__row"}>
                        <input id="price" type="text" className="transaction__input" value={customBuyPrice} onChange={e => changeCustomBuyPrice(e.target.value)} placeholder="0.00" />
                        <div className="transaction__coin">
                            <img src={findSell() ? findSell().image : ''} alt="" className="transaction__image" />
                            <div className="transaction__name">
                                {findSell() ? findSell().symbol.toUpperCase() : ''}
                            </div>
                        </div>
                    </div> 
                    
                    <div className="transaction__price">
                        <label htmlFor="quantity" className="transaction__label">Цена</label>
                        <div className="transaction__priceValue">
                            {showCustomPriceInput ? customBuyPrice : (findBuy() ? findBuy().current_price : '')} <span>{findSell() ? findSell().symbol.toUpperCase() : ''}</span> за 1 <span>{findBuy() ? findBuy().symbol.toUpperCase() : ''}</span>
                        </div>
                    </div>

                    

                    <div className="transaction__switch">
                        <label htmlFor="check" className="transaction__switch-label">Своя цена</label>
                        <label className="transaction__switch-block">
                            <input type="checkbox" checked={showCustomPriceInput} onChange={openCustomPriceField}/>
                            <span className="transaction__slider round"></span>
                        </label>
                    </div>

                    <button className="transaction__add" onClick={() => {addCryptoToPortfolio(findBuy().name, sidebarCoin.buyTopCoin, findBuy().image, !showCustomPriceInput ? findBuy().current_price : customBuyPrice, findBuy().current_price, findBuy().price_change_percentage_24h, buyCount, findBuy().current_price, findBuy().symbol)}}>
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    )
}
