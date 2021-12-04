import React from 'react';
import BuyCoin from './BuyCoin';
import TransferCoin from './TransferCoin';
import SellCoin from './SellCoin';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './sidebarTabs.sass';

export default function FinanceTabs({coinsData, searchPanelOpen}) {
    
    return (
        <div>
            <Tabs className="tab">
                <TabList className="tabcontent">
                    <Tab className="tab__link">Buy</Tab>
                    <Tab className="tab__link">Sell</Tab>                    
                    <Tab className="tab__link">Transfer</Tab>
                </TabList>

                <TabPanel className="board-tabcontent">
                    <BuyCoin
                        searchPanelStatus={searchPanelOpen}
                        id={coinsData.name}
                        openStatus={coinsData.transactionPageStatus}
                        setTransactionStatus={coinsData.setTransactionPageStatus}
                    />
                </TabPanel>
                <TabPanel className="board-tabcontent">
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
                </TabPanel>
                <TabPanel className="board-tabcontent">
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
                </TabPanel>
            </Tabs>
        </div>
    );
}
