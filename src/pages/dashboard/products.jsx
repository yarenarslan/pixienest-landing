import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  Chip,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => {
        const cleanedProducts = res.data.map(({ created_at, ...rest }) => rest);

        const uniqueMap = new Map();
        for (const product of cleanedProducts) {
          const existing = uniqueMap.get(product.listing_id);
          if (!existing || product.total_sales > existing.total_sales) {
            uniqueMap.set(product.listing_id, product);
          }
        }

        const uniqueProducts = Array.from(uniqueMap.values())
          .sort((a, b) => b.total_sales - a.total_sales)
          .map((item, index) => ({
            ...item,
            rank: index + 1,
            badge: index < 3 ? `#${index + 1}` : null,
          }));

        setProducts(uniqueProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Veri çekilemedi:", err);
        setLoading(false);
      });
  }, []);

  const getBadgeColor = (rank) => {
    if (rank === 1) return "yellow";
    if (rank === 2) return "blue";
    if (rank === 3) return "brown";
    return "gray";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Başlık alanı */}
      <div className="mb-6 flex justify-between items-start flex-wrap gap-4">
        <div>
          <Typography variant="h4" className="text-indigo-700 font-bold">
            📦 Top Trending Products
          </Typography>
          <Typography variant="small" className="text-blue-gray-400 mt-1">
            Explore the most sold and favorited products recently.
          </Typography>
        </div>
        <Tooltip content="These insights are based on real-time Etsy data.">
          <InformationCircleIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
        </Tooltip>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="shadow-md border relative">
              {product.badge && (
                <Chip
                  value={product.badge}
                  color={getBadgeColor(product.rank)}
                  className="absolute top-2 left-2 z-10"
                />
              )}
              <CardBody className="flex flex-col gap-3">
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full object-contain"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
                <Tooltip content={product.title}>
                  <Typography
                    variant="h6"
                    className="font-semibold text-blue-gray-800 line-clamp-2"
                  >
                    {product.title}
                  </Typography>
                </Tooltip>
                <Typography variant="small" color="gray">
                  Price: <strong>${product.price}</strong>
                </Typography>
                <Typography variant="small" color="gray">
                  Sales: <strong>{product.total_sales}</strong> | Favorites:{" "}
                  <strong>{product.favorites}</strong>
                </Typography>
                <Typography variant="small" color="gray" className="italic">
                  {product.shop_name}
                </Typography>
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.tags?.slice(0, 3).map((tag, i) => (
                    <Chip
                      key={i}
                      value={`#${tag}`}
                      size="sm"
                      className="bg-gray-200 text-gray-700"
                    />
                  ))}
                </div>
                <a
                  href={`https://www.etsy.com/listing/${product.listing_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3"
                >
                  <Button
                    size="sm"
                    fullWidth
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    View on Etsy
                  </Button>
                </a>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
