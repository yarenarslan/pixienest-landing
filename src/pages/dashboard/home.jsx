import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Switch,
  Button,
  Tooltip,
  Chip,
} from "@material-tailwind/react";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";


const API_URL = import.meta.env.VITE_API_URL;

export function Home() {
  const [topProducts, setTopProducts] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [topKeywords, setTopKeywords] = useState([]);
  const [topFavorited, setTopFavorited] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => setDarkMode(!darkMode);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.warn("No token found.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const [products, sellers, favorited, keywords] = await Promise.all([
          axios.get(`${API_URL}/api/dashboard/top-products`, config),
          axios.get(`${API_URL}/api/dashboard/top-sellers`, config),
          axios.get(`${API_URL}/api/dashboard/top-favorited`, config),
          axios.get(`${API_URL}/api/keywords/top`, config),
        ]);

        setTopProducts(products.data);
        setTopSellers(sellers.data);
        setTopFavorited(favorited.data);
        setTopKeywords(keywords.data);
      } catch (err) {
        console.error("Dashboard veri çekilemedi:", err);
      }
    };

    fetchData();
  }, []);

  const renderTrend = (value) => {
    if (value > 50) return <span className="ml-2 text-green-500 font-bold">↑</span>;
    return <span className="ml-2 text-red-500 font-bold">↓</span>;
  };

  const renderSparkline = () => (
    <span className="ml-1 text-xs text-blue-400">▁▂▃▅▆▇</span>
  );

  const renderCard = (title, icon, items, renderFn) => (
    <Card className={`w-full ${darkMode ? "bg-gray-800 text-white" : "bg-white"} border border-blue-gray-100 shadow-md hover:shadow-lg transition-all duration-300`}>
      <CardHeader floated={false} shadow={false} className="p-4 bg-blue-gray-50">
        <Typography variant="h6" className="flex items-center gap-2 text-blue-gray-700">
          {icon}
          {title}
        </Typography>
      </CardHeader>
      <CardBody className="p-4">
        <ul className="space-y-3">{items.slice(0, 5).map(renderFn)}</ul>
      </CardBody>
    </Card>
  );

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"} p-6 min-h-screen transition`}>
      {/* Üst panel */}
      <div className="flex justify-between items-start mb-6 flex-wrap gap-6">
        <div>
          <Typography variant="h4" className="text-indigo-700 font-bold">
            🛍️ Etsy Top 5 Analysis
          </Typography>
          <Typography variant="small" className="text-blue-gray-400 mt-1">
            Updated insights for products, favorites, sellers and keywords.
          </Typography>
        </div>

        <div className="flex items-center gap-4">
          <Switch label="Dark Mode" checked={darkMode} onChange={toggleDark} />
          <Button size="sm" variant="outlined">Export CSV</Button>
        </div>
      </div>

      {/* KPI Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 shadow"><Typography variant="small">Total Products</Typography><Typography variant="h5">{topProducts.length}</Typography></Card>
        <Card className="p-4 shadow"><Typography variant="small">Top Seller Sales</Typography><Typography variant="h5">{topSellers[0]?.total_sales || 0}</Typography></Card>
        <Card className="p-4 shadow"><Typography variant="small">Most Favorited</Typography><Typography variant="h5">{topFavorited[0]?.favorites || 0}</Typography></Card>
        <Card className="p-4 shadow"><Typography variant="small">Keywords Found</Typography><Typography variant="h5">{topKeywords.length}</Typography></Card>
      </div>

      {/* Veri Kartları */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
        {renderCard("Top 5 Products", "📦", topProducts, (product, i) => (
          <li key={i} className="flex items-start gap-4">
            <img src={product.image} alt="" className="w-12 h-12 object-cover rounded" />
            <div className="flex-1">
              <Tooltip content={product.title}>
                <Typography variant="small" className="font-semibold text-blue-gray-800 line-clamp-2">
                  {product.title}
                </Typography>
              </Tooltip>
              <div className="flex items-center gap-2 text-xs mt-1">
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Sales: {product.total_sales}</span>
                {renderTrend(product.total_sales)}
                {renderSparkline()}
              </div>
            </div>
          </li>
        ))}

        {renderCard("Top 5 Favorited", "💖", topFavorited, (product, i) => (
          <li key={i} className="flex items-start gap-4">
            <img src={product.image} alt="" className="w-12 h-12 object-cover rounded" />
            <div className="flex-1">
              <Tooltip content={product.title}>
                <Typography variant="small" className="font-semibold text-blue-gray-800 line-clamp-2">
                  {product.title}
                </Typography>
              </Tooltip>
              <div className="flex items-center gap-2 text-xs mt-1">
                <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full">Fav: {product.favorites}</span>
                {renderTrend(product.total_sales)}
                {renderSparkline()}
              </div>
            </div>
          </li>
        ))}

        {renderCard("Top 5 Sellers", "🏪", topSellers, (seller, i) => (
          <li key={i} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
              {seller.shop_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <Typography variant="small" className="font-semibold">
                {i + 1}. {seller.shop_name}
              </Typography>
              <Typography variant="small" color="gray" className="text-xs">
                Products: {seller.product_count} | Sales: {seller.total_sales}
              </Typography>
            </div>
          </li>
        ))}

        {renderCard("Top 5 Keywords", "🔍", topKeywords, (keyword, i) => (
          <li key={i} className="flex items-center gap-2">
            <Chip
              value={`#${i + 1}`}
              color={i === 0 ? "yellow" : i === 1 ? "blue" : i === 2 ? "brown" : "gray"}
              size="sm"
            />
            <Typography variant="small" className="font-semibold flex-1">{keyword.keyword}</Typography>
            <Typography variant="small" className="text-indigo-500">Count: {keyword.count}</Typography>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Home;
