import React, {useState} from 'react';
import Coin from './Coin';
import './search.sass';


export default function SearchCrypto({coins, panelStatus, setPanelStatus}) {

    const [search, setSearch] = useState("");

    const handleChange = e => {
        setSearch(e.target.value)
    }
    
    const filteredCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className={panelStatus ? "finance-search finance-search_open" : "finance-search"} >
            <h1>Search</h1>
            <input className="finance-search__input" type="text" onChange={handleChange} />
            <div className="finance-search__list">
                {
                    filteredCoins.map(coin => {
                        return(
                            <Coin key={coin.id}
                                panelStatusFromCoin={setPanelStatus} 
                                name={coin.name} 
                                image={coin.image} 
                                symbol={coin.symbol}
                                currentPrice={coin.current_price}
                                marketCap={coin.market_cap}
                                priceChange={coin.price_change_24h}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
