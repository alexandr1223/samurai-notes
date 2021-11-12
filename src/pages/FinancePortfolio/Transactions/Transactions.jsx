import React from 'react'
import {useSelector} from 'react-redux';
import './transactions.sass'

export default function Transactions() {
    
    const transactions = useSelector(({transactions}) => transactions.transactionList);
    
    return (
        <div className="transactions-history">
            {
                transactions.slice(0).reverse().map(({id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol, transactionType}, index) => (
                    <div className={transactionType === 'buy' ? "transactions-history__item transactions-history__item_buy" : (transactionType === 'sell' ? 'transactions-history__item transactions-history__item_sell' : 'transactions-history__item')} key={index}>
                        <div className="transactions-history__left">
                            <img className="transactions-history__image" src={image} alt="" />
                            <div className="transactions-history__column">
                                <div className="transactions-history__name">
                                    {buyName}
                                </div>
                                <div className={buyPrice > 0 ? "transactions-history__change transactions-history__change--green" : "transactions-history__change transactions-history__change--red"}>
                                    {priceChange}%
                                </div>
                            </div>
                        </div>

                        <div className="portfoio-list__center">
                            <div className="portfoio-list__price">
                                ${currentPrice.toLocaleString()}
                            </div>
                        </div>

                        <div className="transactions-history__right">
                            <div className="transactions-history__symbol">
                                {coinCount} {symbol.toUpperCase()}
                            </div>
                            <div className="transactions-history__value">
                                $ {(coinCount * buyPrice).toLocaleString()}
                            </div>
                        </div>
                        
                    </div>
                ))
            }
        </div>
    )
}
