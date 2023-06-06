import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetState } from "../Redux/Reducers/userReducer.jsx";
import { forgotPassword } from "../Redux/Actions/userAction.jsx";
const ForgotPassword = () => {
  const { message, errors } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (message) {
      toast(message, {
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
  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };
  return (
    <div className="w-full bg-gray-400 h-[85vh] flex items-center justify-center">
      <div>
        <form
          onSubmit={forgotPasswordHandler}
          className="bg-white p-2 flex flex-col items-center justify-center"
        >
          <h1 className="text-center border-b-[1px] border-b-gray-400">
            Forgot Password
          </h1>
          <div className="border-2 p-1 gap-3 mt-10 border-orange-400 flex items-center">
            <AiOutlineMail size={30} />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none bg-transparent focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 mt-5 text-white px-10 py-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
