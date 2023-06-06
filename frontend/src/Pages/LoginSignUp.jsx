import React, { useEffect, useState } from "react";
import Login from "../Components/Login.jsx";
import Signup from "../Components/Signup.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const [signUp, setSignUp] = useState(true);
  const handleAccountSwap = () => {
    setSignUp(!signUp);
  };
  return (
    <div className="w-full flex items-center justify-center h-[80vh]">
      <div className="w-[95%] flex flex-col items-center relative sm:w-2/4 md:w-[30%] mt-7 bg-sky-500 rounded-md h-full">
        <h1 className="py-4 font-bold text-2xl uppercase text-gray-800 text-center">
          {signUp ? "Login" : "Signup"}
        </h1>
        {signUp ? <Login /> : <Signup />}
        <h1
          className="absolute bottom-4 cursor-pointer right-2"
          onClick={handleAccountSwap}
        >
          {signUp
            ? "Don't Have an Account? Signup"
            : "Already Have an Account? Login"}
        </h1>
      </div>
    </div>
  );
};

export default LoginSignUp;
