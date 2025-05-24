import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Tooltip,
} from "@material-tailwind/react";
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

// Chart.js kayıt
ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTooltip, Legend);

const API_URL = import.meta.env.VITE_API_URL;

export function KeywordsPage() {
  const [topKeywords, setTopKeywords] = useState([]);
  const [allKeywords, setAllKeywords] = useState([]);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const daily = await axios.get(`${API_URL}/api/keywords/top-daily`);
        const all = await axios.get(`${API_URL}/api/keywords/all`);
        setTopKeywords(daily.data);
        setAllKeywords(all.data);
      } catch (error) {
        console.error("Anahtar kelimeler alınamadı:", error);
      }
    };
    fetchKeywords();
  }, []);

  // ✅ Chart verisi
  const chartData = {
    labels: topKeywords.map((item) => item.keyword),
    datasets: [
      {
        label: "Keyword Count",
        data: topKeywords.map((item) => item.count),
        backgroundColor: "#6366f1",
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
    responsive: true,
    maintainAspectRatio: false,
  };

  const getRankChip = (index) => {
    if (index === 0) return <Chip value="#1" color="yellow" className="font-bold" />;
    if (index === 1) return <Chip value="#2" color="blue" className="font-bold" />;
    if (index === 2) return <Chip value="#3" color="brown" className="font-bold" />;
    return <Chip value={`#${index + 1}`} color="blue-gray" />;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Başlık */}
      <div className="mb-6 flex justify-between items-start flex-wrap gap-4">
        <div>
          <Typography variant="h4" className="text-indigo-700 font-bold">
            🔍 Keyword Trends & SEO Insights
          </Typography>
          <Typography variant="small" className="text-blue-gray-400 mt-1">
            This page helps track top keywords and understand SEO patterns.
          </Typography>
        </div>
      </div>

      {/* Günlük Bar Chart */}
      <Card className="mb-6 p-4 shadow-md border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Typography variant="h6" className="text-blue-gray-800 font-semibold">
              📊 Top 5 Keywords (Today)
            </Typography>
            <Tooltip content="Top 5 keywords used today in your listings.">
              <InformationCircleIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
            </Tooltip>
          </div>
        </div>
        <div className="w-full md:h-[300px]">
          {topKeywords.length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <Typography variant="small" className="text-center text-gray-500">
              Loading chart...
            </Typography>
          )}
        </div>
      </Card>

      {/* 30 Günlük Top 20 Liste */}
      <Card className="mb-6 p-4 shadow-md border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Typography variant="h6" className="text-blue-gray-800 font-semibold">
              🏆 Top 20 Keywords (Last 30 Days)
            </Typography>
            <Tooltip content="Most frequently used 20 keywords in the last 30 days.">
              <InformationCircleIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
            </Tooltip>
          </div>
        </div>
        <CardBody className="divide-y">
          {allKeywords.map((item, index) => (
            <div key={index} className="py-2 flex items-center gap-4">
              {getRankChip(index)}
              <Typography className="flex-1">{item.keyword}</Typography>
              <Typography variant="small" className="text-indigo-700">
                Count: {item.count}
              </Typography>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* SEO Açıklama Tablosu */}
      <Card className="shadow-md border">
        <div className="flex items-center justify-between mb-2 p-4 border-b bg-indigo-50">
          <Typography variant="h6" className="text-blue-gray-800 font-semibold">
            📘 SEO Analysis Reference Table
          </Typography>
          <Tooltip content="Purpose of this page and the key SEO analysis criteria.">
            <InformationCircleIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
          </Tooltip>
        </div>
        <CardBody>
          <table className="w-full text-left text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">🔍 Question</th>
                <th className="p-2 border">💡 Answer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Is my product title SEO-friendly?</td>
                <td className="p-2 border">Keyword density, length, exact match</td>
              </tr>
              <tr>
                <td className="p-2 border">What are competitors doing?</td>
                <td className="p-2 border">Favorites/sales ratio, similar keywords</td>
              </tr>
              <tr>
                <td className="p-2 border">How many times is a keyword used?</td>
                <td className="p-2 border">Tag analysis by frequency</td>
              </tr>
              <tr>
                <td className="p-2 border">Which days have more traffic?</td>
                <td className="p-2 border">Daily trend charts</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default KeywordsPage;
