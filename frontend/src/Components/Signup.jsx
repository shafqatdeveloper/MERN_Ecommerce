import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/Actions/userAction.jsx";
import { useNavigate } from "react-router-dom";
import { resetState } from "../Redux/Reducers/userReducer.jsx";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.user);
  console.log(loggedIn);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (loggedIn) {
      navigate("/account");
    }
    resetState();
  });
  const [avatar, setAvatar] = useState("");
  const handleRegisterData = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  console.log(avatar);
  const { name, email, password } = userData;

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    await dispatch(registerUser(myForm));
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleRegisterSubmit}
        className="w-full flex flex-col items-center gap-8 relative mt-3 px-3"
      >
        <div className="w-full">
          <input
            className="w-full rounded-md px-2 outline-none focus:outline-none border-2 border-yellow-800 py-1 "
            type="text"
            value={name}
            onChange={handleRegisterData}
            name="name"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="w-full">
          <input
            value={email}
            className="w-full rounded-md px-2 outline-none focus:outline-none border-2 border-yellow-800 py-1 "
            type="email"
            onChange={handleRegisterData}
            name="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="w-full">
          <input
            className="w-full rounded-md px-2 outline-none focus:outline-none border-2 border-yellow-800 py-1 "
            type="password"
            value={password}
            onChange={handleRegisterData}
            name="password"
            placeholder="Enter Your Password"
          />
        </div>
        <div className="w-full">
          <input
            className="w-full rounded-md px-2 outline-none focus:outline-none border-2 border-yellow-800 py-1 "
            type="file"
            id="file"
            onChange={handleRegisterData}
            name="avatar"
          />
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

export default Signup;
