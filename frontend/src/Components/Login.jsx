import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../Redux/Actions/userAction.jsx";
import { resetState } from "../Redux/Reducers/userReducer.jsx";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { success, errors, loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate("/account");
    }
    if (loggedIn) {
      toast("Logged In", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (errors) {
      toast(errors, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    dispatch(resetState());
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleLoginSubmit}
        className="w-full flex flex-col items-center gap-8 relative mt-20 px-3"
      >
        <div className="w-full">
          <input
            className="w-full rounded-md px-2 outline-none focus:outline-none border-2 border-yellow-800 py-1 "
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <input
            className="w-full rounded-md px-2 outline-none focus:outline-none border-2 border-yellow-800 py-1 "
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Link to="/password/forgot">
            <button className="absolute left-4 bottom-24">
              Forgot Password
            </button>
          </Link>
        </div>
        <button
          type="submit"
          className="bg-pink-600 mt-5 text-white font-semibold w-48 py-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
