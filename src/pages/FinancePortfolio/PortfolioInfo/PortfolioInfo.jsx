import React from 'react';
import './portfolioInfo.sass';
import { Transition } from 'react-transition-group'
import { useSelector } from 'react-redux';

export default function PortfolioInfo({sum, updateStatus}) {

    const cryptoPortfolio = useSelector(({crypto}) => crypto.portfolio);
    
    const sumChangeFrom24h = () => {
        let allSum = 0;
        cryptoPortfolio.map(item => {
            allSum += (item.currentPrice*item.coinCount/100*item.priceChange) 
            return allSum
        });
        return (
            allSum.toFixed(2)
        )
    }

    const allTimeProfit = () => {
        let profit = 0;
        cryptoPortfolio.map(item => {
            profit += item.currentPrice*item.coinCount-item.buyPrice*item.coinCount
            return profit
        });
        return (
            profit.toFixed(2)
        )
    }

    // Топ монета по прибыльности
    const topGainer = () => {
        let gainer = 0;
        if (cryptoPortfolio.length > 0) {
            cryptoPortfolio.map(item => {
                let profit = item.currentPrice*item.coinCount-item.buyPrice*item.coinCount;
                if (profit > gainer) {
                    gainer = item;
                }
                return item;
            })
        }
        return gainer
    }

    const gainerProfit = (coin) => {
        let gainerSum;
        gainerSum = coin.currentPrice*coin.coinCount-coin.buyPrice*coin.coinCount;
        return gainerSum
    }

    const gainerProfitPercent = (coin) => {
        let gainerPercent;
        gainerPercent = ((coin.currentPrice*coin.coinCount-coin.buyPrice*coin.coinCount)*100)/coin.buyPrice*coin.coinCount;
        return gainerPercent
    }

    // Топ монета по убыткам
    const topLoser = () => {
        let loser = 0;
        if (cryptoPortfolio.length > 1) {
            cryptoPortfolio.map(item => {
                let profit = item.currentPrice*item.coinCount-item.buyPrice*item.coinCount;
                if (profit < loser) {
                    loser = item;
                }
                return item;
            })
        }
        return loser
    }

    const loserProfit = (coin) => {
        let loserSum;
        loserSum = coin.currentPrice*coin.coinCount-coin.buyPrice*coin.coinCount;
        return loserSum
    }

    const loserProfitPercent = (coin) => {
        let loserPercent;
        loserPercent = ((coin.currentPrice*coin.coinCount-coin.buyPrice*coin.coinCount)*100)/coin.buyPrice*coin.coinCount;
        return loserPercent
    }
    
    return (
        <div className="portfolio-info">
            <div className="portfolio-info__block">
                <div className="portfolio-info__balance">
                    <h3 className="portfolio-info__title">
                        Сумма портфеля / изменения за 24ч.
                    </h3>
                    <Transition in={updateStatus} timeout={500}>
                        {state => (
                            <div className={`portfolio-info__sum ${state}`}>
                                {sum.toLocaleString()}$
                            </div>
                        )}
                    </Transition>
                    <Transition in={updateStatus} timeout={500}>
                        {state => (
                            <div className={sumChangeFrom24h() > 0 ? `portfolio-info__24h portfolio-info__24h_green ${state}` : `portfolio-info__24h portfolio-info__24h_red ${state}`}>
                                {sumChangeFrom24h()}$ <span>{(sumChangeFrom24h()*100/sum).toFixed(2)}%</span>
                            </div>
                        )}
                    </Transition>
                </div>
                <div className="portfolio-info__profit">
                    <h3 className="portfolio-info__title">
                        Прибыль за все время
                    </h3>
                    <Transition in={updateStatus} timeout={500}>
                        {state => (
                            <div className={allTimeProfit() > 0 ? `portfolio-info__profit_right portfolio-info__profit_right_green ${state}` : `portfolio-info__profit_right portfolio-info__profit_right_red ${state}`}>
                                <span className={"portfolio-info__profit_green"}>{allTimeProfit()}$</span>
                                <span>{(allTimeProfit()*100/sum).toFixed(2)}%</span>
                            </div>
                        )}
                    </Transition>
                </div>
                {
                    topGainer() ? 
                    <div className="portfolio-info__coins">
                        <div className="portfolio-info__line">
                            <h3 className="portfolio-info__title">
                                Топ по прибыли
                            </h3>
                            <h3 className="portfolio-info__title">
                                Изменения за 24ч.
                            </h3>
                        </div>
                        <Transition in={updateStatus} timeout={500}>
                            {state => (
                                <div className={`portfolio-info__line portfolio-info__gainer ${state}`}>
                                    <div className="portfolio-info__line-item">
                                        <img className="portfolio-info__line-image" src={topGainer().image} alt="" />
                                        <div className="portfolio-info__line-column">
                                            <div className="portfolio-info__line-ticker">
                                                {topGainer().symbol.toUpperCase()}
                                            </div>
                                            <div className="portfolio-info__line-text">
                                                {topGainer().buyName}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="portfolio-info__line-column portfolio-info__line-column-end portfolio-info__gainer_green">
                                        <span>{gainerProfit(topGainer()).toFixed(2)}$</span>
                                        <span className="portfolio-info__gainer_percent">{gainerProfitPercent(topGainer()).toFixed(2)}%</span>
                                    </div>
                                </div>
                            )}
                        </Transition>
                    </div>
                    : ''
                }

                {
                    topLoser() ?
                    <div className="portfolio-info__coins">
                        <div className="portfolio-info__line">
                            <h3 className="portfolio-info__title">
                                Топ по убыткам
                            </h3>
                            <h3 className="portfolio-info__title">
                                Изменения за 24ч.
                            </h3>
                        </div>
                        <Transition in={updateStatus} timeout={500}>
                            {state => (
                                <div className={`portfolio-info__line portfolio-info__loser ${state}`}>
                                    <div className="portfolio-info__line-item">
                                        <img className="portfolio-info__line-image" src={topLoser().image} alt="" />
                                        <div className="portfolio-info__line-column">
                                            <div className="portfolio-info__line-ticker">
                                                {topLoser().symbol.toUpperCase()}
                                            </div>
                                            <div className="portfolio-info__line-text">
                                                {topLoser().buyName}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="portfolio-info__line-column portfolio-info__line-column-end portfolio-info__loser_red">
                                        <span>{loserProfit(topLoser()).toFixed(2)}$</span>
                                        <span className="portfolio-info__loser_percent">{loserProfitPercent(topLoser()).toFixed(2)}%</span>
                                    </div>
                                </div>
                            )}
                        </Transition>
                    </div>
                    : ''
                }
            </div>
        </div>
    )
}
