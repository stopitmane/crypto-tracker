import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function CoinChart({ id }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: 7,
        },
      })
      .then((res) => {
        const prices = res.data.prices;
        setChartData({
          labels: prices.map((p) => new Date(p[0]).toLocaleDateString()),
          datasets: [
            {
              label: "Price (USD)",
              data: prices.map((p) => p[1]),
              borderColor: "rgba(255, 206, 86, 1)",
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              tension: 0.4,
            },
          ],
        });
      });
  }, [id]);

  return (
    <div className="mt-4">
      {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
}
