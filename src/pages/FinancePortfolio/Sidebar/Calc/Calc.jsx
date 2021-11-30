import React, {useState} from 'react'
import { useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { addNewCoinTransaction, sellCoinInfo } from '../../../../redux/action/changeCoinOnSidebar';
import { IoMdCloseCircleOutline } from "react-icons/io";
import './calc.sass';

export default function Calc({searchPanelStatus, calcVisibilityProperty, setCalcVisibilityProperty}) {

    const dispatch = useDispatch();
    const coins = useSelector(({cryptoData}) => cryptoData.data);
    const sidebarCoin = useSelector(({changeSidebarCoin}) => changeSidebarCoin);

    
    const [buyCount, setBuyCount] = useState(0);
    const [sellCount, setSellCount] = useState(0);
    const [sellPrice, setSellPrice] = useState('');

    // Установка кастомной цены покупки
    const [showCustomPriceInput, setShowCustomPriceInput] = useState(false);
    const [customBuyPrice, setCustomBuyPrice] = useState('');

    // Результат калькулятора
    const [calcProfit, setCalcProfit] = useState('');

    // Закрытие калькулятора
    const changeCalcVisibility = () => {
        setCalcVisibilityProperty(!calcVisibilityProperty);
    }

    const calcResult = (buyCoin, buyPrice, sellPrice) => {
        let buySum = buyCoin * buyPrice;
        let sellSum = buyCoin * sellPrice;
        let profit = sellSum - buySum;
        console.log(profit)
        if (!isNaN(profit)) {
            setCalcProfit(profit);
        } else {
            return '';
        }
       
    }

    // Получение текущей суммы покупки
    const changeCoinAddCount = (value) => {
        if (!isNaN(value)) {
            setBuyCount(parseInt(value))
            
            const addCoin = coins.find(coin => coin.name === sidebarCoin.buyTopCoin)
            if (addCoin === undefined) {
                let btcCoin = coins.find(coin => coin.name === 'Bitcoin')
                dispatch(addNewCoinTransaction(btcCoin))
                setSellCount((value * btcCoin.current_price).toFixed(1))
            } else {
                dispatch(addNewCoinTransaction(addCoin))
                setSellCount((value * addCoin.current_price).toFixed(1))
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
                setBuyCount((value / btcCoin.current_price ).toFixed(1))
            } else {
                dispatch(sellCoinInfo(addCoin))
                setBuyCount((value / addCoin.current_price).toFixed(1))
            }
        } else {
            console.log('nan')
        }
    }

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

    // Изменение цены покупки
    const openCustomPriceField = () => {
        setShowCustomPriceInput(!showCustomPriceInput)
    }

    const changeCustomBuyPrice = (value) => {
        setCustomBuyPrice(value)
    }

    // Изменение цены продажи
    const changeSellPrice = (value) => {
        setSellPrice(value)
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
        <div className={calcVisibilityProperty ? "calc calc_show" : 'calc'}>
            <div className="transaction__block">

                <label htmlFor="quantity" className="transaction__label">Количество покупаемых монет <IoMdCloseCircleOutline className="calc__close" onClick={changeCalcVisibility} /></label>
                <div className="transaction__row transaction__buy-line">
                    <input id="quantity" type="text" className="transaction__input" placeholder="0.00" value={buyCount} onChange={e => changeCoinAddCount(e.target.value)} />
                    <div className="transaction__coin">
                        <img src={findBuy() ? findBuy().image : ''} alt="" className="transaction__image" />
                        <div className="transaction__name">
                            {findBuy() ? findBuy().symbol.toUpperCase() : ''}
                        </div>
                    </div>
                </div>

                <label htmlFor="quantity" className="transaction__label">Цена покупки</label>
                <div className={showCustomPriceInput ? "transaction__row transaction__row_custom" : "transaction__row  transaction__buy-line"}>
                    <input id="price" type="text" className="transaction__input" value={sellCount} onChange={e => changeCoinSellCount(e.target.value)} placeholder="0.00" />
                    <div className="transaction__coin">
                        <img src={findSell() ? findSell().image : ''} alt="" className="transaction__image" />
                        <div className="transaction__name">
                            {findSell() ? findSell().symbol.toUpperCase() : ''}
                        </div>
                    </div>
                </div>

                <div className={!showCustomPriceInput ? "transaction__row transaction__row_custom" : "transaction__row  transaction__buy-line"}>
                    <input id="price" type="text" className="transaction__input" value={customBuyPrice} onChange={e => changeCustomBuyPrice(e.target.value)} placeholder="0.00" />
                    <div className="transaction__coin">
                        <img src={findSell() ? findSell().image : ''} alt="" className="transaction__image" />
                        <div className="transaction__name">
                            {findSell() ? findSell().symbol.toUpperCase() : ''}
                        </div>
                    </div>
                </div> 

                <label htmlFor="quantity" className="transaction__label">Цена продажи</label>
                <div className="transaction__row">
                    <input id="price" type="text" className="transaction__input" value={sellPrice} onChange={e => changeSellPrice(e.target.value)} placeholder="0.00" />
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

                <button className="transaction__add" onClick={() => {calcResult(buyCount, !showCustomPriceInput ? findBuy().current_price : customBuyPrice, sellPrice)}}>
                    Рассчитать
                </button>

                {
                    calcProfit !== ''
                    ? <div className="calc-result">
                        <div className="calc-result__row">
                            <div className="calc-result__text">
                                Прибыль: <span className={calcProfit > 0 ? 'calc-result__green' : 'calc-result__red'}>{calcProfit.toLocaleString()} $</span>
                            </div>
                        </div>
                    </div>
                    : ''
                }
                

            </div>
        </div>
    )
}
