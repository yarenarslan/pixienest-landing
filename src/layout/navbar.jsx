import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName = "PixieNest", routes = [] }) {
  const [openNav, setOpenNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {!isLoggedIn &&
        routes.map(({ name, path, icon }) => (
          <Typography
            key={name}
            as="li"
            variant="small"
            color="blue-gray"
            className="capitalize"
          >
            <Link to={path} className="flex items-center gap-1 p-1 font-normal">
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-50 mr-1",
                })}
              {name}
            </Link>
          </Typography>
        ))}
    </ul>
  );

  return (
    <MTNavbar className="p-3 shadow-md border border-blue-gray-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={isLoggedIn ? "/dashboard/home" : "/"}>
          <Typography
            variant="small"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-bold text-2xl text-black"
          >
            {brandName}
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <IconButton
          variant="text"
          size="sm"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </Collapse>
    </MTNavbar>
  );
}

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
