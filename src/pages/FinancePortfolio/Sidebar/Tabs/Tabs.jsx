import React, {useState} from 'react';
import BuyCoin from './BuyCoin';
import TransferCoin from './TransferCoin';
import SellCoin from './SellCoin';
import './sidebarTabs.sass';

export default function Tabs({coinsData, searchPanelOpen}) {
    const [ active, setActive ] = useState(0);

    const TabContent = ({ title, content }) => (
        <div className="tabcontent">
            {content}
        </div>
    );    

    const buy = () => {
        return (
            <BuyCoin
                searchPanelStatus={searchPanelOpen}
                id={coinsData.name}
                openStatus={coinsData.transactionPageStatus}
                setTransactionStatus={coinsData.setTransactionPageStatus}
            />
        )
    }

    const sell = () => {
        return (
            <SellCoin
                searchPanelStatus={searchPanelOpen}
                id={coinsData.name}
                openStatus={coinsData.transactionPageStatus}
                setTransactionStatus={coinsData.setTransactionPageStatus}
                name={coinsData.name} 
                symbol={coinsData.symbol} 
                image={coinsData.image} 
                currentPrice={coinsData.currentPrice}
                priceChange={coinsData.priceChange}
            />
        )
    }

    const transaction = () => {
        return (
            <TransferCoin
                searchPanelStatus={searchPanelOpen}
                id={coinsData.name}
                openStatus={coinsData.transactionPageStatus}
                setTransactionStatus={coinsData.setTransactionPageStatus}
                name={coinsData.name} 
                symbol={coinsData.symbol} 
                image={coinsData.image} 
                currentPrice={coinsData.currentPrice}
                priceChange={coinsData.priceChange}
            />
        )
    }

    const items = [
        { title: 'Buy', content: buy() },
        { title: 'Sell', content: sell() },
        { title: 'Transfer', content: transaction() },
      ];

    

    const openTab = e => setActive(+e.target.dataset.index);

    return (
        <div>
            <div className="tab">
                {
                    items.map((n, i) => (
                        <button
                            key={i}
                            className={`tab__link ${i === active ? 'active' : ''}`}
                            onClick={openTab}
                            data-index={i}
                        >{n.title}</button>
                    ))
                }
            </div>
            {items[active] && <TabContent {...items[active]} />}
        </div>
    );
}
