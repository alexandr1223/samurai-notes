import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchCrypto from './Search/SearchCrypto';
import {useSelector, useDispatch} from 'react-redux';
import {addCryptoCurrencies} from '../../redux/action/cryptoData'
import Chart from './Sidebar/Chart'
import Tabs from './Sidebar/Tabs/Tabs'
import Transactions from './Transactions/Transactions';
import './financePortfolio.sass';

function FinancePortfolio() {

    const dispatch = useDispatch();
    const cryptoPortfolio = useSelector(({crypto}) => crypto.portfolio);
    const [coins, setCoins] = useState([]);
    const [searchPanelStatus, setSearchPanelStatus] = useState(false)
    
    useEffect(() => {
        axios
        .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(response => {
            setCoins(response.data);
            dispatch(addCryptoCurrencies(response.data))
        })
        .catch(error => console.log(error))
    }, [dispatch]);


    const showSearchPanel = () => {
        setSearchPanelStatus(true)
    }

    const takeSum = () => {
        let sum = 0;
        cryptoPortfolio.forEach(el => sum += el.coinCount * el.coinValue)
        return (
            <span>{sum > 0 ? sum.toLocaleString() : 0}</span>
        )
    }

    // const portfolioCoin = 
    //     cryptoPortfolio.map((item) => {
    //         return (
    //             coins.find(coin => coin.name === item.buyName[0])
    //         )
    //     })
    
    // console.log(portfolioCoin)
    
    return (
        <div className="finance">
            <div className="finance__content">
                <div className="finance__info">
                    <h1 className="finance__title">
                        Финансовый портфель
                    </h1>
                    
                    <div className="finance__sum">
                        Общий размер кошелька: {takeSum()} $ 
                    </div>
                </div>

                <div className="finance__assets">
                    <div className="portfolio-list">
                        
                        <h2 className="finance__subtitle">
                            Ваши активы
                        </h2>
                        {
                            cryptoPortfolio.map(({id, buyName, image, buyPrice, currentPrice, priceChange, coinCount, coinValue, symbol}) => (
                                buyName === '' ? '' :
                                <div className="portfolio-list__item" key={id}>
                                    <div className="portfolio-list__left">
                                        <img className="portfolio-list__image" src={image} alt="" />
                                        <div className="portfolio-list__column">
                                            <div className="portfolio-list__name">
                                                {buyName}
                                            </div>
                                            <div className={priceChange > 0 ? "portfolio-list__change portfolio-list__change_green" : "portfolio-list__change portfolio-list__change_red"}>
                                                ${currentPrice.toLocaleString()} / {priceChange}% 
                                            </div>
                                        </div>
                                    </div>

                                    <div className="portfoio-list__center">
                                        <div className="portfolio-list__price">
                                            Средняя цена покупки <br />
                                            $ {buyPrice}
                                        </div>
                                    </div>

                                    <div className="portfolio-list__right">
                                        <div className="portfolio-list__symbol">
                                            {coinCount} {symbol.toUpperCase()}
                                        </div>
                                        <div className="portfolio-list__value">
                                            $ {(coinCount * coinValue).toLocaleString()}
                                        </div>
                                    </div>
                                    
                                </div>
                            ))
                        }
                    </div>

                    <div className="portfolio-transactions">
                        <h2 className="finance__subtitle">
                            Последние транзакции
                        </h2>
                        <Transactions />
                    </div>

                    {/* <button className="finance__new-crypto" onClick={showSearchPanel}>
                        Добавить криптовалюту
                    </button> */}
                </div>
                <SearchCrypto coins={coins} panelStatus={searchPanelStatus} setPanelStatus={setSearchPanelStatus} />
            </div>

            <div className="finance-sidebar">
                <div className="finance-sidebar__tab">
                    <Tabs coinsData={coins} searchPanelOpen={showSearchPanel} />
                </div>
                <div className="finance-sidebar__chart">
                    <h3 className="finance-sidebar__chart-title">
                        Диаграмма активов
                    </h3>
                    <Chart />
                </div>
            </div>
            
        </div>
    )
}

export default FinancePortfolio