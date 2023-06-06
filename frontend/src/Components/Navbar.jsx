import React, { useEffect, useRef, useState } from "react";
import { BsCartPlusFill, BsSearch } from "react-icons/bs";
import { MdOutlineAddIcCall } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Actions/productAction.jsx";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import profile from "../assets/profile.jpg";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ViewListIcon from "@mui/icons-material/ViewList";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader.jsx";
import { logoutUser } from "../Redux/Actions/userAction.jsx";

const Navbar = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  console.log(user.name);
  const actions = [
    { icon: <AccountCircleIcon />, name: "Account", func: account },
    { icon: <ViewListIcon />, name: "Orders", func: orders },
    { icon: <ExitToAppIcon />, name: "Logout", func: loginsignup },
  ];
  if (user.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function orders() {
    navigate("/order/me");
  }
  function account() {
    if (isAuthenticated) {
      navigate("/account");
    } else {
      navigate("/loginsignup");
    }
  }
  function dashboard() {
    navigate("/dashboard");
  }
  function loginsignup() {
    dispatch(logoutUser());
    navigate("/loginsignup");
  }

  const dispatch = useDispatch();
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="w-full text-gray-100 bg-[#3c6578] h-20 ">
      {/* Desktop Menu */}
      <div className=" sm:flex h-full items-center hidden  justify-between px-5">
        <div>
          <Link to="/">
            <h1 className="bold text-3xl">Logo</h1>
          </Link>
        </div>
        <div className="flex items-center gap-12 pr-5">
          <div className="flex flex-col justify-center items-center gap-2">
            <MdOutlineAddIcCall size={25} className="text-white/75" />
            <h1>+92312-3456789</h1>
          </div>
          <Link to="/cart">
            <div className="relative">
              <BsCartPlusFill size={37} className="text-white" />
              <h1 className="absolute top-0 right-[-3px] bg-sky-500 text-sm px-1.5 rounded-full">
                {cartItems.length}
              </h1>
            </div>
          </Link>
          {loading ? (
            <Loader />
          ) : (
            <div>
              <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: "absolute", top: 16, right: 5 }}
                icon={
                  <img
                    src={user.avatar?.url || profile}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                }
                direction="down"
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipOpen
                    onClick={action.func}
                  />
                ))}
              </SpeedDial>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      <div className=" flex h-full items-center sm:hidden  justify-between px-5">
        <h1 className="text-xl font-bold">LOGO</h1>

        <AiOutlineMenu onClick={handleNav} size={20} />
      </div>
      {nav ? (
        <div className="w-full h-screen fixed top-0 left-0 bg-black/70 z-20"></div>
      ) : (
        <div></div>
      )}
      {nav && (
        <div className="w-[250px] flex-col flex items-start gap-5 pl-5 pt-5 h-screen fixed top-0 right-0 bg-white z-50">
          <div className="flex flex-col justify-center items-center gap-2">
            <MdOutlineAddIcCall size={25} className="text-black" />
            <h1>+92312-3456789</h1>
          </div>
          <div className="relative">
            <BsCartPlusFill size={37} className="text-black" />
            <h1 className="absolute left-5 top-0 bg-red-500 text-sm px-1.5 rounded-full">
              0
            </h1>
          </div>
          <div className="absolute right-4 top-8">
            <AiOutlineClose size={30} onClick={handleNav} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
