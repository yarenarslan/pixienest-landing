import { Button, Typography, Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-16 flex flex-col items-center justify-center">
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
          A smart SEO and product research tool for Etsy sellers.
        </Typography>
        <Typography className="mb-6 text-lg">
          <span className="text-gray-300">Start by </span>
          <span className="text-yellow-400 font-semibold">signing in</span>
          <span className="text-gray-300"> or </span>
          <span className="text-yellow-400 font-semibold">joining us now!</span>
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
      </div>

      {/* Özellikler */}
      <div className="mt-24 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center bg-white p-6 rounded-xl shadow-xl">
        {[ 
          {
            title: "Discover Trendy Products",
            icon: "💡",
            desc: "Find what's hot in your niche and make informed decisions with real data.",
          },
          {
            title: "Competitor Analysis",
            icon: "📈",
            desc: "Track pricing, reviews, and popularity of similar listings on Etsy.",
          },
          {
            title: "Smart SEO Suggestions",
            icon: "🔍",
            desc: "Improve your listings with keyword suggestions and optimized titles.",
          },
          {
            title: "Save Time",
            icon: "⏱",
            desc: "Automated insights that help you grow faster without spending hours.",
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
          What Makes <span className="text-yellow-400">PixieNest</span> Different?
        </Typography>
        <ul className="text-gray-300 mt-6 space-y-2 text-left sm:text-center">
          {[
            "✅ Free basic usage – ideal for new sellers",
            "✅ Combines Etsy + Google SEO for maximum visibility",
            "✅ Analyze competitor listings and get smarter alternatives",
            "✅ Browser extension coming soon for on-site real-time analysis",
            "✅ Personalized suggestions tailored to your listings",
            "✅ Flexible pay-as-you-go pricing – no subscriptions",
          ].map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </div>

      {/* Teknoloji */}
      <div className="mt-24 text-center">
        <Typography variant="h5" className="text-white mb-4">
          Technologies Used
        </Typography>
        <div className="flex justify-center gap-6 text-lg text-gray-300">
          <span>⚛ React</span>
          <span>🐍 FastAPI</span>
          <span>🗄 PostgreSQL</span>
          <span>📡 Etsy API</span>
        </div>
      </div>

      <footer className="mt-16 text-gray-400 text-sm text-center">
        Built with ❤️ by the PixieNest team. Contact: yarenarslan0997@gmail.com
      </footer>
    </section>
  );
}
