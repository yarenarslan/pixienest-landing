import {
  HomeIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

import Home from "@/pages/dashboard/home";
import Products from "@/pages/dashboard/products";
import Keywords from "@/pages/dashboard/keywords";
import Sellers from "@/pages/dashboard/sellers";
import Seo from "@/pages/dashboard/seo";
import Settings from "@/pages/dashboard/settings";

import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import ForgotPassword from "@/pages/auth/forgot-password";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "home",
        element: <Home />,
      },
      {
        icon: <ShoppingBagIcon {...icon} />,
        name: "products",
        path: "products",
        element: <Products />,
      },
      {
        icon: <MagnifyingGlassIcon {...icon} />,
        name: "keywords",
        path: "keywords",
        element: <Keywords />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "sellers",
        path: "sellers",
        element: <Sellers />,
      },
      {
        icon: <MagnifyingGlassIcon {...icon} />,
        name: "seo analysis",
        path: "seo",
        element: <Seo />,
      },
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "settings",
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
];

export default routes;
