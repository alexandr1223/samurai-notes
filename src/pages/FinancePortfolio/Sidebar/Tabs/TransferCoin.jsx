import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCrypto, sellCrypto } from '../../../../redux/action/cryptoPortfolio';
import {setNewLine, addNewCoinTransaction} from '../../../../redux/action/changeCoinOnSidebar';
import { addTransaction } from '../../../../redux/action/transactions';

export default function Transaction({searchPanelStatus, id}) {

    const dispatch = useDispatch();
    const coins = useSelector(({cryptoData}) => cryptoData.data);
    const sidebarCoin = useSelector(({changeSidebarCoin}) => changeSidebarCoin)

    const [buyCount, setBuyCount] = useState(0);

    // Установка кастомной цены покупки
    const [transferType, setTransferType] = useState(false);

    // Добавление криптовалюты
    const addCryptoToPortfolio = (id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol) => {
        id = id.replace(/\s/g, '');
        let transactionType = 'transfer';
        dispatch(addCrypto(id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol))
        dispatch(addTransaction(id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol, transactionType))
    }

    // Удаление криптовалюты
    const deleteCryptoFromPortfolio = (id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol) => {
        id = id.replace(/\s/g, '');
        let transactionType = 'transfer';
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
            } else {
                dispatch(addNewCoinTransaction(addCoin))
            }
        }
    }

    const setLineBuy = () => {
        dispatch(setNewLine(0))
        searchPanelStatus();
    }

    const changeTransferType = () => {
        setTransferType(!transferType)
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

    return (
        <div className="transaction" key={id}>
            <div className="transaction__title">
                Перевод криптовалюты
            </div>
            <div className="transaction__block">

                <div className="transaction__row transaction__buy-line">
                    <input id="quantity" type="text" className="transaction__input" placeholder="0.00" value={buyCount} onChange={e => changeCoinAddCount(e.target.value)} />
                    <div className="transaction__coin" onClick={setLineBuy}>
                        <img src={findBuy() ? findBuy().image : ''} alt="" className="transaction__image" />
                        <div className="transaction__name">
                            {findBuy() ? findBuy().symbol.toUpperCase() : ''}
                        </div>
                    </div>
                </div>
                
                <div className="transaction__switch transaction__switch_transfer">
                    <label htmlFor="check" className="transaction__switch-label">Ввод</label>
                    <label className="transaction__switch-block">
                        <input type="checkbox" checked={transferType} onChange={changeTransferType}/>
                        <span className="transaction__slider round"></span>
                    </label>
                    <label htmlFor="check" className="transaction__switch-label">Вывод</label>
                </div>
                

                <button className={!transferType ? "transaction__add " : "transaction__add_hide"} onClick={() => {addCryptoToPortfolio(findBuy().name, sidebarCoin.buyTopCoin, findBuy().image, findBuy().current_price, findBuy().current_price, findBuy().price_change_percentage_24h, buyCount, findBuy().current_price, findBuy().symbol)}}>
                    Добавить
                </button>
                <button className={transferType ? "transaction__add" : "transaction__add_hide"} onClick={() => {deleteCryptoFromPortfolio(findBuy().name, sidebarCoin.buyTopCoin, findBuy().image, findBuy().current_price, findBuy().current_price, findBuy().price_change_percentage_24h, buyCount, findBuy().current_price, findBuy().symbol)}}>
                    Добавить
                </button>
            </div>
        </div>
    )
}
