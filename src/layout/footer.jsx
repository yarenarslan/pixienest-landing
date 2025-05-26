import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-4">
      <div className="flex flex-col items-center justify-center gap-2 text-center text-blue-gray-600 md:flex-row md:justify-between md:px-4">
        <Typography variant="small" className="flex items-center gap-1 font-normal">
          &copy; {year} made with
          <HeartIcon className="inline-block h-4 w-4 text-red-500" />
          by <a href="https://github.com/yarenarslan" className="font-bold hover:text-blue-500">Yaren Arslan</a>
        </Typography>

        {/* İstersen linkleri burada bırakabiliriz */}
        <ul className="flex flex-wrap justify-center gap-4 mt-2 md:mt-0">
          <li>
            <a href="https://pixienest.co" target="_blank" className="text-sm hover:text-blue-500">
              PixieNest
            </a>
          </li>
          <li>
            <a href="/dashboard/settings" className="text-sm hover:text-blue-500">
              Settings
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
