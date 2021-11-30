import React from 'react';
import './portfolioInfo.sass';

export default function PortfolioInfo() {
    return (
        <div className="portfolio-info">
            <div className="portfolio-info__block">
                <div className="portfolio-info__balance">
                    <span>
                        Сумма портфеля/изменения за 24ч.
                    </span>
                    <div className="portfolio-info__sum">
                        $9,337.87
                    </div>
                    <div className="portfolio-info__24h">
                        -$38.14 <span>-0.41%</span>
                    </div>
                </div>
                <div className="portfolio-info__profit">
                    <span className="portfolio-info__profit_left">
                        Прибыль за все время
                    </span>
                    <div className="portfolio-info__profit_right">
                        -$667.00 <br />
                        -6.67%
                    </div>
                </div>
                
            </div>
        </div>
    )
}
