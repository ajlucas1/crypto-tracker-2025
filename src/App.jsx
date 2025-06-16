// src/App.js
import { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setCoins(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "Failed to fetch cryptocurrency data. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="app-top">
        <h1>Search Your Crypto</h1>
        <form>
          <input
            type="text"
            placeholder="Search by coin name"
            onChange={updateSearch}
            value={search}
          />
        </form>
      </div>
      <div className="app-bottom">
        {loading && (
          <p className="loading-message">Loading cryptocurrency data...</p>
        )}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && filteredCoins.length === 0 && (
          <p className="no-results-message">
            No coins found matching your search.
          </p>
        )}

        {!loading &&
          !error &&
          filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                current={coin.current_price}
                dailyHigh={coin.high_24h}
                dailyLow={coin.low_24h}
                image={coin.image}
                change={coin.price_change_percentage_24h}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
