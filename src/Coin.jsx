import React from "react";
import "./coin.css";

export default function Coin({
  image,
  name,
  symbol,
  current,
  dailyHigh,
  dailyLow,
  change,
}) {
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "N/A";
    return `$${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="coin-container">
      <div className="coin-row">
        <img src={image} alt="coin-image" />
        <h2>{name}</h2>
        <h4>{formatCurrency(current)}</h4>
        {change < 0 ? (
          <p className="red">{change.toFixed(2)}%</p>
        ) : (
          <p className="green">{change.toFixed(2)}%</p>
        )}
        <img className="img2" src={image} alt="coin-image" />
      </div>
    </div>
  );
}
