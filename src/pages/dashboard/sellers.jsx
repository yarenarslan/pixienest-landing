import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Chip,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTooltip, Legend);

const API_URL = import.meta.env.VITE_API_URL;

export default function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [topSellersChart, setTopSellersChart] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/sellers/top-sellers`);
        if (Array.isArray(res.data)) {
          const uniqueSellers = Object.values(
            res.data.reduce((acc, curr) => {
              const existing = acc[curr.shop_name];
              if (!existing || existing.total_sales < curr.total_sales) {
                acc[curr.shop_name] = curr;
              }
              return acc;
            }, {})
          );
          const sorted = uniqueSellers.sort((a, b) => b.total_sales - a.total_sales);
          setSellers(sorted);
        } else {
          setError("Satıcı verisi alınamadı.");
        }
      } catch (err) {
        console.error("Failed to fetch sellers:", err);
        setError("Veri alınırken hata oluştu.");
      }
    };

    const fetchChart = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/sellers/top-daily`);
        setTopSellersChart(res.data);
      } catch (err) {
        console.error("Grafik verisi alınamadı", err);
      }
    };

    fetchSellers();
    fetchChart();
  }, []);

  const getRankChip = (index) => {
    const position = index + 1;
    if (position === 1) return <Chip value="#1" color="yellow" className="font-bold" />;
    if (position === 2) return <Chip value="#2" color="blue" className="font-bold" />;
    if (position === 3) return <Chip value="#3" color="brown" className="font-bold" />;
    return <Chip value={`#${position}`} color="blue-gray" />;
  };

  const chartData = {
    labels: topSellersChart.map((s) => s.shop_name),
    datasets: [
      {
        label: "Daily Sales",
        data: topSellersChart.map((s) => s.total_sales),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { beginAtZero: true },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Typography variant="h4" className="font-bold flex items-center gap-2">
          🏪 Top Sellers Overview
        </Typography>
        <Typography variant="small" className="text-gray-600">
          Updated rankings of top Etsy shops based on sales & favorites.
        </Typography>
      </div>

      <Card className="mb-6 p-4 shadow-md border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Typography variant="h6">📊 Daily Top Sellers</Typography>
            <Tooltip content="These are the top Etsy shops based on daily sales performance.">
              <InformationCircleIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
            </Tooltip>
          </div>
        </div>
        <Bar data={chartData} options={chartOptions} />
      </Card>

      <Card className="p-4 shadow-md border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Typography variant="h6">🏆 Most Successful Etsy Shops</Typography>
            <Tooltip content="Filtered by most recent and highest performing shops over 5 days.">
              <InformationCircleIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
            </Tooltip>
          </div>
        </div>

        {error && (
          <Typography color="red" className="mb-4">
            ⚠️ {error}
          </Typography>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sellers.map(({ id, shop_name, product_count, total_sales, total_favorites, created_at }, index) => (
            <Card key={id} className="shadow border border-blue-gray-50">
              <CardBody className="flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-semibold text-blue-gray-800">
                    {shop_name}
                  </Typography>
                  {getRankChip(index)}
                </div>
                <Typography variant="small" color="blue-gray">
                  🛍️ Products: <strong>{product_count}</strong>
                </Typography>
                <Typography variant="small" color="blue-gray">
                  📦 Sales: <strong>{total_sales}</strong>
                </Typography>
                <Typography variant="small" color="blue-gray">
                  ⭐ Favorites: <strong>{total_favorites}</strong>
                </Typography>
                <Typography variant="small" color="blue-gray">
                  📅 Since: <strong>{created_at}</strong>
                </Typography>
                <a
                  href={`https://etsy.com/shop/${shop_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3"
                >
                  <Button fullWidth size="sm" className="text-white bg-black hover:bg-gray-800">
                    Visit Shop
                  </Button>
                </a>
              </CardBody>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
