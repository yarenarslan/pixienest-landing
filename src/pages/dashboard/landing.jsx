import { Button, Typography, Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-16 flex flex-col items-center justify-center">
      {/* Başlık */}
      <div className="text-center max-w-3xl">
        <img
          src="/icons/magic-wand.svg"
          alt="PixieNest Logo"
          className="w-12 h-12 mx-auto mb-4"
        />
        <Typography variant="h2" className="font-bold text-white mb-2">
          PixieNest
        </Typography>
        <Typography variant="lead" className="text-gray-300 mb-6">
          Optimize Your Etsy Listings. Find Better Keywords. Track What Sells.
        </Typography>
        <Typography className="mb-6 text-lg">
          <span className="text-gray-300">Everything you need to grow on Etsy.</span><br />
          <span className="text-yellow-400 font-semibold">Join now</span>
          <span className="text-gray-300"> and start optimizing in minutes.</span>
        </Typography>

        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
          <Link to="/auth/sign-in">
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-[0_0_10px_#facc15,0_0_20px_#facc15] transition-transform duration-300">
              SIGN IN
            </Button>
          </Link>
          <span className="text-gray-400 font-semibold">or</span>
          <Link to="/auth/sign-up">
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-[0_0_10px_#facc15,0_0_20px_#facc15] transition-transform duration-300">
              JOIN NOW
            </Button>
          </Link>
        </div>

        <Typography className="text-sm text-gray-400 mt-2">
          No subscriptions. No spam. Just results.
        </Typography>
      </div>

      {/* Özellikler */}
      <div className="mt-24 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center bg-white p-6 rounded-xl shadow-xl">
        {[
          {
            title: "Discover Trends Early",
            icon: "📊",
            desc: "Track rising products in real time and catch trends before others.",
          },
          {
            title: "Beat Your Competitors",
            icon: "📈",
            desc: "Analyze other Etsy listings and learn what drives their success.",
          },
          {
            title: "Smarter SEO",
            icon: "🔍",
            desc: "Get optimized keyword and title suggestions for visibility.",
          },
          {
            title: "Save Hours",
            icon: "⚡",
            desc: "Insights in seconds — no more manual research or guessing.",
          },
        ].map((f, idx) => (
          <Card key={idx} className="p-6 bg-white text-gray-900 shadow-md">
            <div className="text-3xl mb-2">{f.icon}</div>
            <Typography variant="h6" className="mb-2">
              {f.title}
            </Typography>
            <Typography className="text-sm text-gray-600">{f.desc}</Typography>
          </Card>
        ))}
      </div>

      {/* Hakkında */}
      <div className="mt-24 max-w-3xl text-center">
        <Typography variant="h4" className="mb-2 text-white">
          Why Sellers <span className="text-yellow-400">Choose PixieNest?</span>
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {[
            "✅ Free basic usage – perfect for beginners",
            "✅ Etsy + Google SEO combo = powerful results",
            "✅ Smart alternatives for your listings",
            "✅ Browser extension (coming soon)",
            "✅ Pay-as-you-go pricing — no lock-ins",
            "✅ Clean dashboard, no learning curve",
          ].map((line, idx) => (
            <Card
              key={idx}
              className="p-4 bg-white/10 text-white text-sm rounded shadow-sm"
            >
              {line}
            </Card>
          ))}
        </div>
      </div>

      {/* Teknoloji */}
      <div className="mt-24 text-center">
        <Typography variant="h5" className="text-white mb-4">
          Built with
        </Typography>
        <div className="flex justify-center gap-6 text-lg text-gray-300">
          <span>⚛ React</span>
          <span>🐍 FastAPI</span>
          <span>🗄 PostgreSQL</span>
          <span>📡 Etsy API</span>
        </div>
      </div>

      {/* CTA Son Satır */}
      <div className="mt-16 text-center">
        <Typography variant="h6" className="text-yellow-400 mb-2">
          Still exploring?
        </Typography>
        <Typography className="text-gray-300">
          Sign up free and start discovering what works on Etsy today.
        </Typography>
      </div>

      <footer className="mt-16 text-gray-400 text-sm text-center">
        Built with ❤️ by Yaren Arslan. Contact: yarenarslan0997@gmail.com
      </footer>
    </section>
  );
}
