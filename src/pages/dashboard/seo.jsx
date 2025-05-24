import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
  Button,
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

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTooltip, Legend);

const API_URL = import.meta.env.VITE_API_URL;

export default function SEOAnalysisPage() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!keyword) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${API_URL}/api/seo/keyword-insights?keyword=${encodeURIComponent(keyword)}`
      );
      
      setResult(res.data);
    } catch (err) {
      setError("Unable to fetch SEO analysis. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: result?.etsy?.related_keywords?.map((k) => k.word) || [],
    datasets: [
      {
        label: "Related Keyword Frequency",
        data: result?.etsy?.related_keywords?.map((k) => k.count) || [],
        backgroundColor: "#6366f1",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "x",
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
      },
      x: {
        grid: { display: false },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-start flex-wrap gap-4">
        <div>
          <Typography variant="h4" className="text-indigo-700 font-bold">
            🔍 SEO Keyword Analysis
          </Typography>
          <Typography variant="small" className="text-blue-gray-400 mt-1">
            Enter a keyword to discover SEO metrics and suggestions.
          </Typography>
        </div>
        <Tooltip content="This tool helps analyze Etsy keyword SEO performance.">
          <InformationCircleIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
        </Tooltip>
      </div>

      <Card className="shadow-md border">
        <CardHeader floated={false} className="bg-indigo-50 px-4 py-2">
          <Typography variant="h6" color="blue-gray">
            🎯 Keyword SEO Insight Tool
          </Typography>
        </CardHeader>
        <CardBody>
          <div className="flex gap-4 items-center mb-4">
            <Input
              label="Enter keyword (e.g., 'tarot reading')"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze"}
            </Button>
          </div>

          {error && (
            <Typography color="red" className="mb-4">
              ⚠️ {error}
            </Typography>
          )}

          {result && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Sol */}
                <div className="space-y-4">
                  <div>
                    <Typography variant="h6" className="text-blue-gray-800 flex items-center gap-2">
                      🔥 Google Trends Score
                      <Tooltip content="Trend score is between 0–100.">
                        <InformationCircleIcon className="h-4 w-4 text-blue-500 cursor-pointer" />
                      </Tooltip>
                    </Typography>
                    <Typography className="text-indigo-600 text-xl font-semibold">
                      {result.google_trend_score}/100
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h6" className="text-blue-gray-800 flex items-center gap-2">
                      📊 Etsy Keyword Stats
                      <Tooltip content="Based on Etsy active listing results.">
                        <InformationCircleIcon className="h-4 w-4 text-blue-500 cursor-pointer" />
                      </Tooltip>
                    </Typography>
                    <ul className="text-gray-700 space-y-1 mt-1">
                      <li>🔎 Listings Found: {result.etsy.results_found}</li>
                      <li>💰 Avg Price: ${result.etsy.avg_price}</li>
                      <li>⭐ Avg Favorites: {result.etsy.avg_favorites}</li>
                      <li>📦 Avg Sales: {result.etsy.avg_sales}</li>
                    </ul>
                  </div>

                  <div>
                    <Typography variant="h6" className="text-blue-gray-800">
                      🧠 SEO Suggestions
                    </Typography>
                    <div className="mb-2">
                      <strong>📌 Suggested Titles:</strong>
                      {Array.isArray(result.etsy.suggested_titles) &&
                      result.etsy.suggested_titles.length > 0 ? (
                        <ul className="list-disc pl-5 text-gray-700">
                          {result.etsy.suggested_titles.map((title, i) => (
                            <li key={i}>{title}</li>
                          ))}
                        </ul>
                      ) : (
                        <Typography variant="small" className="text-gray-500">
                          No suggestions found.
                        </Typography>
                      )}
                    </div>
                    <div>
                      <strong>🏷️ Suggested Tags:</strong>
                      {Array.isArray(result.etsy.suggested_tags) &&
                      result.etsy.suggested_tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {result.etsy.suggested_tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-sm bg-indigo-100 text-indigo-700 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <Typography variant="small" className="text-gray-500">
                          No tags available.
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sağ */}
                <div>
                  <Typography variant="h6" className="text-blue-gray-800 mb-2">
                    📈 Most Related Keywords
                  </Typography>
                  {Array.isArray(result.etsy.related_keywords) &&
                  result.etsy.related_keywords.length > 0 ? (
                    <div className="h-72">
                      <Bar data={chartData} options={chartOptions} />
                    </div>
                  ) : (
                    <Typography variant="small" className="text-gray-500">
                      No keyword data found.
                    </Typography>
                  )}
                </div>
              </div>

              {/* Ürün listesi */}
              <div>
                <Typography variant="h6" className="text-blue-gray-800 mb-2">
                  🛍️ Top Products for "{keyword}"
                </Typography>
                <div className="grid md:grid-cols-3 gap-4">
                  {result.etsy.products?.map((product, i) => (
                    <Card key={i} className="flex gap-3 p-3 items-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/100";
                        }}
                      />
                      <div className="flex-1">
                        <Typography variant="small" className="font-semibold line-clamp-1">
                          {product.title}
                        </Typography>
                        <Typography variant="small" className="text-gray-500 text-xs">
                          ${product.price} | ❤️ {product.favorites}
                        </Typography>
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 block"
                        >
                          <Button size="sm" className="bg-black text-white hover:bg-gray-900 w-full">
                            View on Etsy
                          </Button>
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
