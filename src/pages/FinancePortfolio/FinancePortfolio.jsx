import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchCrypto from './Search/SearchCrypto';
import {useSelector, useDispatch} from 'react-redux';
import {addCryptoCurrencies} from '../../redux/action/cryptoData';
import { updateCurrencies } from '../../redux/action/cryptoPortfolio';
import Chart from './Sidebar/Chart';
import FinanceTabs from './Sidebar/Tabs/FinanceTabs';
import Transactions from './Transactions/Transactions';
import PortfolioList from './PortfolioList/PortfolioList';
import PortfolioInfo from './PortfolioInfo/PortfolioInfo';
import { useInterval } from '../../customHooks/useInterval';
import './financePortfolio.sass';

function FinancePortfolio() {

    const dispatch = useDispatch();
    const cryptoPortfolio = useSelector(({crypto}) => crypto.portfolio);
    const [coins, setCoins] = useState([]);
    const [updateData, setUpdateData] = useState(false);
    const [searchPanelStatus, setSearchPanelStatus] = useState(false);
    
    useEffect(() => {
        axios
        .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(response => {
            setCoins(response.data);
            dispatch(addCryptoCurrencies(response.data))
        })
        .catch(error => console.log(error))
    }, [dispatch]);

    const setTimeUpdateData = () => {
        setTimeout(() => {
            console.log('change')
            console.log('ch', updateData)
            setUpdateData(!updateData)
        }, 1000)
        
        console.log('изменилось', updateData)
    }
    
    useInterval(() => {
        if (cryptoPortfolio.length !== 0) {
            axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(response => {
                setCoins(response.data);
                changeCurrentPrices(response.data);
            })
            .catch(error => console.log(error))
        }
    }, 5000)

    const changeCurrentPrices = (data) => {
        let changedPrice = [];
        cryptoPortfolio.map(item => {
            data.map(coin => {
                
                if (item.buyName === coin.name && item.currentPrice !== coin.current_price) {
                    let element = {name: '',price: ''};
                    console.log(item)
                    element.name = coin.name;
                    element.price = coin.current_price;
                    return changedPrice.push(element)
                }
                return changedPrice;
            })
            return item;
        })
        
        if (changedPrice.length !== 0) {
            console.log('вызов')
            setUpdateData(!updateData);
            setTimeUpdateData(updateData);
            dispatch(updateCurrencies(changedPrice))
        }
        
    }
    console.log(updateData)

    const showSearchPanel = () => {
        setSearchPanelStatus(true)
    }

    const takeSum = () => {
        let sum = 0;
        cryptoPortfolio.forEach(el => sum += el.coinCount * el.currentPrice)
        return sum.toFixed(2)
    }

    return (
        <div className="finance">
            <div className="finance__content">
                <div className="finance__info">
                    <h1 className="finance__title">
                        Финансовый портфель
                    </h1>
                    
                    <div className="finance__sum">
                        Общий размер кошелька: <span>{takeSum().toLocaleString()} $ </span>
                    </div>
                </div>

                {
                    cryptoPortfolio.length > 0 ?
                    <div className="finance__assets">
                        <PortfolioInfo sum={takeSum()} updateStatus={updateData} />
                        <PortfolioList />
                        <Transactions/>
                    </div>
                    : ''
                }

                <SearchCrypto coins={coins} panelStatus={searchPanelStatus} setPanelStatus={setSearchPanelStatus} />
            </div>

            <div className="finance-sidebar">
                <div className="finance-sidebar__tab">
                    <FinanceTabs coinsData={coins} searchPanelOpen={showSearchPanel} />
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