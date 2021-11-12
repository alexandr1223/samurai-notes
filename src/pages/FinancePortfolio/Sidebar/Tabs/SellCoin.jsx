import React, {useState} from 'react'
import { useDispatch} from 'react-redux';
import { sellCrypto } from '../../../../redux/action/cryptoPortfolio';
import { useSelector } from 'react-redux';
import {setNewLine, addNewCoinTransaction, sellCoinInfo} from '../../../../redux/action/changeCoinOnSidebar';
import { addTransaction } from '../../../../redux/action/transactions';

export default function Transaction({searchPanelStatus, id}) {

    const dispatch = useDispatch();
    const coins = useSelector(({cryptoData}) => cryptoData.data);
    const sidebarCoin = useSelector(({changeSidebarCoin}) => changeSidebarCoin)

    const [buyCount, setBuyCount] = useState(0);
    const [sellCount, setSellCount] = useState(0);

    // Установка кастомной цены покупки
    const [showCustomPriceInput, setShowCustomPriceInput] = useState(false);
    const [customSellPrice, setCustomSellPrice] = useState('');

    const sellCryptoFromPortfolio = (id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol) => {
        id = id.replace(/\s/g, '');
        let transactionType = 'sell';
        dispatch(sellCrypto(id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol))
        dispatch(addTransaction(id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol, transactionType))
    }

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

    // Переключение ползунка для открытия кастомного ввода цены, открытие инпута с кастомной ценой
    const openCustomPriceField = () => {
        setShowCustomPriceInput(!showCustomPriceInput)
    }
    const changeCustomSellPrice = (value) => {
        setCustomSellPrice(value)
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
        <div className="transaction" key={id}>
            <div className="transaction__title">
                Продать криптовалюту
            </div>
            <div className="transaction__block">

                <label htmlFor="quantity" className="transaction__label">Продать</label>
                <div className="transaction__row transaction__buy-line">
                    <input id="quantity" type="text" className="transaction__input" placeholder="0.00" value={buyCount} onChange={e => changeCoinAddCount(e.target.value)} />
                    <div className="transaction__coin" onClick={setLineBuy}>
                        <img src={findBuy() ? findBuy().image : ''} alt="" className="transaction__image" />
                        <div className="transaction__name">
                            {findBuy() ? findBuy().symbol.toUpperCase() : ''}
                        </div>
                    </div>
                </div>

                <label htmlFor="quantity" className="transaction__label">Купить</label>
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
                    <input id="price" type="text" className="transaction__input" value={customSellPrice} onChange={e => changeCustomSellPrice(e.target.value)} placeholder="0.00" />
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
                        {findBuy() ? findBuy().current_price : ''} <span>{findSell() ? findSell().symbol.toUpperCase() : ''}</span> за <span>{findBuy() ? findBuy().symbol.toUpperCase() : ''}</span>
                    </div>
                </div>

                <div className="transaction__switch">
                    <label htmlFor="check" className="transaction__switch-label">Своя цена</label>
                    <label className="transaction__switch-block">
                        <input type="checkbox" checked={showCustomPriceInput} onChange={openCustomPriceField}/>
                        <span className="transaction__slider round"></span>
                    </label>
                </div>


                <button className="transaction__add" onClick={() => {sellCryptoFromPortfolio(findBuy().name, sidebarCoin.buyTopCoin, findBuy().image, !showCustomPriceInput ? findBuy().current_price : customSellPrice, findBuy().current_price, findBuy().price_change_percentage_24h, buyCount, findBuy().current_price, findBuy().symbol)}}>
                    Добавить
                </button>
            </div>
        </div>
    )
}
