import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  // ⭐ Load Favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (coinId) => {
    const updated = favorites.includes(coinId)
      ? favorites.filter((id) => id !== coinId)
      : [...favorites, coinId];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
      )
      .then((res) => setCoins(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">💰 Crypto Tracker</h1>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search coins..."
        className="w-full p-2 mb-6 bg-gray-800 border border-gray-700 rounded-md text-white"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      {/* 💸 Coin Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {coins
          .filter((coin) => coin.name.toLowerCase().includes(search))
          .map((coin) => (
            <div
              key={coin.id}
              className="bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-xl transition"
            >
              <img src={coin.image} alt={coin.name} className="w-12 h-12 mb-2" />
              <h2 className="text-xl font-semibold">{coin.name}</h2>
              <p className="text-gray-400">{coin.symbol.toUpperCase()}</p>
              <p className="text-green-400 font-bold">${coin.current_price}</p>

              {/* ⭐ Favorite Button */}
              <button
                onClick={() => toggleFavorite(coin.id)}
                className="mt-2 text-yellow-400 text-sm underline"
              >
                {favorites.includes(coin.id)
                  ? "★ Remove Favorite"
                  : "☆ Add Favorite"}
              </button>

              {/* 📈 Chart */}
              <CoinChart id={coin.id} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
