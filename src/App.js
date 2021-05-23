import React, { useEffect, useState } from 'react';
import './App.css';
import Coin from './Coin';

const cryptoApi = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false";

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
    function getData() {
      fetch(cryptoApi)
        .then(result => result.json())
        .then(result => setCoins(result))
    }
    getData();
    const interval = setInterval(() => {
      getData();
      setDt(new Date().toLocaleString())
    }, 60000);
    return () => {
      clearInterval(interval);
    }
  }, [])

  const valueChange = el => {
    setSearch(el.target.value);
  }

  const filterResult = coins.filter(el =>
    el.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="search-text">Search crypto</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={valueChange} />
        </form>
      </div>
      <p className="updated-time">Last Updated: {dt}</p>
      {filterResult.map(coin => {
        return <Coin
          key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          price={coin.current_price}
          volume={coin.market_cap}
          priceChange={coin.price_change_percentage_24h}
        />;
      })}
    </div>
  );
}

export default App;
