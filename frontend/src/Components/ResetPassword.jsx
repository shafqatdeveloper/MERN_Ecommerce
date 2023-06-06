import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../Redux/Actions/userAction.jsx";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetState } from "../Redux/Reducers/userReducer.jsx";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { reset, errors } = useSelector((state) => state.user);

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, password, confirmPassword }));
  };
  useEffect(() => {
    if (reset) {
      toast(reset, {
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
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <form
        onSubmit={resetPasswordHandler}
        className="bg-sky-500 items-center flex flex-col gap-5 w-[30%] p-4 rounded-md"
      >
        <input
          type="password"
          name="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 py-2 text-center w-full border-gray-600 rounded-md outline-none focus:outline-none"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border-2 py-2 text-center w-full border-gray-600 rounded-md outline-none focus:outline-none"
        />
        <button
          type="submit"
          className="bg-orange-500 w-[70%] rounded-md py-1.5 text-white hover:bg-yellow-400"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
