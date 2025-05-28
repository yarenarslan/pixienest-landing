import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    toast.success("You have been logged out.");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <>
      <Navbar
        color={fixedNavbar ? "white" : "transparent"}
        className={`rounded-xl transition-all ${
          fixedNavbar
            ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
            : "px-0 py-1"
        }`}
        fullWidth
        blurred={fixedNavbar}
      >
        <div className="flex items-center justify-between px-4">
          {/* Sol: Sayfa bilgisi */}
          <div className="capitalize">
            <Typography variant="small" color="blue-gray" className="opacity-50">
              {layout} / {page}
            </Typography>
            <Typography variant="h6" color="blue-gray">
              {page}
            </Typography>
          </div>

          {/* Sağ: Settings & Logout */}
          <div className="flex items-center gap-2">
            <Link to="/dashboard/settings">
              <IconButton variant="text" color="blue-gray" title="Settings">
                <Cog6ToothIcon className="h-5 w-5" />
              </IconButton>
            </Link>
            <IconButton
              variant="text"
              color="blue-gray"
              title="Logout"
              onClick={handleLogout}
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
              onClick={() => setOpenSidenav(dispatch, !openSidenav)}
            >
              <Bars3Icon className="h-6 w-6" />
            </IconButton>
          </div>
        </div>
      </Navbar>

      {/* Toast mesajlarını göstermek için */}
      <ToastContainer position="top-right" autoClose={1200} hideProgressBar />
    </>
  );
}

export default DashboardNavbar;
